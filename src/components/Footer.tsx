import Link from "next/link";

const FACEBOOK_URL = "https://www.facebook.com/share/1HWqsKnVJ2/";
const TELEFONO = "+52 (55) 3536-8868";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/druckchemie-logo.svg"
            alt="Druck Chemie México"
            width={234}
            height={75}
            className="h-11 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Desarrollamos, fabricamos y distribuimos productos químicos,
            técnicos y auxiliares para la industria de las artes gráficas.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Navegación
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link href="/nosotros" className="hover:text-brand-accent">Nosotros</Link></li>
            <li><Link href="/productos" className="hover:text-brand-accent">Productos</Link></li>
            <li><Link href="/galeria" className="hover:text-brand-accent">Galería</Link></li>
            <li><Link href="/blog" className="hover:text-brand-accent">Noticias</Link></li>
            <li><Link href="/cotizador" className="hover:text-brand-accent">Cotizador</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Contacto
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>{TELEFONO}</li>
            <li>
              <Link href="/contacto" className="hover:text-brand-accent">
                Ir al formulario de contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Síguenos
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent"
              >
                Facebook
              </a>
            </li>
            <li>
              <Link href="/clientes" className="hover:text-brand-accent">
                Acceso para clientes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Druck Chemie México. Todos los derechos reservados.
      </div>
    </footer>
  );
}
