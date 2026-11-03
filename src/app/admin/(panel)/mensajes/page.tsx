import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { marcarMensaje } from "../../actions";
import { Aviso, Titulo, botonSecundario } from "@/components/admin/ui";

type Lead = {
  id: string;
  nombre: string;
  empresa: string | null;
  email: string;
  telefono: string | null;
  mensaje: string;
  atendido: boolean;
  created_at: string;
};

const fecha = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Mexico_City",
});

export default async function MensajesAdmin(props: PageProps<"/admin/mensajes">) {
  const sp = await props.searchParams;
  let leads: Lead[] = [];
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    leads = (data ?? []) as Lead[];
  }
  const pendientes = leads.filter((l) => !l.atendido).length;

  return (
    <>
      <Titulo sub={`Formulario de Contacto del sitio. ${pendientes} pendiente(s) de atender.`}>
        Mensajes
      </Titulo>
      <Aviso err={sp.err} />
      <div className="space-y-4">
        {leads.map((l) => (
          <div
            key={l.id}
            className={`rounded-xl border bg-white p-5 ${l.atendido ? "border-brand-line opacity-70" : "border-brand-accent"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold text-brand-navy">
                  {l.nombre}
                  {l.empresa && <span className="font-normal text-brand-blue"> · {l.empresa}</span>}
                </p>
                <p className="text-sm text-brand-blue">
                  <a href={`mailto:${l.email}`} className="underline">{l.email}</a>
                  {l.telefono && <> · <a href={`tel:${l.telefono}`}>{l.telefono}</a></>}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-brand-steel">{fecha.format(new Date(l.created_at))}</span>
                <form action={marcarMensaje}>
                  <input type="hidden" name="id" value={l.id} />
                  <input type="hidden" name="atendido" value={String(!l.atendido)} />
                  <button className={botonSecundario}>
                    {l.atendido ? "Marcar pendiente" : "✓ Marcar atendido"}
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-brand-navy">{l.mensaje}</p>
          </div>
        ))}
        {!leads.length && <p className="text-brand-blue">Aún no hay mensajes.</p>}
      </div>
    </>
  );
}
