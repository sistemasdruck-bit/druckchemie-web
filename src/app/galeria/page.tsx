import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería | Druck Chemie México",
};

// Placeholders hasta recibir fotos reales de planta/productos (carpeta OneDrive "PAGINA WEB").
const placeholders = Array.from({ length: 8 }, (_, i) => i + 1);

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
        Galería
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        Nuestra operación en imágenes
      </h1>
      <p className="mt-6 max-w-3xl border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
        En cuanto recibamos las fotografías de planta, producto y equipo, esta
        sección se llena con la galería real (guardada en Supabase Storage
        para poder administrarla sin tocar código). Por ahora se muestran
        espacios reservados para dimensionar el diseño.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {placeholders.map((n) => (
          <div
            key={n}
            className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-brand-line bg-white text-sm text-brand-blue/40"
          >
            Foto {n}
          </div>
        ))}
      </div>
    </div>
  );
}
