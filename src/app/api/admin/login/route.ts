import { passwordCorrecta, iniciarSesion, adminConfigurado } from "@/lib/adminAuth";

function ir(destino: string) {
  return new Response(null, { status: 303, headers: { Location: destino } });
}

export async function POST(req: Request) {
  if (!adminConfigurado()) return ir("/admin/login?error=config");
  const form = await req.formData().catch(() => null);
  const intento = String(form?.get("password") ?? "");
  if (!passwordCorrecta(intento)) {
    // Pequeña pausa para frenar intentos por fuerza bruta.
    await new Promise((r) => setTimeout(r, 1200));
    return ir("/admin/login?error=1");
  }
  await iniciarSesion();
  return ir("/admin");
}
