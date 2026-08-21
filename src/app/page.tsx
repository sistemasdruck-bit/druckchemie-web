import Link from "next/link";
import { categoriasProductos } from "@/data/productos";
import ArrowLink from "@/components/ArrowLink";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,198,63,0.22),transparent_55%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,53,20,0.9),rgba(6,8,6,0.97))]"
        />
        <div className="relative mx-auto max-w-7xl border-l-4 border-brand-accent px-6 py-24 lg:py-32">
          <p className="mb-4 inline-block rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Químicos técnicos para artes gráficas
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Bienvenidos a Druck Chemie México
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Desarrollamos, fabricamos y distribuimos soluciones de fuente,
            lavadores, aditivos para placas y consumibles para la industria
            de la impresión offset, compatibles con los principales
            fabricantes de prensas del mercado.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <ArrowLink href="/nosotros" variant="light">
              Sobre nosotros
            </ArrowLink>
            <ArrowLink href="/productos" variant="light">
              Nuestros productos
            </ArrowLink>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { valor: "7", etiqueta: "líneas de producto" },
              { valor: "5+", etiqueta: "marcas de prensa compatibles" },
              { valor: "FOGRA", etiqueta: "certificaciones en productos clave" },
              { valor: "MX", etiqueta: "distribución nacional" },
            ].map((stat) => (
              <div key={stat.etiqueta} className="border-t border-white/15 pt-4">
                <p className="text-2xl font-bold text-brand-accent">{stat.valor}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/60">
                  {stat.etiqueta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión rápida */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="border-l-4 border-brand-accent pl-6">
            <h2 className="text-3xl font-extrabold text-brand-navy">
              Quiénes somos
            </h2>
            <p className="mt-4 text-brand-blue">
              En Druck Chemie queremos forjar relaciones sólidas y duraderas
              con nuestros clientes, distinguiéndonos por la calidad y dejando
              huella como una compañía confiable en la industria de las artes
              gráficas.
            </p>
            <div className="mt-5">
              <ArrowLink href="/nosotros">Conoce más</ArrowLink>
            </div>
          </div>
          {[
            {
              titulo: "Innovación",
              texto: "Buscamos constantemente mejores fórmulas y procesos para la industria gráfica.",
            },
            {
              titulo: "Servicio y puntualidad",
              texto: "Acompañamos a cada cliente con atención cercana y tiempos de entrega confiables.",
            },
          ].map((valor) => (
            <div key={valor.titulo} className="border-l-4 border-brand-line pl-6">
              <h3 className="text-lg font-bold text-brand-navy">{valor.titulo}</h3>
              <p className="mt-2 text-sm text-brand-blue/80">{valor.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías de producto */}
      <section className="bg-brand-mist py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between border-l-4 border-brand-accent pl-6">
            <div>
              <h2 className="text-3xl font-extrabold text-brand-navy">
                Nuestras líneas de producto
              </h2>
              <p className="mt-2 max-w-2xl text-brand-blue">
                Soluciones para cada etapa del proceso de impresión offset,
                convencional y UV.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-[1px] bg-brand-line sm:grid-cols-2 lg:grid-cols-4">
            {categoriasProductos.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/productos#${cat.slug}`}
                className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-brand-olive p-6 text-white transition-colors duration-300 hover:bg-brand-accent"
                style={{
                  backgroundImage:
                    i % 2 === 0
                      ? "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)"
                      : "linear-gradient(315deg, rgba(255,255,255,0.06), transparent 60%)",
                }}
              >
                <h3 className="text-lg font-bold leading-snug">{cat.nombre}</h3>
                <p className="mt-2 text-sm text-white/75 group-hover:text-brand-navy/80">
                  {cat.resumen}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                  Ver categoría
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand-navy transition group-hover:bg-brand-navy group-hover:text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
            <Link
              href="/productos"
              className="group relative flex min-h-[220px] flex-col items-start justify-between overflow-hidden bg-brand-accent p-6 text-brand-navy transition-colors duration-300 hover:bg-brand-navy hover:text-white"
            >
              <h3 className="text-lg font-bold leading-snug">
                Ver catálogo completo
              </h3>
              <p className="mt-2 text-sm text-brand-navy/80 group-hover:text-white/75">
                Todas las líneas y productos, con fichas detalladas.
              </p>
              <span className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-white transition group-hover:bg-white group-hover:text-brand-navy">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl bg-brand-teal px-8 py-14 text-center text-white sm:px-16">
          <h2 className="text-3xl font-bold">
            ¿Listo para optimizar los insumos de tu prensa?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Cuéntanos qué equipo utilizas y qué necesitas — te preparamos una
            cotización a la medida de tu operación.
          </p>
          <Link
            href="/cotizador"
            className="mt-8 inline-block rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </div>
  );
}
