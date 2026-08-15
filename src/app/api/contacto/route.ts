import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (
    !body ||
    typeof body.nombre !== "string" ||
    typeof body.email !== "string" ||
    typeof body.mensaje !== "string"
  ) {
    return NextResponse.json(
      { ok: false, error: "Datos de formulario incompletos." },
      { status: 400 }
    );
  }

  const { nombre, empresa, email, telefono, mensaje } = body;

  // Mientras Supabase no esté conectado (fase inicial del proyecto),
  // registramos el lead en los logs del servidor para no perder mensajes.
  if (!supabaseAdminConfigured || !supabaseAdmin) {
    console.log("[contacto] Nuevo lead (Supabase aún no conectado):", {
      nombre,
      empresa,
      email,
      telefono,
      mensaje,
    });
    return NextResponse.json({ ok: true, stored: "log" });
  }

  const { error } = await supabaseAdmin.from("leads").insert({
    nombre,
    empresa: empresa ?? null,
    email,
    telefono: telefono ?? null,
    mensaje,
    origen: "formulario_contacto",
  });

  if (error) {
    console.error("[contacto] Error al guardar lead en Supabase:", error);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar el mensaje." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, stored: "supabase" });
}
