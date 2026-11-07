import type { Metadata } from "next";
import Link from "next/link";
import { marcasRodillos, tiposRodillo } from "@/data/rodillos";

export const metadata: Metadata = {
  title: "Rodillos | Druck Chemie México",
  description:
    "Rodillos UV, convencionales e híbridos para prensas Heidelberg, KBA, Komori, MAN Roland y Mitsubishi, según las especificaciones de la máquina de cada cliente.",
};

export default function RodillosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
        Rodillos
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        Rodillos para la prensa de cada cliente
      </h1>
      <p className="mt-6 max-w-3xl border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
        Contamos con los tres tipos de rodillos: <strong>UV</strong>,{" "}
        <strong>convencionales</strong> e <strong>híbridos</strong>, según las
        necesidades y especificaciones de la máquina de cada cliente.
      </p>

      {/* Tipos */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiposRodillo.map((tipo) => (
          <div
            key={tipo.nombre}
            className="rounded-2xl bg-brand-olive p-6 text-white"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
            }}
          >
            <h2 className="text-xl font-extrabold text-brand-accent">
              {tipo.nombre}
            </h2>
            <p className="mt-2 text-sm text-white/80">{tipo.texto}</p>
          </div>
        ))}
      </div>

      {/* Marcas */}
      <h2 className="mt-20 border-l-4 border-brand-accent pl-4 text-3xl font-extrabold text-brand-navy">
        Marcas y modelos
      </h2>
      <p className="mt-3 max-w-3xl pl-4 text-brand-blue/80">
        Estas son las prensas para las que manejamos rodillos. Cada modelo se
        surte en la versión que requiere tu equipo.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {marcasRodillos.map((marca) => (
          <a
            key={marca.slug}
            href={`#${marca.slug}`}
            className="rounded-full border border-brand-line px-4 py-1.5 text-sm font-medium text-brand-blue transition hover:border-brand-accent hover:bg-brand-accent hover:text-white"
          >
            {marca.nombre}
          </a>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {marcasRodillos.map((marca) => (
          <section
            key={marca.slug}
            id={marca.slug}
            className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-line bg-white"
          >
            <div className="flex items-end justify-between bg-brand-navy px-6 py-5 text-white">
              <h3 className="text-2xl font-extrabold">{marca.nombre}</h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                {marca.modelos.length}{" "}
                {marca.modelos.length === 1 ? "modelo" : "modelos"}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2 p-6">
              {marca.modelos.map((modelo) => (
                <li
                  key={modelo}
                  className="rounded-full border border-brand-line bg-brand-mist px-3.5 py-1.5 text-sm font-medium text-brand-navy"
                >
                  {modelo}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-brand-teal px-8 py-10 text-center text-white">
        <h2 className="text-xl font-bold">¿No ves tu modelo en la lista?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-white/85">
          Cuéntanos la marca, el modelo y el tipo de tinta de tu prensa y te
          recomendamos el rodillo correcto: UV, convencional o híbrido.
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-block rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white"
        >
          Consultar por mi equipo
        </Link>
      </div>
    </div>
  );
}
