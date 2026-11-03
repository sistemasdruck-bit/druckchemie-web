// Lee y valida las variables de Supabase.
// Si una variable está vacía o mal escrita (comillas, espacios, sin https://,
// con /rest/v1/ al final, etc.) la normalizamos o la ignoramos, para que un
// error de configuración NUNCA tumbe el build ni la página: el sitio sigue
// funcionando con el catálogo local y solo se registra una advertencia.

function limpiar(valor: string | undefined): string | undefined {
  if (!valor) return undefined;
  const v = valor.trim().replace(/^['"]|['"]$/g, "").trim();
  return v.length ? v : undefined;
}

function normalizarUrl(valor: string | undefined): string | undefined {
  const v = limpiar(valor);
  if (!v) return undefined;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error();
    return u.origin; // quita /rest/v1/ u otras rutas sobrantes
  } catch {
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL no es una URL válida; se ignora. Debe verse como https://xxxx.supabase.co"
    );
    return undefined;
  }
}

export const supabaseUrl = normalizarUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
export const supabaseAnonKey = limpiar(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabaseServiceKey = limpiar(process.env.SUPABASE_SERVICE_ROLE_KEY);
