import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { esAdmin, adminConfigurado } from "@/lib/adminAuth";

export const metadata: Metadata = {
  title: "Acceso | Panel Druck Chemie",
  robots: { index: false, follow: false },
};

export default async function LoginPage(props: PageProps<"/admin/login">) {
  if (await esAdmin()) redirect("/admin");
  const { error } = await props.searchParams;
  const configurado = adminConfigurado();

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-6">
      <div className="w-full max-w-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/druckchemie-logo.svg" alt="Druck Chemie" className="mx-auto h-12 w-auto" />
        <form
          action="/api/admin/login"
          method="post"
          className="mt-8 rounded-2xl bg-white p-8 shadow-xl"
        >
          <h1 className="text-xl font-extrabold text-brand-navy">Panel de administración</h1>
          <p className="mt-1 text-sm text-brand-blue">
            Catálogo, galería y mensajes del sitio.
          </p>

          {!configurado && (
            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Falta configurar la variable <b>ADMIN_PASSWORD</b> en el servidor.
            </p>
          )}
          {error === "1" && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              Contraseña incorrecta.
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold text-brand-navy" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-brand-line px-3 py-2 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-brand-accent py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-accent-dark hover:text-white"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-white/50">
          <Link href="/" className="hover:text-white">← Volver al sitio</Link>
        </p>
      </div>
    </div>
  );
}
