// Piezas visuales compartidas del panel /admin.

export function Aviso({ ok, err }: { ok?: string | string[]; err?: string | string[] }) {
  const okT = Array.isArray(ok) ? ok[0] : ok;
  const errT = Array.isArray(err) ? err[0] : err;
  if (errT)
    return (
      <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
        ⚠️ {errT}
      </div>
    );
  if (okT)
    return (
      <div className="mb-6 rounded-lg border border-brand-accent/50 bg-brand-accent/10 px-4 py-3 text-sm text-brand-navy">
        ✓ {okT}
      </div>
    );
  return null;
}

export const input =
  "mt-1 w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm text-brand-navy focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30";
export const label = "block text-sm font-semibold text-brand-navy";
export const ayuda = "mt-1 text-xs text-brand-blue/70";
export const tarjeta = "rounded-xl border border-brand-line bg-white p-6";
export const botonPeligro =
  "rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-600 hover:text-white";
export const botonSecundario =
  "rounded-full border border-brand-line px-4 py-2 text-sm font-semibold text-brand-navy transition hover:border-brand-accent";

export function Titulo({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy">{children}</h1>
      {sub && <p className="mt-2 text-brand-blue">{sub}</p>}
    </div>
  );
}
