import Link from "next/link";

const FACEBOOK_URL = "https://www.facebook.com/share/1HWqsKnVJ2/";
const TELEFONO = "+52 (55) 3536-8868";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-brand-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-tight">
            DRUCK<span className="text-brand-accent">CHEMIE</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-brand-cream/70">
            Desarrollamos, fabricamos y distribuimos productos químicos,
            técnicos y auxiliares para la industria de las artes gráficas.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-cream/60">
            Navegación
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/nosotros" className="hover:text-brand-accent">Nosotros</Link></li>
            <li><Link href="/productos" className="hover:text-brand-accent">Productos</Link></li>
            <li><Link href="/galeria" className="hover:text-brand-accent">Galería</Link></li>
            <li><Link href="/blog" className="hover:text-brand-accent">Noticias</Link></li>
            <li><Link href="/cotizador" className="hover:text-brand-accent">Cotizador</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-cream/60">
            Contacto
          </p>
          <ul className="mt-4 space-y-2 text-sm text-brand-cream/80">
            <li>{TELEFONO}</li>
            <li>
              <Link href="/contacto" className="hover:text-brand-accent">
                Ir al formulario de contacto
              </Link>
            </li>
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent"
              >
                Síguenos en Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-cream/60">
            Clientes
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/clientes" className="hover:text-brand-accent">
                Acceso para clientes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-brand-cream/50">
        © {new Date().getFullYear()} Druck Chemie México. Todos los derechos reservados.
      </div>
    </footer>
  );
}
