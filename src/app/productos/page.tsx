import type { Metadata } from "next";
import Link from "next/link";
import { getCatalogo } from "@/lib/catalogo";
import { marcasRodillos } from "@/data/rodillos";

export const metadata: Metadata = {
  title: "Productos | Druck Chemie México",
};

export const revalidate = 60;

export default async function ProductosPage() {
  const categoriasProductos = await getCatalogo();
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
        Catálogo
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        Productos y líneas de trabajo
      </h1>
      <p className="mt-6 max-w-3xl border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
        Químicos y consumibles para impresión offset convencional, híbrida y
        UV, compatibles con las principales marcas de prensas del mercado.
        Descarga la ficha técnica de cada producto o pídenos una
        recomendación para tu equipo.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categoriasProductos.map((cat) => (
          <a
            key={cat.slug}
            href={`#${cat.slug}`}
            className="rounded-full border border-brand-line px-4 py-1.5 text-sm font-medium text-brand-blue transition hover:border-brand-accent hover:bg-brand-accent hover:text-white"
          >
            {cat.nombre}
          </a>
        ))}
        <a
          href="#rodillos"
          className="rounded-full border border-brand-line px-4 py-1.5 text-sm font-medium text-brand-blue transition hover:border-brand-accent hover:bg-brand-accent hover:text-white"
        >
          Rodillos
        </a>
      </div>

      <div className="mt-14 space-y-16">
        {categoriasProductos.map((cat) => (
          <section key={cat.slug} id={cat.slug} className="scroll-mt-28">
            <h2 className="border-l-4 border-brand-accent pl-4 text-2xl font-extrabold text-brand-navy">
              {cat.nombre}
            </h2>
            <p className="mt-2 max-w-3xl pl-4 text-brand-blue/80">{cat.resumen}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.productos.map((producto) => (
                <div
                  key={producto.slug}
                  className={`flex flex-col overflow-hidden rounded-lg border bg-white ${
                    producto.destacado ? "border-brand-accent" : "border-brand-line"
                  }`}
                >
                  {producto.imagen_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={producto.imagen_url}
                      alt={producto.nombre}
                      loading="lazy"
                      className="aspect-[4/3] w-full bg-brand-mist object-contain"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    {producto.destacado && (
                      <span className="mb-2 self-start rounded-full bg-brand-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-navy">
                        Destacado
                      </span>
                    )}
                    <h3 className="font-bold text-brand-navy">
                      {producto.nombre}
                    </h3>
                    <p className="mt-1.5 text-sm text-brand-blue/80">
                      {producto.descripcion}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
                      {producto.ficha_tecnica_url && (
                        <a
                          href={producto.ficha_tecnica_url}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent-dark hover:text-brand-navy"
                        >
                          Ficha técnica (PDF) ↓
                        </a>
                      )}
                      <Link
                        href={`/cotizador?producto=${encodeURIComponent(producto.slug)}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-accent-dark"
                      >
                        Cotizar →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section id="rodillos" className="scroll-mt-28">
          <h2 className="border-l-4 border-brand-accent pl-4 text-2xl font-extrabold text-brand-navy">
            Rodillos
          </h2>
          <p className="mt-2 max-w-3xl pl-4 text-brand-blue/80">
            Contamos con rodillos UV, convencionales e híbridos, según las
            necesidades y especificaciones de la máquina de cada cliente.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marcasRodillos.map((marca) => (
              <div
                key={marca.slug}
                className="flex flex-col rounded-lg border border-brand-line bg-white p-5"
              >
                <h3 className="font-bold text-brand-navy">{marca.nombre}</h3>
                <p className="mt-1.5 text-sm text-brand-blue/80">
                  Rodillos para prensas {marca.nombre}.
                </p>
                <Link
                  href="/contacto"
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-navy hover:text-brand-accent-dark"
                >
                  Consultar →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-16 rounded-2xl bg-brand-teal px-8 py-10 text-center text-white">
        <h2 className="text-xl font-bold">
          ¿No encuentras lo que buscas para tu prensa?
        </h2>
        <p className="mt-2 text-white/85">
          Dinos qué marca y modelo usas y te recomendamos la línea correcta.
        </p>
        <Link
          href="/cotizador"
          className="mt-6 inline-block rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white"
        >
          Solicitar cotización
        </Link>
      </div>
    </div>
  );
}
