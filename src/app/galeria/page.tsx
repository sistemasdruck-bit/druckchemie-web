import type { Metadata } from "next";
import { getGaleria } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Galería | Druck Chemie México",
};

export const revalidate = 60;

// Espacios reservados mientras no haya fotos cargadas desde /admin/galeria.
const placeholders = Array.from({ length: 8 }, (_, i) => i + 1);

export default async function GaleriaPage() {
  const fotos = await getGaleria();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
        Galería
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        Nuestra operación en imágenes
      </h1>
      <p className="mt-6 max-w-3xl border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
        Planta, producto y equipo de Druck Chemie México al servicio de la
        industria de las artes gráficas.
      </p>

      {fotos.length ? (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fotos.map((f) => (
            <figure
              key={f.id}
              className="group overflow-hidden rounded-xl border border-brand-line bg-white"
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.imagen_url}
                  alt={f.titulo ?? "Druck Chemie México"}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              {(f.titulo || f.descripcion) && (
                <figcaption className="p-4">
                  {f.titulo && <p className="font-bold text-brand-navy">{f.titulo}</p>}
                  {f.descripcion && (
                    <p className="mt-1 text-sm text-brand-blue/80">{f.descripcion}</p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {placeholders.map((n) => (
            <div
              key={n}
              className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-brand-line bg-white text-sm text-brand-blue/40"
            >
              Próximamente
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
