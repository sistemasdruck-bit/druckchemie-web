import nodemailer from "nodemailer";

// Notificaciones por correo (contacto y cotizaciones), vía una cuenta de
// Gmail dedicada (remitente técnico — no es el buzón que ve el cliente).
// Requiere una "contraseña de aplicación" de Gmail, no la contraseña normal.
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SALES_EMAIL = process.env.SALES_EMAIL || "ventas@druckchemie.com.mx";

export const mailerConfigured = Boolean(SMTP_USER && SMTP_PASS);

function crearTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // STARTTLS en el puerto 587
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Sin estos límites, si Gmail no responde (credenciales inválidas,
    // red bloqueada, etc.) la conexión se queda esperando varios minutos
    // y el formulario del sitio parece "colgado". Con esto falla rápido.
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
}

/** Quita saltos de línea para que nada se cuele en el asunto del correo. */
const unaLinea = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

type ContactoLead = {
  nombre: string;
  empresa?: string | null;
  email: string;
  telefono?: string | null;
  mensaje: string;
};

export async function sendContactNotification(lead: ContactoLead) {
  if (!mailerConfigured) {
    console.log(
      "[mailer] SMTP no configurado todavía — no se envía correo de notificación."
    );
    return { sent: false, reason: "not_configured" as const };
  }

  const lineas = [
    `Nombre: ${lead.nombre}`,
    lead.empresa ? `Empresa: ${lead.empresa}` : null,
    `Correo: ${lead.email}`,
    lead.telefono ? `Teléfono: ${lead.telefono}` : null,
    "",
    "Mensaje:",
    lead.mensaje,
  ].filter(Boolean);

  await crearTransporter().sendMail({
    from: `"Sitio Druck Chemie" <${SMTP_USER}>`,
    to: SALES_EMAIL,
    replyTo: lead.email,
    subject: unaLinea(`Nueva solicitud de contacto — ${lead.nombre}`),
    text: lineas.join("\n"),
  });

  return { sent: true as const };
}

export type CotizacionCorreo = {
  folio: string | null;
  nombre: string;
  empresa?: string | null;
  email: string;
  telefono?: string | null;
  ciudad_estado?: string | null;
  prensa_marca?: string | null;
  prensa_modelo?: string | null;
  tipo_impresion?: string | null;
  comentarios?: string | null;
  items: { nombre: string; categoria: string; cantidad: number; unidad: string }[];
};

export async function sendQuoteNotification(q: CotizacionCorreo) {
  if (!mailerConfigured) {
    console.log("[mailer] SMTP no configurado todavía — no se envía correo de cotización.");
    return { sent: false, reason: "not_configured" as const };
  }

  const prensa = [q.prensa_marca, q.prensa_modelo].filter(Boolean).join(" ");
  const lineas = [
    q.folio ? `Folio: ${q.folio}` : null,
    "",
    `Nombre: ${q.nombre}`,
    q.empresa ? `Empresa: ${q.empresa}` : null,
    `Correo: ${q.email}`,
    q.telefono ? `Teléfono: ${q.telefono}` : null,
    q.ciudad_estado ? `Ciudad / estado: ${q.ciudad_estado}` : null,
    prensa ? `Prensa: ${prensa}` : null,
    q.tipo_impresion ? `Tipo de impresión: ${q.tipo_impresion}` : null,
    "",
    "Productos solicitados:",
    ...q.items.map((i) => `  • ${i.nombre} (${i.categoria}) — ${i.cantidad} ${i.unidad}`),
    q.comentarios ? `\nComentarios:\n${q.comentarios}` : null,
  ].filter((l) => l !== null);

  await crearTransporter().sendMail({
    from: `"Sitio Druck Chemie" <${SMTP_USER}>`,
    to: SALES_EMAIL,
    replyTo: q.email,
    subject: unaLinea(
      `Solicitud de cotización${q.folio ? ` ${q.folio}` : ""} — ${q.nombre}${q.empresa ? ` (${q.empresa})` : ""}`
    ),
    text: lineas.join("\n"),
  });

  return { sent: true as const };
}
