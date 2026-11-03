import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { guardarProducto, borrarProducto } from "../../../actions";
import BotonGuardar from "@/components/admin/BotonGuardar";
import BotonConfirmar from "@/components/admin/BotonConfirmar";
import { Aviso, Titulo, input, label, ayuda, tarjeta, botonPeligro } from "@/components/admin/ui";

export default async function ProductoAdmin(props: PageProps<"/admin/productos/[id]">) {
  const { id } = await props.params;
  const sp = await props.searchParams;
  if (!supabaseAdmin) return <Aviso err="Supabase no está configurado." />;

  const { data: p } = await supabaseAdmin.from("productos").select("*").eq("id", id).maybeSingle();
  if (!p) notFound();
  const { data: cats } = await supabaseAdmin.from("categorias").select("id, nombre").order("orden");

  return (
    <>
      <p className="mb-2 text-sm">
        <Link href={`/admin/categorias/${p.categoria_id}`} className="text-brand-blue hover:text-brand-accent-dark">
          ← Volver a la categoría
        </Link>
      </p>
      <Titulo>{p.nombre}</Titulo>
      <Aviso ok={sp.ok} err={sp.err} />

      <form action={guardarProducto} className={`${tarjeta} max-w-3xl`}>
        <input type="hidden" name="id" value={p.id} />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" defaultValue={p.nombre} required className={input} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows={4} defaultValue={p.descripcion ?? ""} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="categoria_id">Categoría</label>
            <select id="categoria_id" name="categoria_id" defaultValue={p.categoria_id} className={input}>
              {(cats ?? []).map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="orden">Orden</label>
            <input id="orden" name="orden" type="number" defaultValue={p.orden} className={input} />
          </div>
          <div className="flex flex-wrap gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
              <input type="checkbox" name="activo" defaultChecked={p.activo} className="h-4 w-4 accent-brand-accent" />
              Visible en el sitio
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
              <input type="checkbox" name="destacado" defaultChecked={p.destacado} className="h-4 w-4 accent-brand-accent" />
              Destacado
            </label>
          </div>

          <div className="sm:col-span-2 border-t border-brand-line pt-5">
            <label className={label} htmlFor="imagen">Foto del producto</label>
            {p.imagen_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imagen_url} alt="" className="mt-2 h-40 rounded-lg border border-brand-line object-contain" />
            )}
            <input id="imagen" name="imagen" type="file" accept="image/*" className={input} />
            <p className={ayuda}>JPG, PNG o WEBP, máximo 8 MB. Si subes una nueva, reemplaza la actual.</p>
            {p.imagen_url && (
              <label className="mt-2 flex items-center gap-2 text-sm text-brand-blue">
                <input type="checkbox" name="quitar_imagen" /> Quitar foto actual
              </label>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={label} htmlFor="ficha">Ficha técnica (PDF)</label>
            {p.ficha_tecnica_url && (
              <p className="mt-1 text-sm">
                <a href={p.ficha_tecnica_url} target="_blank" className="font-semibold text-brand-accent-dark underline">
                  Ver ficha actual ↗
                </a>
              </p>
            )}
            <input id="ficha" name="ficha" type="file" accept="application/pdf" className={input} />
            <p className={ayuda}>Solo PDF, máximo 15 MB.</p>
            {p.ficha_tecnica_url && (
              <label className="mt-2 flex items-center gap-2 text-sm text-brand-blue">
                <input type="checkbox" name="quitar_ficha" /> Quitar ficha actual
              </label>
            )}
          </div>
        </div>
        <div className="mt-6">
          <BotonGuardar />
        </div>
      </form>

      <form action={borrarProducto} className="mt-6 max-w-3xl rounded-xl border border-red-200 bg-white p-6">
        <input type="hidden" name="id" value={p.id} />
        <p className="text-sm text-brand-blue">
          Para ocultarlo temporalmente basta con desmarcar &quot;Visible en el sitio&quot;.
        </p>
        <div className="mt-3">
          <BotonConfirmar mensaje={`¿Eliminar "${p.nombre}"? No se puede deshacer.`} className={botonPeligro}>
            Eliminar producto
          </BotonConfirmar>
        </div>
      </form>
    </>
  );
}
