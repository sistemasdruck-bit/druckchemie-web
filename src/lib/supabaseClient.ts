import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "./supabaseEnv";

// Cliente de navegador (usa la anon key — segura para exponer al público,
// el acceso real se controla con Row Level Security en Supabase).

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Si aún no hay llaves configuradas (fase inicial del proyecto), exportamos
// `null` en vez de lanzar un error, para que el sitio siga compilando y
// renderizando mientras se conecta Supabase.
export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
