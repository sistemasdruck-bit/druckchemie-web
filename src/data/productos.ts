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

// Respaldo local del catálogo (el sitio lee primero de Supabase).
// Contenido según el flyer 2026; debe coincidir con supabase/003_catalogo_flyer.sql.
// Rodillos se manejan aparte en src/data/rodillos.ts.
export const categoriasProductos: CategoriaProducto[] = [
  {
    slug: "soluciones-fuente",
    nombre: "Solución de Fuente",
    resumen:
      "Para máquinas de hoja y rotativas: soluciones de fuente para impresión convencional, híbrida y UV.",
    productos: [
      {
        nombre: "Wassertop DH Plus",
        descripcion:
          "Solución para máquinas convencionales, híbridas y UV. Baja dosificación (2-4%), buffer muy estable; para placas CTP.",
      },
      {
        nombre: "Wassertop SF 3.0",
        descripcion:
          "Diseñada para México y la industria de empaque, con certificados ISEGA y FOGRA.",
      },
      {
        nombre: "Alkoless",
        descripcion:
          "Solución para disminución de alcohol.",
      },
    ],
  },
  {
    slug: "aditivos",
    nombre: "Aditivos",
    resumen:
      "Alcoholes, sustitutos de alcohol y endurecedores para el agua de fuente.",
    productos: [
      {
        nombre: "Alcohol Isopropílico",
        descripcion:
          "Alcohol con 99.8% de pureza garantizada. Calidad de importación.",
      },
      {
        nombre: "ISO 300",
        descripcion:
          "Alcohol económico, apropiado para impresión.",
      },
      {
        nombre: "Alkogreen",
        descripcion:
          "Sustituto de alcohol ecológico, con ahorro de hasta 50%.",
      },
      {
        nombre: "Calcilot",
        descripcion:
          "Endurecedor para agua de ósmosis.",
      },
      {
        nombre: "Macnilot",
        descripcion:
          "Endurecedor para agua de ósmosis a base de magnesio.",
      },
    ],
  },
  {
    slug: "auxiliares",
    nombre: "Auxiliares",
    resumen:
      "Limpieza, activación y protección de placas, y mantenimiento de sistemas de recirculación.",
    productos: [
      {
        nombre: "DC Plate Cleaner",
        descripcion:
          "Limpia placas estándar. ¡Económico y eficiente!",
      },
      {
        nombre: "Plattenreiniger Special EU",
        descripcion:
          "Limpia placas para tinta convencional y UV.",
      },
      {
        nombre: "Start Aktiv",
        descripcion:
          "Activador de placas y cubre rayones.",
      },
      {
        nombre: "DC Gum",
        descripcion:
          "Limpia placas con goma integrada (2 productos en 1).",
      },
      {
        nombre: "Alkakleen",
        descripcion:
          "Lavador para sistemas de recirculación, incluyendo mangueras.",
      },
    ],
  },
  {
    slug: "lavadores-convencionales",
    nombre: "Lavadores para Tinta Convencional",
    resumen:
      "Lavadores manuales y automáticos para rodillos y mantillas en impresión con tinta convencional.",
    productos: [
      {
        nombre: "K60",
        descripcion:
          "Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, seca rápido.",
      },
      {
        nombre: "Uniwash 3G",
        descripcion:
          "Lavador manual y/o con sistema automático para rodillos y mantillas. Libre de olores, seca rápido.",
      },
      {
        nombre: "Eurostar 65",
        descripcion:
          "Lavador manual y/o con sistema automático para rodillos y mantillas. Mezclable con agua, libre de olores, certificado FOGRA.",
      },
      {
        nombre: "Gummi Frisch",
        descripcion:
          "Rejuvenecedor de mantillas. Seca rápido y deja la mantilla humectada.",
      },
      {
        nombre: "Space Acryl",
        descripcion:
          "Lavador para barniz base agua, para torre y mantilla.",
      },
    ],
  },
  {
    slug: "lavadores-uv",
    nombre: "Lavadores para Tintas UV",
    resumen:
      "Lavadores y regeneradores para rodillos y mantillas en impresión con tintas UV.",
    productos: [
      {
        nombre: "UV 19",
        descripcion:
          "Lavador manual y/o automático para tintas UV.",
      },
      {
        nombre: "Gummi UV",
        descripcion:
          "Regenerador de hule para rodillos y mantillas. Seca rápido.",
      },
    ],
  },
  {
    slug: "lavadores-hibridos",
    nombre: "Lavadores para Máquinas Híbridas",
    resumen:
      "Lavadores para prensas que trabajan con tintas UV y convencionales, aprobados por los principales fabricantes.",
    productos: [
      {
        nombre: "Eurostar UV Mix",
        descripcion:
          "Lavador de rodillos y mantillas para máquinas híbridas; solvente para tintas UV y convencionales.",
      },
      {
        nombre: "UV Multi 2.8",
        descripcion:
          "Aprobado por Man Roland y KBA. Certificado FOGRA.",
      },
      {
        nombre: "Multi Clean UV",
        descripcion:
          "Aprobado por Heidelberg y Man Roland. Con certificado FOGRA.",
      },
    ],
  },
];
