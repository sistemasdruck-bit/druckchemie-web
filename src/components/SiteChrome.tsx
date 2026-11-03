"use client";

import { usePathname } from "next/navigation";

/** Oculta el menú y pie de página públicos dentro del panel /admin. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
