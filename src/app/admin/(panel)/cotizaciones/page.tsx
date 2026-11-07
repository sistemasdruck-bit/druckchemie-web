import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { marcarCotizacion } from "../../actions";
import { Aviso, Titulo, botonSecundario } from "@/components/admin/ui";
import { formatoFolio } from "@/lib/cotizacion";

type Partida = {
  id: string;
  producto_nombre: string;
  categoria_nombre: string | null;
  cantidad: number;
  unidad: string;
};

type Cotizacion = {
  id: string;
  folio: number;
  nombre: string;
  empresa: string | null;
  email: string;
  telefono: string | null;
  ciudad_estado: string | null;
  prensa_marca: string | null;
  prensa_modelo: string | null;
  tipo_impresion: string | null;
  comentarios: string | null;
  atendida: boolean;
  created_at: string;
  cotizacion_items: Partida[] | null;
};

const fecha = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Mexico_City",
});

export default async function CotizacionesAdmin(props: PageProps<"/admin/cotizaciones">) {
  const sp = await props.searchParams;
  let lista: Cotizacion[] = [];
  let falta = false;
  if (supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("cotizaciones")
      .select("*, cotizacion_items(*)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) falta = true;
    lista = (data ?? []) as Cotizacion[];
  }
  const pendientes = lista.filter((c) => !c.atendida).length;

  return (
    <>
      <Titulo sub={`Solicitudes del cotizador del sitio. ${pendientes} pendiente(s) de atender.`}>
        Cotizaciones
      </Titulo>
      <Aviso err={sp.err} />
      {falta && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No se pudo leer la tabla de cotizaciones. Falta correr el script
          supabase/002_cotizaciones.sql en el SQL Editor de Supabase.
        </div>
      )}
      <div className="space-y-4">
        {lista.map((c) => {
          const prensa = [c.prensa_marca, c.prensa_modelo].filter(Boolean).join(" ");
          const partidas = c.cotizacion_items ?? [];
          return (
            <div
              key={c.id}
              className={`rounded-xl border bg-white p-5 ${c.atendida ? "border-brand-line opacity-70" : "border-brand-accent"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-brand-navy">
                    <span className="mr-2 rounded bg-brand-mist px-2 py-0.5 text-xs">{formatoFolio(c.folio)}</span>
                    {c.nombre}
                    {c.empresa && <span className="font-normal text-brand-blue"> · {c.empresa}</span>}
                  </p>
                  <p className="mt-1 text-sm text-brand-blue">
                    <a href={`mailto:${c.email}`} className="underline">{c.email}</a>
                    {c.telefono && <> · <a href={`tel:${c.telefono}`}>{c.telefono}</a></>}
                    {c.ciudad_estado && <> · {c.ciudad_estado}</>}
                  </p>
                  {(prensa || c.tipo_impresion) && (
                    <p className="mt-1 text-sm text-brand-blue">
                      {prensa && <>Prensa: <span className="font-semibold text-brand-navy">{prensa}</span></>}
                      {prensa && c.tipo_impresion && " · "}
                      {c.tipo_impresion && <>{c.tipo_impresion}</>}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-brand-steel">{fecha.format(new Date(c.created_at))}</span>
                  <form action={marcarCotizacion}>
                    <input type="hidden" name="id" value={c.id} />
                    <input type="hidden" name="atendida" value={String(!c.atendida)} />
                    <button className={botonSecundario}>
                      {c.atendida ? "Marcar pendiente" : "✓ Marcar atendida"}
                    </button>
                  </form>
                </div>
              </div>

              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-line text-left text-xs uppercase tracking-wide text-brand-steel">
                    <th className="py-1.5 font-semibold">Producto</th>
                    <th className="py-1.5 font-semibold">Línea</th>
                    <th className="py-1.5 text-right font-semibold">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {partidas.map((p) => (
                    <tr key={p.id} className="border-b border-brand-line/60 last:border-0">
                      <td className="py-1.5 font-medium text-brand-navy">{p.producto_nombre}</td>
                      <td className="py-1.5 text-brand-blue">{p.categoria_nombre}</td>
                      <td className="py-1.5 text-right text-brand-navy">{Number(p.cantidad)} {p.unidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {c.comentarios && (
                <p className="mt-3 whitespace-pre-line rounded-lg bg-brand-mist p-3 text-sm text-brand-navy">
                  {c.comentarios}
                </p>
              )}
            </div>
          );
        })}
        {!lista.length && !falta && <p className="text-brand-blue">Aún no hay solicitudes de cotización.</p>}
      </div>
    </>
  );
}
