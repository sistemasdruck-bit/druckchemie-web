// Marcas de prensa para las que Druck Chemie maneja rodillos.
// Fuente: catálogo del sistema cotizador-rodillos (marca de máquina de los
// SKU activos), extraído el 2026-11-07. El sitio muestra solo las marcas, no
// los modelos. Se excluyen las entradas internas "Por definir" / "Otros rodillos".

export type MarcaRodillos = {
  slug: string;
  nombre: string;
};

export const marcasRodillos: MarcaRodillos[] = [
  { slug: "heidelberg", nombre: "Heidelberg" },
  { slug: "kba", nombre: "KBA" },
  { slug: "komori", nombre: "Komori" },
  { slug: "man-roland", nombre: "MAN Roland" },
  { slug: "mitsubishi", nombre: "Mitsubishi" },
];

export const tiposRodillo = [
  {
    nombre: "UV",
    texto: "Para prensas que trabajan con tintas y lavadores UV.",
  },
  {
    nombre: "Convencional",
    texto: "Para impresión offset con tintas convencionales.",
  },
  {
    nombre: "Híbrido",
    texto: "Para equipos que alternan entre tinta convencional y UV.",
  },
];
