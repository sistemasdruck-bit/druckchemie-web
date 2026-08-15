import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto | Druck Chemie México",
};

const TELEFONO = "+52 (55) 3536-8868";

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        Contacto
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy">
        Hablemos de tu operación
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-brand-blue/80">
        Escríbenos y un asesor te contactará para revisar qué insumos
        necesitas según tu equipo y volumen de producción.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-brand-line bg-white p-6">
            <h2 className="font-semibold text-brand-navy">
              Datos de contacto directo
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-blue/80">
              <li>
                <span className="font-medium text-brand-navy">Teléfono:</span>{" "}
                {TELEFONO}
              </li>
              <li>
                <span className="font-medium text-brand-navy">Facebook:</span>{" "}
                <a
                  href="https://www.facebook.com/share/1HWqsKnVJ2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline"
                >
                  Página oficial
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-brand-blue/50">
              Nota: pendiente confirmar dirección física y correo de contacto
              directo para publicarlos aquí.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
