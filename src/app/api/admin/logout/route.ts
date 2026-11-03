import { cerrarSesion } from "@/lib/adminAuth";

export async function POST() {
  await cerrarSesion();
  return new Response(null, { status: 303, headers: { Location: "/admin/login" } });
}
