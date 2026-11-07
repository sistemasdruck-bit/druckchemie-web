import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { sendQuoteNotification, mailerConfigured } from "@/lib/mailer";
import { getCatalogo } from "@/lib/catalogo";
import {
  UNIDADES,
  TIPOS_IMPRESION,
  MAX_PARTIDAS,
  MAX_CANTIDAD,
  formatoFolio,
} from "@/lib/cotizacion";

// Freno simple contra abuso: máximo 5 solicitudes por IP cada 10 minutos.
// (En memoria: suficiente para una sola instancia en Railway.)
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const intentos = new Map<string, number[]>();

function limitado(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_POR_VENTANA) {
    intentos.set(ip, recientes);
    return true;
  }
  recientes.push(ahora);
  intentos.set(ip, recientes);
  if (intentos.size > 5000) intentos.clear();
  return false;
}

const texto = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t.length ? t : null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const error = (mensaje: string, status = 400) =>
  NextResponse.json({ ok: false, error: mensaje }, { status });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return error("Datos de formulario incompletos.");

  // Campo trampa para bots: las personas no lo ven ni lo llenan.
  if (texto(body.web, 50)) return NextResponse.json({ ok: true, folio: null });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  if (limitado(ip)) return error("Demasiadas solicitudes. Intenta de nuevo en unos minutos.", 429);

  const nombre = texto(body.nombre, 120);
  const email = texto(body.email, 160);
  if (!nombre) return error("Escribe tu nombre.");
  if (!email || !EMAIL_RE.test(email)) return error("Escribe un correo válido.");

  // Los nombres de producto se toman del catálogo del servidor, no del navegador.
  const catalogo = await getCatalogo();
  const porSlug = new Map<string, { nombre: string; categoria: string }>();
  for (const c of catalogo)
    for (const p of c.productos) porSlug.set(p.slug, { nombre: p.nombre, categoria: c.nombre });

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > MAX_PARTIDAS)
    return error("Agrega al menos un producto a tu solicitud.");

  const vistos = new Set<string>();
  const items: { slug: string; nombre: string; categoria: string; cantidad: number; unidad: string }[] = [];
  for (const raw of body.items) {
    const slug = texto(raw?.slug, 120);
    const prod = slug ? porSlug.get(slug) : undefined;
    const cantidad = Number(raw?.cantidad);
    const unidad = UNIDADES.find((u) => u === raw?.unidad);
    if (!slug || !prod) return error("Uno de los productos ya no está disponible. Recarga la página.");
    if (!Number.isFinite(cantidad) || cantidad <= 0 || cantidad > MAX_CANTIDAD)
      return error(`Revisa la cantidad de "${prod.nombre}".`);
    if (!unidad) return error(`Revisa la unidad de "${prod.nombre}".`);
    if (vistos.has(slug)) continue;
    vistos.add(slug);
    items.push({
      slug,
      nombre: prod.nombre,
      categoria: prod.categoria,
      cantidad: Math.round(cantidad * 100) / 100,
      unidad,
    });
  }

  const tipo = TIPOS_IMPRESION.find((t) => t === body.tipo_impresion) ?? null;
  const solicitud = {
    nombre,
    empresa: texto(body.empresa, 160),
    email,
    telefono: texto(body.telefono, 40),
    ciudad_estado: texto(body.ciudad_estado, 120),
    prensa_marca: texto(body.prensa_marca, 80),
    prensa_modelo: texto(body.prensa_modelo, 120),
    tipo_impresion: tipo,
    comentarios: texto(body.comentarios, 2000),
  };

  // 1) Guardar en Supabase (cotización + partidas).
  let folio: string | null = null;
  let stored = false;
  if (supabaseAdminConfigured && supabaseAdmin) {
    const { data, error: errCot } = await supabaseAdmin
      .from("cotizaciones")
      .insert(solicitud)
      .select("id, folio")
      .single();
    if (errCot || !data) {
      console.error("[cotizacion] Error al guardar la cotización:", errCot);
    } else {
      const { error: errItems } = await supabaseAdmin.from("cotizacion_items").insert(
        items.map((i) => ({
          cotizacion_id: data.id,
          producto_slug: i.slug,
          producto_nombre: i.nombre,
          categoria_nombre: i.categoria,
          cantidad: i.cantidad,
          unidad: i.unidad,
        }))
      );
      if (errItems) {
        console.error("[cotizacion] Error al guardar las partidas:", errItems);
        // No dejar una cotización sin productos.
        await supabaseAdmin.from("cotizaciones").delete().eq("id", data.id);
      } else {
        stored = true;
        folio = formatoFolio(Number(data.folio));
      }
    }
  }

  // 2) Avisar a ventas por correo (independiente de Supabase), con límite de tiempo.
  let mailed = false;
  if (mailerConfigured) {
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout_envio_correo")), 10000)
      );
      const result = await Promise.race([
        sendQuoteNotification({
          ...solicitud,
          folio,
          items: items.map((i) => ({
            nombre: i.nombre,
            categoria: i.categoria,
            cantidad: i.cantidad,
            unidad: i.unidad,
          })),
        }),
        timeout,
      ]);
      mailed = result.sent;
    } catch (err) {
      console.error("[cotizacion] Error al enviar correo:", err);
    }
  }

  if (!stored && !mailed) {
    console.error("[cotizacion] Solicitud NO registrada:", { ...solicitud, items });
    return error(
      "No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo o llámanos.",
      503
    );
  }

  return NextResponse.json({ ok: true, folio, stored, mailed });
}
