"use client";

import { useFormStatus } from "react-dom";

/** Botón principal que se deshabilita y muestra "Guardando…" mientras sube. */
export default function BotonGuardar({
  children = "Guardar cambios",
  pendiente = "Guardando…",
}: {
  children?: React.ReactNode;
  pendiente?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-brand-accent px-6 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-accent-dark hover:text-white disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? pendiente : children}
    </button>
  );
}
