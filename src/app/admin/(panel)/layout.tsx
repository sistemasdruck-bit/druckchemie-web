import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import { supabaseAdminConfigured } from "@/lib/supabaseAdmin";

export const metadata: Metadata = {
  title: "Panel | Druck Chemie",
  robots: { index: false, follow: false },
};

const menu = [
  { href: "/admin", label: "Catálogo" },
  { href: "/admin/galeria", label: "Galería" },
  { href: "/admin/mensajes", label: "Mensajes" },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen bg-brand-mist">
      <header className="bg-brand-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/druckchemie-logo.svg" alt="Druck Chemie" className="h-8 w-auto" />
            <span className="rounded bg-brand-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-navy">
              Admin
            </span>
          </Link>
          <nav className="flex flex-1 flex-wrap gap-1">
            {menu.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a href="/" target="_blank" className="text-white/70 hover:text-white">
              Ver sitio ↗
            </a>
            <form action="/api/admin/logout" method="post">
              <button className="rounded-full border border-white/30 px-3 py-1 text-white/80 hover:bg-white hover:text-brand-navy">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {!supabaseAdminConfigured && (
          <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase no está configurado en el servidor: revisa las variables
            NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en Railway.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
