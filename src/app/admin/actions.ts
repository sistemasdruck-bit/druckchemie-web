"use server";

// Todas las operaciones de escritura del panel /admin.
// Cada acción verifica la sesión, escribe con la llave secreta (solo servidor)
// y refresca las páginas públicas afectadas.
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_IMAGEN = 8 * 1024 * 1024; // 8 MB
const MAX_PDF = 15 * 1024 * 1024; // 15 MB
const TIPOS_IMAGEN = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

function db() {
  if (!supabaseAdmin) {
    throw new Error(
      "Supabase no está configurado en el servidor (revisa las variables en Railway)."
    );
  }
  return supabaseAdmin;
}

function slugify(s: string) {
  return (
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "item"
  );
}

const texto = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? "").trim();
  return v.length ? v : null;
};
const numero = (f: FormData, k: string) => {
  const n = parseInt(String(f.get(k) ?? ""), 10);
  return Number.isFinite(n) ? n : 0;
};
const casilla = (f: FormData, k: string) => f.get(k) === "on";

function archivo(f: FormData, k: string): File | null {
  const v = f.get(k);
  return v instanceof File && v.size > 0 ? v : null;
}

async function subir(file: File, bucket: "imagenes" | "fichas", carpeta: string) {
  if (bucket === "imagenes") {
    if (!TIPOS_IMAGEN.includes(file.type))
      throw new Error("La imagen debe ser JPG, PNG, WEBP, AVIF o GIF.");
    if (file.size > MAX_IMAGEN) throw new Error("La imagen pesa más de 8 MB.");
  } else {
    if (file.type !== "application/pdf") throw new Error("La ficha técnica debe ser PDF.");
    if (file.size > MAX_PDF) throw new Error("El PDF pesa más de 15 MB.");
  }
  const punto = file.name.lastIndexOf(".");
  const base = slugify(punto > 0 ? file.name.slice(0, punto) : file.name);
  const ext = (punto > 0 ? file.name.slice(punto + 1) : "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const ruta = `${carpeta}/${Date.now()}-${base}.${ext}`;
  const { error } = await db().storage.from(bucket).upload(ruta, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(`No se pudo subir el archivo: ${error.message}`);
  return db().storage.from(bucket).getPublicUrl(ruta).data.publicUrl;
}

/** Borra del Storage un archivo a partir de su URL pública (si es nuestra). */
async function borrarArchivo(url: string | null | undefined) {
  if (!url) return;
  const m = url.match(/\/storage\/v1\/object\/public\/(imagenes|fichas)\/(.+)$/);
  if (!m) return;
  await db().storage.from(m[1]).remove([decodeURIComponent(m[2])]);
}

function refrescarCatalogo() {
  revalidatePath("/");
  revalidatePath("/productos");
}

function errorTexto(e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  // Sin caracteres que rompan la URL; ir() se encarga de codificar el resto.
  return msg.replace(/[&?#=%+]/g, " ").slice(0, 200);
}

/** redirect() con la URL codificada (acentos y espacios en los avisos). */
function ir(url: string): never {
  redirect(encodeURI(url));
}

// ===================== Categorías =====================

export async function crearCategoria(f: FormData) {
  await requireAdmin();
  let id: string | null = null;
  let err: string | null = null;
  try {
    const nombre = texto(f, "nombre");
    if (!nombre) throw new Error("El nombre es obligatorio.");
    const { data: ultimo } = await db()
      .from("categorias")
      .select("orden")
      .order("orden", { ascending: false })
      .limit(1)
      .maybeSingle();
    const fila = { nombre, resumen: texto(f, "resumen"), orden: (ultimo?.orden ?? 0) + 1 };
    let res = await db().from("categorias").insert({ ...fila, slug: slugify(nombre) }).select("id").single();
    if (res.error?.code === "23505") {
      res = await db()
        .from("categorias")
        .insert({ ...fila, slug: `${slugify(nombre)}-${Date.now().toString(36).slice(-4)}` })
        .select("id")
        .single();
    }
    if (res.error) throw new Error(res.error.message);
    id = res.data.id;
    refrescarCatalogo();
  } catch (e) {
    err = errorTexto(e);
  }
  ir(err ? `/admin?err=${err}` : `/admin/categorias/${id}?ok=Categoría creada`);
}

export async function guardarCategoria(f: FormData) {
  await requireAdmin();
  const id = String(f.get("id"));
  let err: string | null = null;
  try {
    const nombre = texto(f, "nombre");
    if (!nombre) throw new Error("El nombre es obligatorio.");
    const cambios: Record<string, unknown> = {
      nombre,
      resumen: texto(f, "resumen"),
      orden: numero(f, "orden"),
      activo: casilla(f, "activo"),
    };
    const { data: actual } = await db().from("categorias").select("imagen_url").eq("id", id).single();
    const img = archivo(f, "imagen");
    if (img) {
      cambios.imagen_url = await subir(img, "imagenes", "categorias");
      await borrarArchivo(actual?.imagen_url);
    } else if (casilla(f, "quitar_imagen")) {
      cambios.imagen_url = null;
      await borrarArchivo(actual?.imagen_url);
    }
    const { error } = await db().from("categorias").update(cambios).eq("id", id);
    if (error) throw new Error(error.message);
    refrescarCatalogo();
  } catch (e) {
    err = errorTexto(e);
  }
  ir(`/admin/categorias/${id}?${err ? `err=${err}` : "ok=Cambios guardados"}`);
}

export async function borrarCategoria(f: FormData) {
  await requireAdmin();
  const id = String(f.get("id"));
  let err: string | null = null;
  try {
    const { data: prods } = await db()
      .from("productos")
      .select("imagen_url, ficha_tecnica_url")
      .eq("categoria_id", id);
    const { data: cat } = await db().from("categorias").select("imagen_url").eq("id", id).single();
    const { error } = await db().from("categorias").delete().eq("id", id);
    if (error) throw new Error(error.message);
    for (const p of prods ?? []) {
      await borrarArchivo(p.imagen_url);
      await borrarArchivo(p.ficha_tecnica_url);
    }
    await borrarArchivo(cat?.imagen_url);
    refrescarCatalogo();
  } catch (e) {
    err = errorTexto(e);
  }
  ir(err ? `/admin/categorias/${id}?err=${err}` : "/admin?ok=Categoría eliminada");
}

// ===================== Productos =====================

export async function crearProducto(f: FormData) {
  await requireAdmin();
  const categoria_id = String(f.get("categoria_id"));
  let id: string | null = null;
  let err: string | null = null;
  try {
    const nombre = texto(f, "nombre");
    if (!nombre) throw new Error("El nombre del producto es obligatorio.");
    const { data: ultimo } = await db()
      .from("productos")
      .select("orden")
      .eq("categoria_id", categoria_id)
      .order("orden", { ascending: false })
      .limit(1)
      .maybeSingle();
    const fila = {
      categoria_id,
      nombre,
      descripcion: texto(f, "descripcion"),
      orden: (ultimo?.orden ?? 0) + 1,
    };
    let res = await db().from("productos").insert({ ...fila, slug: slugify(nombre) }).select("id").single();
    if (res.error?.code === "23505") {
      res = await db()
        .from("productos")
        .insert({ ...fila, slug: `${slugify(nombre)}-${Date.now().toString(36).slice(-4)}` })
        .select("id")
        .single();
    }
    if (res.error) throw new Error(res.error.message);
    id = res.data.id;
    refrescarCatalogo();
  } catch (e) {
    err = errorTexto(e);
  }
  ir(
    err
      ? `/admin/categorias/${categoria_id}?err=${err}`
      : `/admin/productos/${id}?ok=Producto creado. Ahora puedes agregar foto y ficha técnica.`
  );
}

export async function guardarProducto(f: FormData) {
  await requireAdmin();
  const id = String(f.get("id"));
  let err: string | null = null;
  try {
    const nombre = texto(f, "nombre");
    if (!nombre) throw new Error("El nombre es obligatorio.");
    const cambios: Record<string, unknown> = {
      nombre,
      descripcion: texto(f, "descripcion"),
      categoria_id: String(f.get("categoria_id")),
      orden: numero(f, "orden"),
      activo: casilla(f, "activo"),
      destacado: casilla(f, "destacado"),
    };
    const { data: actual } = await db()
      .from("productos")
      .select("imagen_url, ficha_tecnica_url")
      .eq("id", id)
      .single();

    const img = archivo(f, "imagen");
    if (img) {
      cambios.imagen_url = await subir(img, "imagenes", "productos");
      await borrarArchivo(actual?.imagen_url);
    } else if (casilla(f, "quitar_imagen")) {
      cambios.imagen_url = null;
      await borrarArchivo(actual?.imagen_url);
    }

    const pdf = archivo(f, "ficha");
    if (pdf) {
      cambios.ficha_tecnica_url = await subir(pdf, "fichas", "productos");
      await borrarArchivo(actual?.ficha_tecnica_url);
    } else if (casilla(f, "quitar_ficha")) {
      cambios.ficha_tecnica_url = null;
      await borrarArchivo(actual?.ficha_tecnica_url);
    }

    const { error } = await db().from("productos").update(cambios).eq("id", id);
    if (error) {
      if (error.code === "23505")
        throw new Error("Ya existe un producto con ese nombre en la categoría elegida.");
      throw new Error(error.message);
    }
    refrescarCatalogo();
  } catch (e) {
    err = errorTexto(e);
  }
  ir(`/admin/productos/${id}?${err ? `err=${err}` : "ok=Cambios guardados"}`);
}

export async function borrarProducto(f: FormData) {
  await requireAdmin();
  const id = String(f.get("id"));
  let categoria: string | null = null;
  let err: string | null = null;
  try {
    const { data: p } = await db()
      .from("productos")
      .select("categoria_id, imagen_url, ficha_tecnica_url")
      .eq("id", id)
      .single();
    categoria = p?.categoria_id ?? null;
    const { error } = await db().from("productos").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await borrarArchivo(p?.imagen_url);
    await borrarArchivo(p?.ficha_tecnica_url);
    refrescarCatalogo();
  } catch (e) {
    err = errorTexto(e);
  }
  ir(
    err
      ? `/admin/productos/${id}?err=${err}`
      : categoria
        ? `/admin/categorias/${categoria}?ok=Producto eliminado`
        : "/admin?ok=Producto eliminado"
  );
}

// ===================== Galería =====================

export async function subirFotos(f: FormData) {
  await requireAdmin();
  let err: string | null = null;
  let n = 0;
  try {
    const files = f.getAll("fotos").filter((v): v is File => v instanceof File && v.size > 0);
    if (!files.length) throw new Error("Selecciona al menos una foto.");
    const titulo = texto(f, "titulo");
    const { data: ultimo } = await db()
      .from("galeria")
      .select("orden")
      .order("orden", { ascending: false })
      .limit(1)
      .maybeSingle();
    let orden = ultimo?.orden ?? 0;
    for (const file of files) {
      const url = await subir(file, "imagenes", "galeria");
      const { error } = await db().from("galeria").insert({ imagen_url: url, titulo, orden: ++orden });
      if (error) throw new Error(error.message);
      n++;
    }
    revalidatePath("/galeria");
  } catch (e) {
    err = errorTexto(e);
  }
  const parcial = n ? ` (se subieron ${n} antes del error)` : "";
  ir(`/admin/galeria?${err ? `err=${err}${parcial}` : `ok=${n} foto(s) subida(s)`}`);
}

export async function guardarFoto(f: FormData) {
  await requireAdmin();
  let err: string | null = null;
  try {
    const { error } = await db()
      .from("galeria")
      .update({
        titulo: texto(f, "titulo"),
        descripcion: texto(f, "descripcion"),
        orden: numero(f, "orden"),
        activo: casilla(f, "activo"),
      })
      .eq("id", String(f.get("id")));
    if (error) throw new Error(error.message);
    revalidatePath("/galeria");
  } catch (e) {
    err = errorTexto(e);
  }
  ir(`/admin/galeria?${err ? `err=${err}` : "ok=Foto actualizada"}`);
}

export async function borrarFoto(f: FormData) {
  await requireAdmin();
  let err: string | null = null;
  try {
    const id = String(f.get("id"));
    const { data } = await db().from("galeria").select("imagen_url").eq("id", id).single();
    const { error } = await db().from("galeria").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await borrarArchivo(data?.imagen_url);
    revalidatePath("/galeria");
  } catch (e) {
    err = errorTexto(e);
  }
  ir(`/admin/galeria?${err ? `err=${err}` : "ok=Foto eliminada"}`);
}

// ===================== Mensajes de contacto =====================

export async function marcarMensaje(f: FormData) {
  await requireAdmin();
  let err: string | null = null;
  try {
    const { error } = await db()
      .from("leads")
      .update({ atendido: f.get("atendido") === "true" })
      .eq("id", String(f.get("id")));
    if (error) throw new Error(error.message);
  } catch (e) {
    err = errorTexto(e);
  }
  ir(`/admin/mensajes${err ? `?err=${err}` : ""}`);
}

export async function marcarCotizacion(f: FormData) {
  await requireAdmin();
  let err: string | null = null;
  try {
    const { error } = await db()
      .from("cotizaciones")
      .update({ atendida: f.get("atendida") === "true" })
      .eq("id", String(f.get("id")));
    if (error) throw new Error(error.message);
  } catch (e) {
    err = errorTexto(e);
  }
  ir(`/admin/cotizaciones${err ? `?err=${err}` : ""}`);
}
