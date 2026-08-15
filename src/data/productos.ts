export type Producto = {
  nombre: string;
  descripcion: string;
};

export type CategoriaProducto = {
  slug: string;
  nombre: string;
  resumen: string;
  productos: Producto[];
};

// Contenido base tomado del sitio actual (druckchemie.com.mx) el 2026-08-15.
// Pendiente: confirmar/ampliar con dirección y ajustar fichas técnicas por producto.
export const categoriasProductos: CategoriaProducto[] = [
  {
    slug: "aditivos-alcohol",
    nombre: "Aditivos (Alcohol)",
    resumen:
      "Alcoholes isopropílicos y soluciones a base de alcohol para impresión offset y DTF, en distintos grados de pureza y concentración.",
    productos: [
      {
        nombre: "IPA",
        descripcion: "Alcohol isopropílico importado, 99.8% de pureza.",
      },
      {
        nombre: "Alcohol al 99% (DTF)",
        descripcion: "Alcohol nacional para impresión.",
      },
      {
        nombre: "ISO 300 (DTF)",
        descripcion: "Alcohol económico con mezcla de metanol para impresión.",
      },
      {
        nombre: "IPA Plus (DTF)",
        descripcion: "Alcohol concentrado, dosificación de 3% a 5%.",
      },
    ],
  },
  {
    slug: "soluciones-fuente",
    nombre: "Soluciones para la Fuente",
    resumen:
      "Soluciones de fuente para máquinas convencionales, híbridas y UV, incluyendo opciones libres de alcohol certificadas para empaque de alimentos.",
    productos: [
      {
        nombre: "Wassertop DH Plus",
        descripcion:
          "Solución para máquinas convencionales, híbridas y UV con baja dosificación.",
      },
      {
        nombre: "Wassertop MX (DFT)",
        descripcion: "Solución formulada para agua dura.",
      },
      {
        nombre: "Alkoless SF 2.6",
        descripcion:
          "Solución libre de alcohol, certificada para empaque de alimentos ISEGA.",
      },
      {
        nombre: "Alkoless SF 4.75",
        descripcion: "Solución libre de alcohol que elimina sales de baterías.",
      },
      {
        nombre: "Wassertop HS 2.44",
        descripcion: "Solución para prensas con horno.",
      },
    ],
  },
  {
    slug: "lavadores-convencionales",
    nombre: "Lavadores Convencionales",
    resumen:
      "Lavadores de mantequilla y caucho para limpieza manual y automática de prensas convencionales.",
    productos: [
      {
        nombre: "K60 (DFT)",
        descripcion: "Lavado manual o automático, mezclable con agua.",
      },
      {
        nombre: "Uniwash 3G",
        descripcion: "Lavado rápido, libre de olores.",
      },
      {
        nombre: "Eurostar 65",
        descripcion: "Certificado FOGRA e ISEGA.",
      },
    ],
  },
  {
    slug: "aditivos-placas",
    nombre: "Aditivos para Placas",
    resumen:
      "Limpiadores, gomas protectoras y productos de mantenimiento para placas de impresión, incluyendo placas híbrido UV.",
    productos: [
      {
        nombre: "DC Plate Cleaner — Rosa",
        descripcion: "Limpia placas para tinta convencional.",
      },
      {
        nombre: "Neutral Gummierung",
        descripcion: "Goma protectora para placas.",
      },
      {
        nombre: "Platterreiniger EU",
        descripcion: "Para placas híbrido UV.",
      },
      {
        nombre: "Start Aktiv (DFT)",
        descripcion: "Limpia y pule rayones.",
      },
    ],
  },
  {
    slug: "lavadores-uv",
    nombre: "Lavadores UV",
    resumen:
      "Lavadores certificados FOGRA formulados específicamente para procesos de impresión UV.",
    productos: [
      {
        nombre: "Eurostar UV Mix",
        descripcion: "Certificado FOGRA.",
      },
      {
        nombre: "Balkleen UV",
        descripcion: "Lavador certificado FOGRA para prensas KBA.",
      },
      {
        nombre: "Eurostar NV 5.0",
        descripcion: "Para máquinas con horno.",
      },
    ],
  },
  {
    slug: "siliconas",
    nombre: "Siliconas",
    resumen:
      "Siliconas de distintas concentraciones para prensas con horno y uso comercial general.",
    productos: [
      {
        nombre: "Silicona SURF 373",
        descripcion: "Alta calidad para prensas con horno.",
      },
      {
        nombre: "Silicona SURF Plus",
        descripcion: "Concentración media.",
      },
      {
        nombre: "Silicona Ecomax",
        descripcion: "Silicón comercial de uso general.",
      },
    ],
  },
  {
    slug: "panos-lavado",
    nombre: "Paños de Lavado",
    resumen:
      "Paños de lavado compatibles con los principales fabricantes de prensas del mercado.",
    productos: [
      {
        nombre: "Paños para Heidelberg",
        descripcion: "Compatibles con prensas Heidelberg.",
      },
      {
        nombre: "Paños para KBA",
        descripcion: "Compatibles con prensas KBA.",
      },
      {
        nombre: "Paños para Komori",
        descripcion: "Compatibles con prensas Komori.",
      },
      {
        nombre: "Paños para Mitsubishi",
        descripcion: "Compatibles con prensas Mitsubishi.",
      },
      {
        nombre: "Paños para Goss",
        descripcion: "Compatibles con prensas Goss.",
      },
    ],
  },
];
