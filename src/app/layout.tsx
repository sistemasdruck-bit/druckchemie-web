import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Druck Chemie México | Químicos para Artes Gráficas",
  description:
    "Druck Chemie desarrolla, fabrica y distribuye productos químicos, técnicos y auxiliares para la industria de las artes gráficas en México.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-brand-cream text-brand-navy">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
