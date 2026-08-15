import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noticias | Druck Chemie México",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        Noticias
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy">
        Estamos preparando esta sección
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-blue/80">
        Aquí publicaremos noticias de la industria, novedades de producto y
        contenido pensado para atraer tráfico desde buscadores y desde
        Facebook. Los artículos se administrarán desde Supabase, sin
        necesidad de tocar código para publicar uno nuevo.
      </p>
    </div>
  );
}
