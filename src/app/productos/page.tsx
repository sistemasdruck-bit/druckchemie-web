import type { Metadata } from "next";
import Link from "next/link";
import { categoriasProductos } from "@/data/productos";

export const metadata: Metadata = {
  title: "Productos | Druck Chemie México",
};

export default function ProductosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        Catálogo
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy">
        Productos y líneas de trabajo
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-brand-blue/80">
        Este catálogo se moverá próximamente a una base de datos dinámica
        (Supabase) para que se pueda actualizar sin tocar código: precios,
        fichas técnicas y disponibilidad. Por ahora refleja el catálogo
        publicado hoy en el sitio actual.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categoriasProductos.map((cat) => (
          <a
            key={cat.slug}
            href={`#${cat.slug}`}
            className="rounded-full border border-brand-line px-4 py-1.5 text-sm font-medium text-brand-blue hover:border-brand-accent hover:text-brand-accent"
          >
            {cat.nombre}
          </a>
        ))}
      </div>

      <div className="mt-14 space-y-16">
        {categoriasProductos.map((cat) => (
          <section key={cat.slug} id={cat.slug} className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-navy">{cat.nombre}</h2>
            <p className="mt-2 max-w-3xl text-brand-blue/70">{cat.resumen}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.productos.map((producto) => (
                <div
                  key={producto.nombre}
                  className="rounded-xl border border-brand-line bg-white p-5"
                >
                  <h3 className="font-semibold text-brand-navy">
                    {producto.nombre}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-blue/70">
                    {producto.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
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
          className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand-teal hover:bg-brand-cream"
        >
          Solicitar cotización
        </Link>
      </div>
    </div>
  );
}
