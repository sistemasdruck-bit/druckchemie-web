"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/rodillos", label: "Rodillos" },
  { href: "/galeria", label: "Galería" },
  { href: "/blog", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-navy">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3 sm:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/20-anos-blanco-sm.png"
            alt="20 años"
            width={360}
            height={188}
            className="h-8 w-auto sm:h-10"
          />
          <span aria-hidden className="h-8 w-px bg-white/20 sm:h-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/druckchemie-logo.svg"
            alt="Druck Chemie México"
            width={234}
            height={75}
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-white/85 transition hover:text-brand-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link
            href="/cotizador"
            className="rounded-full bg-brand-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-navy shadow-sm transition hover:bg-white"
          >
            Solicitar cotización
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-white xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-navy xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-brand-accent"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cotizador"
              className="mt-2 rounded-full bg-brand-accent px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-brand-navy"
              onClick={() => setOpen(false)}
            >
              Solicitar cotización
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
