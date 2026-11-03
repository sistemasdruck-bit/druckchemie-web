import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { guardarCategoria, borrarCategoria, crearProducto } from "../../../actions";
import BotonGuardar from "@/components/admin/BotonGuardar";
import BotonConfirmar from "@/components/admin/BotonConfirmar";
import { Aviso, Titulo, input, label, ayuda, tarjeta, botonPeligro } from "@/components/admin/ui";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string | null;
  orden: number;
  activo: boolean;
  destacado: boolean;
  imagen_url: string | null;
  ficha_tecnica_url: string | null;
};

export default async function CategoriaAdmin(props: PageProps<"/admin/categorias/[id]">) {
  const { id } = await props.params;
  const sp = await props.searchParams;
  if (!supabaseAdmin) return <Aviso err="Supabase no está configurado." />;

  const { data: cat } = await supabaseAdmin.from("categorias").select("*").eq("id", id).maybeSingle();
  if (!cat) notFound();
  const { data } = await supabaseAdmin
    .from("productos")
    .select("id, nombre, descripcion, orden, activo, destacado, imagen_url, ficha_tecnica_url")
    .eq("categoria_id", id)
    .order("orden");
  const productos = (data ?? []) as Producto[];

  return (
    <>
      <p className="mb-2 text-sm">
        <Link href="/admin" className="text-brand-blue hover:text-brand-accent-dark">← Catálogo</Link>
      </p>
      <Titulo sub={`Se muestra en /productos#${cat.slug}`}>{cat.nombre}</Titulo>
      <Aviso ok={sp.ok} err={sp.err} />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* ---- Datos de la categoría ---- */}
        <div className="space-y-6">
          <form action={guardarCategoria} className={tarjeta}>
            <input type="hidden" name="id" value={cat.id} />
            <h2 className="text-lg font-bold text-brand-navy">Datos de la categoría</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className={label} htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" defaultValue={cat.nombre} required className={input} />
              </div>
              <div>
                <label className={label} htmlFor="resumen">Resumen</label>
                <textarea id="resumen" name="resumen" rows={3} defaultValue={cat.resumen ?? ""} className={input} />
              </div>
              <div className="flex gap-6">
                <div className="w-28">
                  <label className={label} htmlFor="orden">Orden</label>
                  <input id="orden" name="orden" type="number" defaultValue={cat.orden} className={input} />
                </div>
                <label className="mt-7 flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  <input type="checkbox" name="activo" defaultChecked={cat.activo} className="h-4 w-4 accent-brand-accent" />
                  Visible en el sitio
                </label>
              </div>
              <div>
                <label className={label} htmlFor="imagen">Imagen de la categoría</label>
                {cat.imagen_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.imagen_url} alt="" className="mt-2 h-28 w-full rounded-lg object-cover" />
                )}
                <input id="imagen" name="imagen" type="file" accept="image/*" className={input} />
                <p className={ayuda}>JPG, PNG o WEBP, máximo 8 MB. Opcional.</p>
                {cat.imagen_url && (
                  <label className="mt-2 flex items-center gap-2 text-sm text-brand-blue">
                    <input type="checkbox" name="quitar_imagen" /> Quitar imagen actual
                  </label>
                )}
              </div>
            </div>
            <div className="mt-5">
              <BotonGuardar />
            </div>
          </form>

          <form action={borrarCategoria} className="rounded-xl border border-red-200 bg-white p-6">
            <input type="hidden" name="id" value={cat.id} />
            <h2 className="font-bold text-red-700">Eliminar categoría</h2>
            <p className="mt-1 text-sm text-brand-blue">
              Borra la categoría <b>y sus {productos.length} productos</b>, con sus fotos y fichas.
              Si solo quieres ocultarla, desmarca &quot;Visible en el sitio&quot;.
            </p>
            <div className="mt-4">
              <BotonConfirmar
                mensaje={`¿Eliminar "${cat.nombre}" y sus ${productos.length} productos? No se puede deshacer.`}
                className={botonPeligro}
              >
                Eliminar categoría
              </BotonConfirmar>
            </div>
          </form>
        </div>

        {/* ---- Productos ---- */}
        <div className="space-y-6">
          <div className={tarjeta}>
            <h2 className="text-lg font-bold text-brand-navy">Productos ({productos.length})</h2>
            <ul className="mt-4 divide-y divide-brand-line">
              {productos.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/productos/${p.id}`}
                    className="flex items-center gap-4 py-3 transition hover:bg-brand-mist"
                  >
                    {p.imagen_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imagen_url} alt="" className="h-12 w-12 rounded object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-brand-mist text-xs text-brand-steel">
                        sin foto
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-brand-navy">
                        {p.nombre}
                        {p.destacado && <span className="ml-2 text-xs text-brand-accent-dark">★ destacado</span>}
                        {!p.activo && <span className="ml-2 rounded bg-gray-200 px-1.5 text-xs text-gray-600">oculto</span>}
                      </p>
                      <p className="truncate text-sm text-brand-blue/80">{p.descripcion}</p>
                    </div>
                    {p.ficha_tecnica_url && <span className="text-xs font-semibold text-brand-steel">PDF</span>}
                    <span className="text-brand-steel">›</span>
                  </Link>
                </li>
              ))}
              {!productos.length && <li className="py-3 text-sm text-brand-blue">Aún no hay productos.</li>}
            </ul>
          </div>

          <form action={crearProducto} className={tarjeta}>
            <input type="hidden" name="categoria_id" value={cat.id} />
            <h2 className="text-lg font-bold text-brand-navy">Agregar producto</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className={label} htmlFor="p-nombre">Nombre</label>
                <input id="p-nombre" name="nombre" required className={input} />
              </div>
              <div>
                <label className={label} htmlFor="p-desc">Descripción</label>
                <textarea id="p-desc" name="descripcion" rows={2} className={input} />
              </div>
            </div>
            <p className={ayuda}>Después de crearlo podrás subir su foto y ficha técnica.</p>
            <div className="mt-5">
              <BotonGuardar pendiente="Creando…">Agregar producto</BotonGuardar>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
