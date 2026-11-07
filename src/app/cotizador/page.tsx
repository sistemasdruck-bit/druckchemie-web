import type { Metadata } from "next";
import { getCatalogo } from "@/lib/catalogo";
import CotizadorForm from "@/components/CotizadorForm";

export const metadata: Metadata = {
  title: "Cotizador | Druck Chemie México",
  description:
    "Elige los productos que necesitas, cuéntanos de tu prensa y recibe una cotización de Druck Chemie México.",
};

// Página dinámica: lee ?producto= para preseleccionar un producto desde el catálogo.
export default async function CotizadorPage(props: PageProps<"/cotizador">) {
  const sp = await props.searchParams;
  const producto = Array.isArray(sp.producto) ? sp.producto[0] : sp.producto;
  const catalogo = await getCatalogo();
  const categorias = catalogo
    .filter((c) => c.productos.length)
    .map((c) => ({
      slug: c.slug,
      nombre: c.nombre,
      productos: c.productos.map((p) => ({
        slug: p.slug,
        nombre: p.nombre,
        descripcion: p.descripcion,
      })),
    }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">Cotizador</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        Solicita tu cotización
      </h1>
      <p className="mt-6 max-w-3xl border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
        Elige los productos y las cantidades, cuéntanos qué prensa utilizas y un asesor te enviará
        la cotización formal con precios y tiempos de entrega.
      </p>
      <div className="mt-14">
        <CotizadorForm categorias={categorias} preseleccion={producto} />
      </div>
    </div>
  );
}
