import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseServiceKey as serviceRoleKey } from "./supabaseEnv";

// SOLO para uso en el servidor (route handlers / server actions).
// Nunca importar este archivo desde un componente de cliente ("use client"):
// la service_role key se salta Row Level Security.

export const supabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

export const supabaseAdmin: SupabaseClient | null = supabaseAdminConfigured
  ? createClient(supabaseUrl as string, serviceRoleKey as string, {
      auth: { persistSession: false },
    })
  : null;
