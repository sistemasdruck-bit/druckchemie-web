import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de navegador (usa la anon key — segura para exponer al público,
// el acceso real se controla con Row Level Security en Supabase).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Si aún no hay llaves configuradas (fase inicial del proyecto), exportamos
// `null` en vez de lanzar un error, para que el sitio siga compilando y
// renderizando mientras se conecta Supabase.
export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
