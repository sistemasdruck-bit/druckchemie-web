"use client";

import { useState, type FormEvent } from "react";

type Estado = "idle" | "enviando" | "enviado" | "error";

export default function ContactForm() {
  const [estado, setEstado] = useState<Estado>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nombre: String(data.get("nombre") ?? ""),
      empresa: String(data.get("empresa") ?? ""),
      email: String(data.get("email") ?? ""),
      telefono: String(data.get("telefono") ?? ""),
      mensaje: String(data.get("mensaje") ?? ""),
    };

    // Límite de tiempo del lado del navegador: si por cualquier razón el
    // servidor no responde, el botón no debe quedarse en "Enviando..." para
    // siempre — a los 15s se muestra el mensaje de error.
    const controller = new AbortController();
    const avisoTimeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("request failed");
      setEstado("enviado");
      form.reset();
    } catch {
      setEstado("error");
    } finally {
      clearTimeout(avisoTimeout);
    }
  }

  if (estado === "enviado") {
    return (
      <div className="rounded-xl border border-brand-teal/30 bg-brand-teal/10 p-6 text-brand-teal">
        <p className="font-semibold">¡Gracias por escribirnos!</p>
        <p className="mt-1 text-sm">
          Recibimos tu mensaje y te contactaremos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-brand-navy" htmlFor="nombre">
            Nombre *
          </label>
          <input
            id="nombre"
            name="nombre"
            required
            className="mt-1.5 w-full rounded-md border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-navy" htmlFor="empresa">
            Empresa
          </label>
          <input
            id="empresa"
            name="empresa"
            className="mt-1.5 w-full rounded-md border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-navy" htmlFor="email">
            Correo *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-md border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-navy" htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            className="mt-1.5 w-full rounded-md border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-navy" htmlFor="mensaje">
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-brand-line px-3 py-2 text-sm outline-none focus:border-brand-accent"
        />
      </div>

      {estado === "error" && (
        <p className="text-sm text-red-600">
          Hubo un problema al enviar tu mensaje. Intenta de nuevo o llámanos
          directamente.
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="rounded-md bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent-dark disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
