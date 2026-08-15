import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área de clientes | Druck Chemie México",
};

export default function ClientesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        Área de clientes
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy">
        Próximamente: acceso con tu cuenta
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-blue/80">
        Desde aquí cada cliente podrá iniciar sesión (con autenticación de
        Supabase) para ver el historial de sus cotizaciones y pedidos. Esta
        sección se activa una vez que el esquema de base de datos esté
        conectado.
      </p>
    </div>
  );
}
