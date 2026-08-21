import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { sendContactNotification, mailerConfigured } from "@/lib/mailer";

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
  const lead = { nombre, empresa, email, telefono, mensaje };

  // Guardado en Supabase si ya está conectado; si no, lo dejamos en los logs
  // del servidor para no perder el mensaje mientras se termina de configurar.
  let stored: "supabase" | "log" = "log";
  if (supabaseAdminConfigured && supabaseAdmin) {
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
    } else {
      stored = "supabase";
    }
  }
  if (stored === "log") {
    console.log("[contacto] Nuevo lead:", lead);
  }

  // Notificación por correo a ventas, independiente de si Supabase ya está
  // conectado — así el equipo se entera de inmediato aunque falte esa pieza.
  // Se protege con un límite de tiempo propio: si el SMTP no responde por
  // cualquier motivo, el formulario del sitio no debe quedarse "colgado"
  // esperando para siempre.
  let mailed = false;
  if (mailerConfigured) {
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout_envio_correo")), 10000)
      );
      const result = await Promise.race([sendContactNotification(lead), timeout]);
      mailed = result.sent;
    } catch (err) {
      console.error("[contacto] Error al enviar correo de notificación:", err);
    }
  }

  return NextResponse.json({ ok: true, stored, mailed });
}
