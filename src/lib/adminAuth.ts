// Sesión del panel /admin.
// Una contraseña compartida (variable ADMIN_PASSWORD en Railway y .env.local)
// y una cookie firmada (HMAC) que dura 12 horas. Cambiar la contraseña en
// Railway cierra automáticamente todas las sesiones abiertas.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "dc_admin";
const DURACION_S = 60 * 60 * 12;

function password(): string | undefined {
  const p = process.env.ADMIN_PASSWORD?.trim().replace(/^['"]|['"]$/g, "");
  return p && p.length >= 8 ? p : undefined;
}

export function adminConfigurado(): boolean {
  return Boolean(password());
}

function firmar(valor: string): string {
  const llave = `${password()}|${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`;
  return createHmac("sha256", llave).update(valor).digest("hex");
}

function iguales(a: string, b: string): boolean {
  const ha = createHmac("sha256", "cmp").update(a).digest();
  const hb = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordCorrecta(intento: string): boolean {
  const p = password();
  return Boolean(p) && iguales(intento, p as string);
}

export async function iniciarSesion() {
  const ts = String(Date.now());
  (await cookies()).set(COOKIE, `${ts}.${firmar(ts)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACION_S,
  });
}

export async function cerrarSesion() {
  (await cookies()).delete(COOKIE);
}

export async function esAdmin(): Promise<boolean> {
  if (!password()) return false;
  const valor = (await cookies()).get(COOKIE)?.value;
  if (!valor) return false;
  const [ts, firma] = valor.split(".");
  if (!ts || !firma) return false;
  const edad = Date.now() - Number(ts);
  if (!Number.isFinite(edad) || edad < 0 || edad > DURACION_S * 1000) return false;
  return iguales(firma, firmar(ts));
}

/** Para páginas y acciones del panel: si no hay sesión, manda al login. */
export async function requireAdmin() {
  if (!(await esAdmin())) redirect("/admin/login");
}
