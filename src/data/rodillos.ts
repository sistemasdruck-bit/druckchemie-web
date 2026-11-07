// Marcas de prensa y modelos para los que Druck Chemie maneja rodillos.
// Fuente: catálogo del sistema cotizador-rodillos (marca y modelo de máquina
// de los SKU activos), extraído el 2026-11-07. Se excluyen las entradas
// internas "Por definir" / "Otros rodillos".

export type MarcaRodillos = {
  slug: string;
  nombre: string;
  modelos: string[];
};

export const marcasRodillos: MarcaRodillos[] = [
  {
    slug: "heidelberg",
    nombre: "Heidelberg",
    modelos: [
      "GTO",
      "MO",
      "SM-52",
      "SM-72",
      "SM-74",
      "74-CD",
      "SM-102",
      "H1-SM102",
      "CX-104",
      "XL-105",
    ],
  },
  {
    slug: "kba",
    nombre: "KBA",
    modelos: ["Rapida 105", "Rapida 106 (P42)"],
  },
  {
    slug: "komori",
    nombre: "Komori",
    modelos: [
      "Lithrone 26",
      "Lithrone 26 OS",
      "Lithrone 28",
      "Lithrone 40",
      "Enthrone 29",
      "Spica 29 P",
      "Sprint 26 OS",
      "Sprint II 26",
      "Sprint II 28",
    ],
  },
  {
    slug: "man-roland",
    nombre: "MAN Roland",
    modelos: ["R300", "R500", "R700", "R900", "RB 200", "Rekord"],
  },
  {
    slug: "mitsubishi",
    nombre: "Mitsubishi",
    modelos: ["1FH-28", "3FH-40 Diamond"],
  },
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
