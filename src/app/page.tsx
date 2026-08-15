import Link from "next/link";
import { categoriasProductos } from "@/data/productos";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,98,44,0.25),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <p className="mb-4 inline-block rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-cream/80">
              Químicos técnicos para artes gráficas
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Confiabilidad y calidad para cada prensa,{" "}
              <span className="text-brand-accent">tirada tras tirada</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brand-cream/80">
              Desarrollamos, fabricamos y distribuimos soluciones de fuente,
              lavadores, aditivos para placas y consumibles para la industria
              de la impresión offset, compatibles con los principales
              fabricantes de prensas del mercado.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/cotizador"
                className="rounded-md bg-brand-accent px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-accent/20 transition hover:bg-brand-accent-dark"
              >
                Solicitar cotización
              </Link>
              <Link
                href="/productos"
                className="rounded-md border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/60"
              >
                Ver catálogo de productos
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { valor: "7", etiqueta: "líneas de producto" },
              { valor: "5+", etiqueta: "marcas de prensa compatibles" },
              { valor: "FOGRA", etiqueta: "certificaciones en productos clave" },
              { valor: "MX", etiqueta: "distribución nacional" },
            ].map((stat) => (
              <div
                key={stat.etiqueta}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-3xl font-bold text-brand-accent">{stat.valor}</p>
                <p className="mt-1 text-sm text-brand-cream/70">{stat.etiqueta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión rápida */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">
              Quiénes somos
            </h2>
            <p className="mt-4 text-brand-blue/80">
              En Druck Chemie queremos forjar relaciones sólidas y duraderas
              con nuestros clientes, distinguiéndonos por la calidad y dejando
              huella como una compañía confiable en la industria de las artes
              gráficas.
            </p>
            <Link
              href="/nosotros"
              className="mt-4 inline-block text-sm font-semibold text-brand-accent hover:underline"
            >
              Conoce más sobre nosotros →
            </Link>
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
            <div key={valor.titulo} className="rounded-xl border border-brand-line bg-white p-6">
              <h3 className="text-lg font-semibold text-brand-navy">{valor.titulo}</h3>
              <p className="mt-2 text-sm text-brand-blue/70">{valor.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorías de producto */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">
                Nuestras líneas de producto
              </h2>
              <p className="mt-2 max-w-2xl text-brand-blue/70">
                Soluciones para cada etapa del proceso de impresión offset,
                convencional y UV.
              </p>
            </div>
            <Link
              href="/productos"
              className="hidden shrink-0 text-sm font-semibold text-brand-accent hover:underline sm:inline"
            >
              Ver todo el catálogo →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoriasProductos.map((cat) => (
              <Link
                key={cat.slug}
                href={`/productos#${cat.slug}`}
                className="group rounded-xl border border-brand-line p-6 transition hover:border-brand-accent hover:shadow-md"
              >
                <h3 className="font-semibold text-brand-navy group-hover:text-brand-accent">
                  {cat.nombre}
                </h3>
                <p className="mt-2 text-sm text-brand-blue/70">{cat.resumen}</p>
              </Link>
            ))}
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
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand-teal transition hover:bg-brand-cream"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </div>
  );
}
