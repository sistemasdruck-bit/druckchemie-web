import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { subirFotos, guardarFoto, borrarFoto } from "../../actions";
import BotonGuardar from "@/components/admin/BotonGuardar";
import BotonConfirmar from "@/components/admin/BotonConfirmar";
import { Aviso, Titulo, input, label, ayuda, tarjeta, botonPeligro } from "@/components/admin/ui";

type Foto = {
  id: string;
  titulo: string | null;
  descripcion: string | null;
  imagen_url: string;
  orden: number;
  activo: boolean;
};

export default async function GaleriaAdmin(props: PageProps<"/admin/galeria">) {
  const sp = await props.searchParams;
  let fotos: Foto[] = [];
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin.from("galeria").select("*").order("orden");
    fotos = (data ?? []) as Foto[];
  }

  return (
    <>
      <Titulo sub="Fotos de planta, producto y equipo que aparecen en la página Galería.">Galería</Titulo>
      <Aviso ok={sp.ok} err={sp.err} />

      <form action={subirFotos} className={`${tarjeta} max-w-2xl`}>
        <h2 className="text-lg font-bold text-brand-navy">Subir fotos</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={label} htmlFor="fotos">Fotos</label>
            <input id="fotos" name="fotos" type="file" accept="image/*" multiple required className={input} />
            <p className={ayuda}>
              Puedes elegir varias a la vez. Máximo 8 MB cada una y unos 18 MB por envío; si son
              muchas, súbelas en tandas.
            </p>
          </div>
          <div>
            <label className={label} htmlFor="titulo">Título (opcional, se aplica a todas)</label>
            <input id="titulo" name="titulo" className={input} placeholder="Ej. Planta Querétaro" />
          </div>
        </div>
        <div className="mt-5">
          <BotonGuardar pendiente="Subiendo…">Subir</BotonGuardar>
        </div>
      </form>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {fotos.map((f) => (
          <div key={f.id} className="overflow-hidden rounded-xl border border-brand-line bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.imagen_url} alt={f.titulo ?? ""} className={`aspect-[4/3] w-full object-cover ${f.activo ? "" : "opacity-40"}`} />
            <form action={guardarFoto} className="space-y-3 p-4">
              <input type="hidden" name="id" value={f.id} />
              <input name="titulo" defaultValue={f.titulo ?? ""} placeholder="Título" className={input} />
              <input name="descripcion" defaultValue={f.descripcion ?? ""} placeholder="Descripción" className={input} />
              <div className="flex items-center gap-4">
                <input name="orden" type="number" defaultValue={f.orden} className={`${input} w-20`} aria-label="Orden" />
                <label className="mt-1 flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  <input type="checkbox" name="activo" defaultChecked={f.activo} className="h-4 w-4 accent-brand-accent" />
                  Visible
                </label>
              </div>
              <BotonGuardar>Guardar</BotonGuardar>
            </form>
            <form action={borrarFoto} className="border-t border-brand-line px-4 py-3">
              <input type="hidden" name="id" value={f.id} />
              <BotonConfirmar mensaje="¿Eliminar esta foto?" className={botonPeligro}>
                Eliminar
              </BotonConfirmar>
            </form>
          </div>
        ))}
      </div>
      {!fotos.length && <p className="mt-8 text-brand-blue">Todavía no hay fotos en la galería.</p>}
    </>
  );
}
