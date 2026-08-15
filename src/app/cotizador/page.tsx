import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cotizador | Druck Chemie México",
};

export default function CotizadorPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        Cotizador
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy">
        El cotizador en línea está en construcción
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-blue/80">
        Aquí vivirá un formulario paso a paso donde el cliente elige marca y
        modelo de prensa, los productos que necesita y la cantidad, y la
        solicitud se guarda directo en nuestra base de datos (Supabase) para
        que ventas la atienda de inmediato — con historial visible desde el
        área de clientes.
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-brand-blue/50">
        Mientras se conecta la base de datos, usa el formulario de contacto
        general para pedir tu cotización.
      </p>
      <Link
        href="/contacto"
        className="mt-8 inline-block rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white hover:bg-brand-accent-dark"
      >
        Ir al formulario de contacto
      </Link>
    </div>
  );
}
