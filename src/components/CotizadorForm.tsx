"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  UNIDADES,
  TIPOS_IMPRESION,
  MARCAS_PRENSA,
  MAX_PARTIDAS,
  MAX_CANTIDAD,
} from "@/lib/cotizacion";

type Producto = { slug: string; nombre: string; descripcion: string | null };
type Categoria = { slug: string; nombre: string; productos: Producto[] };
type Partida = { nombre: string; cantidad: string; unidad: string };
type Estado = "idle" | "enviando" | "enviado" | "error";

const campo =
  "mt-1.5 w-full rounded-md border border-brand-line bg-white px-3 py-2 text-sm text-brand-navy outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/30";
const etiqueta = "text-sm font-medium text-brand-navy";

function Paso({ n, titulo, children }: { n: number; titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-3 text-xl font-extrabold text-brand-navy">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-navy">
          {n}
        </span>
        {titulo}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function CotizadorForm({
  categorias,
  preseleccion,
}: {
  categorias: Categoria[];
  preseleccion?: string;
}) {
  const todos = useMemo(() => {
    const m = new Map<string, Producto>();
    categorias.forEach((c) => c.productos.forEach((p) => m.set(p.slug, p)));
    return m;
  }, [categorias]);

  const [partidas, setPartidas] = useState<Record<string, Partida>>(() => {
    const p = preseleccion ? todos.get(preseleccion) : undefined;
    return p ? { [p.slug]: { nombre: p.nombre, cantidad: "1", unidad: "Piezas" } } : {};
  });
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensajeError, setMensajeError] = useState("");
  const [folio, setFolio] = useState<string | null>(null);

  const seleccionados = Object.entries(partidas);

  function alternar(p: Producto) {
    setPartidas((prev) => {
      if (prev[p.slug]) {
        const { [p.slug]: _quitado, ...resto } = prev;
        void _quitado;
        return resto;
      }
      if (Object.keys(prev).length >= MAX_PARTIDAS) return prev;
      return { ...prev, [p.slug]: { nombre: p.nombre, cantidad: "1", unidad: "Piezas" } };
    });
  }

  function cambiar(slug: string, cambios: Partial<Partida>) {
    setPartidas((prev) => ({ ...prev, [slug]: { ...prev[slug], ...cambios } }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensajeError("");

    if (!seleccionados.length) {
      setEstado("error");
      setMensajeError("Elige al menos un producto en el paso 1.");
      return;
    }
    for (const [, p] of seleccionados) {
      const n = Number(p.cantidad);
      if (!Number.isFinite(n) || n <= 0 || n > MAX_CANTIDAD) {
        setEstado("error");
        setMensajeError(`Revisa la cantidad de "${p.nombre}".`);
        return;
      }
    }

    setEstado("enviando");
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "");
    const payload = {
      nombre: v("nombre"),
      empresa: v("empresa"),
      email: v("email"),
      telefono: v("telefono"),
      ciudad_estado: v("ciudad_estado"),
      prensa_marca: v("prensa_marca"),
      prensa_modelo: v("prensa_modelo"),
      tipo_impresion: v("tipo_impresion"),
      comentarios: v("comentarios"),
      web: v("web"), // campo trampa
      items: seleccionados.map(([slug, p]) => ({
        slug,
        cantidad: Number(p.cantidad),
        unidad: p.unidad,
      })),
    };

    const controller = new AbortController();
    const aviso = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setMensajeError(data?.error || "Hubo un problema al enviar tu solicitud. Intenta de nuevo.");
        setEstado("error");
        return;
      }
      setFolio(data.folio ?? null);
      setEstado("enviado");
    } catch {
      setMensajeError("No recibimos respuesta del servidor. Revisa tu conexión e intenta de nuevo.");
      setEstado("error");
    } finally {
      clearTimeout(aviso);
    }
  }

  if (estado === "enviado") {
    return (
      <div className="rounded-2xl border border-brand-accent/40 bg-brand-accent/10 p-8 text-brand-navy">
        <p className="text-2xl font-extrabold">¡Recibimos tu solicitud!</p>
        {folio && (
          <p className="mt-3 text-lg">
            Tu folio es <span className="rounded bg-white px-2 py-0.5 font-bold">{folio}</span>
          </p>
        )}
        <p className="mt-3 max-w-xl text-brand-blue">
          Un asesor de Druck Chemie revisará tu equipo y los productos que elegiste, y te enviará la
          cotización formal al correo o teléfono que nos diste.
        </p>
        <button
          type="button"
          onClick={() => {
            setPartidas({});
            setFolio(null);
            setEstado("idle");
          }}
          className="mt-6 rounded-full border border-brand-navy/30 px-5 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
        >
          Hacer otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="space-y-12">
        {/* Paso 1: productos */}
        <Paso n={1} titulo="Elige los productos">
          <div className="space-y-8">
            {categorias.map((cat) => (
              <div key={cat.slug}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-accent-dark">
                  {cat.nombre}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cat.productos.map((p) => {
                    const activo = Boolean(partidas[p.slug]);
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => alternar(p)}
                        aria-pressed={activo}
                        className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${
                          activo
                            ? "border-brand-accent bg-brand-accent/10"
                            : "border-brand-line bg-white hover:border-brand-accent/60"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                            activo
                              ? "border-brand-accent bg-brand-accent text-brand-navy"
                              : "border-brand-steel/50 bg-white"
                          }`}
                        >
                          {activo && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-brand-navy">{p.nombre}</span>
                          {p.descripcion && (
                            <span className="mt-0.5 block text-xs text-brand-blue/70">{p.descripcion}</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Paso>

        {/* Paso 2: equipo */}
        <Paso n={2} titulo="Cuéntanos de tu equipo">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={etiqueta} htmlFor="prensa_marca">Marca de prensa</label>
              <input id="prensa_marca" name="prensa_marca" list="marcas" className={campo} maxLength={80} />
              <datalist id="marcas">
                {MARCAS_PRENSA.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>
            <div>
              <label className={etiqueta} htmlFor="prensa_modelo">Modelo</label>
              <input id="prensa_modelo" name="prensa_modelo" className={campo} maxLength={120} placeholder="Ej. Speedmaster SM 74" />
            </div>
            <div>
              <label className={etiqueta} htmlFor="tipo_impresion">Tipo de impresión</label>
              <select id="tipo_impresion" name="tipo_impresion" defaultValue="" className={campo}>
                <option value="">Selecciona…</option>
                {TIPOS_IMPRESION.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={etiqueta} htmlFor="ciudad_estado">Ciudad y estado</label>
              <input id="ciudad_estado" name="ciudad_estado" className={campo} maxLength={120} placeholder="Ej. Guadalajara, Jalisco" />
            </div>
          </div>
        </Paso>

        {/* Paso 3: contacto */}
        <Paso n={3} titulo="¿A quién enviamos la cotización?">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={etiqueta} htmlFor="nombre">Nombre *</label>
              <input id="nombre" name="nombre" required maxLength={120} className={campo} autoComplete="name" />
            </div>
            <div>
              <label className={etiqueta} htmlFor="empresa">Empresa</label>
              <input id="empresa" name="empresa" maxLength={160} className={campo} autoComplete="organization" />
            </div>
            <div>
              <label className={etiqueta} htmlFor="email">Correo *</label>
              <input id="email" name="email" type="email" required maxLength={160} className={campo} autoComplete="email" />
            </div>
            <div>
              <label className={etiqueta} htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" maxLength={40} className={campo} autoComplete="tel" />
            </div>
          </div>
          <div className="mt-5">
            <label className={etiqueta} htmlFor="comentarios">Comentarios</label>
            <textarea id="comentarios" name="comentarios" rows={4} maxLength={2000} className={campo} placeholder="Volumen mensual aproximado, urgencia, dudas…" />
          </div>
          {/* Campo trampa para bots: invisible para personas */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              No llenar
              <input name="web" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        </Paso>
      </div>

      {/* Resumen */}
      <aside className="rounded-2xl border border-brand-line bg-brand-mist p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-extrabold text-brand-navy">Tu solicitud</h2>
        {seleccionados.length === 0 ? (
          <p className="mt-3 text-sm text-brand-blue/80">
            Aún no has elegido productos. Selecciónalos en el paso 1 y aquí podrás indicar la cantidad.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {seleccionados.map(([slug, p]) => (
              <li key={slug} className="rounded-lg border border-brand-line bg-white p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-brand-navy">{p.nombre}</p>
                  <button
                    type="button"
                    onClick={() => alternar(todos.get(slug)!)}
                    aria-label={`Quitar ${p.nombre}`}
                    className="text-brand-steel transition hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0.01"
                    step="any"
                    value={p.cantidad}
                    onChange={(e) => cambiar(slug, { cantidad: e.target.value })}
                    aria-label={`Cantidad de ${p.nombre}`}
                    className="w-24 rounded-md border border-brand-line px-2 py-1.5 text-sm outline-none focus:border-brand-accent"
                  />
                  <select
                    value={p.unidad}
                    onChange={(e) => cambiar(slug, { unidad: e.target.value })}
                    aria-label={`Unidad de ${p.nombre}`}
                    className="flex-1 rounded-md border border-brand-line bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-accent"
                  >
                    {UNIDADES.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}

        {estado === "error" && mensajeError && (
          <p role="alert" className="mt-4 text-sm text-red-600">{mensajeError}</p>
        )}

        <button
          type="submit"
          disabled={estado === "enviando"}
          className="mt-5 w-full rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : "Solicitar cotización"}
        </button>
        <p className="mt-3 text-xs text-brand-blue/60">
          Sin costo ni compromiso. Un asesor te responde con precios y tiempos de entrega.
        </p>
      </aside>
    </form>
  );
}
