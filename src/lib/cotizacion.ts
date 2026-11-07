// Constantes y utilidades compartidas entre el cotizador (navegador) y la
// ruta /api/cotizacion (servidor). No importar nada del servidor aquí.

export const UNIDADES = ["Piezas", "Cubetas", "Tambos", "Cajas", "Litros", "Kilos"] as const;

export const TIPOS_IMPRESION = [
  "Offset convencional",
  "Offset híbrido",
  "Offset UV",
  "No estoy seguro",
] as const;

export const MARCAS_PRENSA = ["Heidelberg", "KBA", "Komori", "Mitsubishi", "Goss", "Otra"] as const;

export const MAX_PARTIDAS = 30;
export const MAX_CANTIDAD = 100000;

export function formatoFolio(n: number): string {
  return `DC-${String(n).padStart(5, "0")}`;
}
