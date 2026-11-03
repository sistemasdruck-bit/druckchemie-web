// Lectura PÚBLICA del catálogo y la galería.
// Fuente principal: Supabase (solo registros activos, gracias a RLS).
// Respaldo: src/data/productos.ts — si Supabase no responde o no está
// configurado, el sitio sigue mostrando el catálogo base sin romperse.
import { supabase } from "./supabaseClient";
import { categoriasProductos } from "@/data/productos";

export type ProductoPublico = {
  slug: string;
  nombre: string;
  descripcion: string | null;
  imagen_url: string | null;
  ficha_tecnica_url: string | null;
  destacado: boolean;
};

export type CategoriaPublica = {
  slug: string;
  nombre: string;
  resumen: string | null;
  imagen_url: string | null;
  productos: ProductoPublico[];
};

export type FotoGaleria = {
  id: string;
  titulo: string | null;
  descripcion: string | null;
  imagen_url: string;
};

const TIMEOUT_MS = 6000;

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function catalogoLocal(): CategoriaPublica[] {
  return categoriasProductos.map((c) => ({
    slug: c.slug,
    nombre: c.nombre,
    resumen: c.resumen,
    imagen_url: null,
    productos: c.productos.map((p) => ({
      slug: slugify(p.nombre),
      nombre: p.nombre,
      descripcion: p.descripcion,
      imagen_url: null,
      ficha_tecnica_url: null,
      destacado: false,
    })),
  }));
}

type FilaCategoria = Omit<CategoriaPublica, "productos"> & {
  productos: (ProductoPublico & { orden: number; activo: boolean })[] | null;
};

export async function getCatalogo(): Promise<CategoriaPublica[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select(
          "slug, nombre, resumen, imagen_url, orden, productos(slug, nombre, descripcion, imagen_url, ficha_tecnica_url, destacado, orden, activo)"
        )
        .order("orden")
        .order("orden", { referencedTable: "productos" })
        .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
      if (error) throw error;
      const filas = (data ?? []) as unknown as FilaCategoria[];
      if (filas.length) {
        return filas.map((c) => ({
          slug: c.slug,
          nombre: c.nombre,
          resumen: c.resumen,
          imagen_url: c.imagen_url,
          productos: (c.productos ?? [])
            .filter((p) => p.activo)
            .map((p) => ({
              slug: p.slug,
              nombre: p.nombre,
              descripcion: p.descripcion,
              imagen_url: p.imagen_url,
              ficha_tecnica_url: p.ficha_tecnica_url,
              destacado: p.destacado,
            })),
        }));
      }
    } catch (e) {
      console.warn("[catalogo] Supabase no respondió; se usa el catálogo local.", e);
    }
  }
  return catalogoLocal();
}

export async function getGaleria(): Promise<FotoGaleria[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("galeria")
      .select("id, titulo, descripcion, imagen_url")
      .order("orden")
      .order("created_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(TIMEOUT_MS));
    if (error) throw error;
    return (data ?? []) as FotoGaleria[];
  } catch (e) {
    console.warn("[galeria] Supabase no respondió.", e);
    return [];
  }
}
