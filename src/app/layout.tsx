import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

// Misma tipografía que el sitio corporativo (druckchemie.com): Inter.
// next/font la descarga en el build y la sirve desde nuestro dominio.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Druck Chemie México | Químicos para Artes Gráficas",
  description:
    "Druck Chemie desarrolla, fabrica y distribuye productos químicos, técnicos y auxiliares para la industria de las artes gráficas en México.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-brand-cream text-brand-navy">
        <SiteChrome>
          <Navbar />
        </SiteChrome>
        <main className="flex-1">{children}</main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  );
}
