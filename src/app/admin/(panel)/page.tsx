import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { crearCategoria } from "../actions";
import BotonGuardar from "@/components/admin/BotonGuardar";
import { Aviso, Titulo, input, label, tarjeta } from "@/components/admin/ui";

type Fila = {
  id: string;
  nombre: string;
  resumen: string | null;
  orden: number;
  activo: boolean;
  imagen_url: string | null;
  productos: { count: number }[];
};

export default async function CatalogoAdmin(props: PageProps<"/admin">) {
  const sp = await props.searchParams;
  let filas: Fila[] = [];
  let errorCarga: string | null = null;
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("categorias")
      .select("id, nombre, resumen, orden, activo, imagen_url, productos(count)")
      .order("orden");
    if (error) errorCarga = error.message;
    filas = (data ?? []) as unknown as Fila[];
  }

  return (
    <>
      <Titulo sub="Categorías y productos que se muestran en Inicio y en Productos. Los cambios se publican al guardar.">
        Catálogo
      </Titulo>
      <Aviso ok={sp.ok} err={sp.err ?? errorCarga ?? undefined} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filas.map((c) => (
          <Link
            key={c.id}
            href={`/admin/categorias/${c.id}`}
            className="group flex flex-col rounded-xl border border-brand-line bg-white p-5 transition hover:border-brand-accent hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold text-brand-steel">#{c.orden}</span>
              {!c.activo && (
                <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">
                  Oculta
                </span>
              )}
            </div>
            <h2 className="mt-1 text-lg font-bold text-brand-navy group-hover:text-brand-accent-dark">
              {c.nombre}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-brand-blue/80">{c.resumen}</p>
            <p className="mt-auto pt-4 text-sm font-semibold text-brand-navy">
              {c.productos?.[0]?.count ?? 0} producto(s) →
            </p>
          </Link>
        ))}
      </div>

      <form action={crearCategoria} className={`${tarjeta} mt-10 max-w-2xl`}>
        <h2 className="text-lg font-bold text-brand-navy">Nueva categoría</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={label} htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" required className={input} placeholder="Ej. Mantillas y Rodillos" />
          </div>
          <div>
            <label className={label} htmlFor="resumen">Resumen</label>
            <textarea id="resumen" name="resumen" rows={2} className={input} />
          </div>
        </div>
        <div className="mt-5">
          <BotonGuardar pendiente="Creando…">Crear categoría</BotonGuardar>
        </div>
      </form>
    </>
  );
}
