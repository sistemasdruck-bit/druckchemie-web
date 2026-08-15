import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// SOLO para uso en el servidor (route handlers / server actions).
// Nunca importar este archivo desde un componente de cliente ("use client"):
// la service_role key se salta Row Level Security.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey);

export const supabaseAdmin: SupabaseClient | null = supabaseAdminConfigured
  ? createClient(supabaseUrl as string, serviceRoleKey as string, {
      auth: { persistSession: false },
    })
  : null;
