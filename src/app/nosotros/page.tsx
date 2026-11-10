import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Druck Chemie México",
  description:
    "Druck Chemie, fundada en Alemania en 1971 y presente en más de 50 países; en México desde 2006 con productos químicos de alta calidad para la industria de la impresión.",
};

const valores = [
  {
    nombre: "Innovación",
    texto: "Mejoramos constantemente nuestras fórmulas y procesos para responder a las necesidades cambiantes de la industria gráfica.",
  },
  {
    nombre: "Servicio",
    texto: "Acompañamos a cada cliente antes, durante y después de la venta, entendiendo su operación particular.",
  },
  {
    nombre: "Pasión",
    texto: "Nos apasiona la industria de las artes gráficas y el detalle técnico detrás de cada producto que fabricamos.",
  },
  {
    nombre: "Puntualidad",
    texto: "Cumplimos los tiempos de entrega comprometidos porque sabemos que una prensa detenida cuesta dinero.",
  },
];

type Pilar = { titulo: string; texto: string; icono: React.ReactNode };

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const pilares: Pilar[] = [
  {
    titulo: "Productos de alta calidad",
    texto:
      "Soluciones químicas confiables y desarrolladas para las necesidades de la industria gráfica.",
    icono: (
      <svg {...iconProps}>
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m8.8 12 2.2 2.2 4.2-4.4" />
      </svg>
    ),
  },
  {
    titulo: "Mayor eficiencia",
    texto:
      "Asesoramos en la selección y uso adecuado de los productos para maximizar su rendimiento y optimizar costos.",
    icono: (
      <svg {...iconProps}>
        <circle cx="12" cy="13.5" r="7.5" />
        <path d="M10 2.5h4M12 2.5V6M12 13.5l3-3M18.5 6.5l1.5-1.5" />
      </svg>
    ),
  },
  {
    titulo: "Cuidado integral",
    texto:
      "Promovemos prácticas que protegen al personal, los equipos y el medio ambiente.",
    icono: (
      <svg {...iconProps}>
        <path d="M12 11.5s-3.5-2.1-3.5-4.4A1.9 1.9 0 0 1 12 6a1.9 1.9 0 0 1 3.5 1.1c0 2.3-3.5 4.4-3.5 4.4Z" />
        <path d="M3 14.5l3.2 3.6c.6.6 1.4 1 2.3 1H13" />
        <path d="M21 14.5l-3.2 3.6c-.6.6-1.4 1-2.3 1H13" />
        <path d="M3 14.5V10M21 14.5V10" />
      </svg>
    ),
  },
  {
    titulo: "Asesoría técnica",
    texto:
      "Compartimos nuestro conocimiento para ayudar a nuestros clientes a obtener mejores resultados en sus procesos de impresión.",
    icono: (
      <svg {...iconProps}>
        <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
        <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.1 2.1 0 0 0-3 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3 3 0 0 1 3.6-.5l.5.3a2.8 2.8 0 0 0 2 .3L21 6" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2" />
        <path d="M3 4h8" />
      </svg>
    ),
  },
  {
    titulo: "Procesos sustentables",
    texto:
      "Impulsamos mejores prácticas de limpieza, reducción de desperdicios y manejo responsable de residuos.",
    icono: (
      <svg {...iconProps}>
        <path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L7.2 9.5" />
        <path d="M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7l-1.2-2.1" />
        <path d="m14 16-3 3 3 3" />
        <path d="M8.3 13.6 7.2 9.5 3.1 10.6" />
        <path d="m9.3 5.6 1.1-1.9a1.8 1.8 0 0 1 3.1 0l3.9 6.7" />
        <path d="m13.4 9.8 4.1 1.1 1.1-4.1" />
      </svg>
    ),
  },
];

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
        Nosotros
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        ¿Quiénes somos?
      </h1>
      <p className="mt-4 text-xl font-semibold text-brand-blue sm:text-2xl">
        Experiencia y calidad al servicio de la industria de las artes
        gráficas
      </p>

      {/* Druck Chemie global + datos clave */}
      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <p className="border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
          <strong className="text-brand-navy">Druck Chemie</strong>, fundada
          en Alemania en 1971, desarrolla y comercializa productos químicos de
          alta calidad para la industria de la impresión, con presencia en{" "}
          <strong className="text-brand-navy">más de 50 países</strong>.
        </p>
        <dl className="grid grid-cols-3 gap-[1px] overflow-hidden rounded-2xl border border-brand-line bg-brand-line text-center">
          {[
            { dato: "1971", etiqueta: "Fundada en Alemania" },
            { dato: "50+", etiqueta: "Países" },
            { dato: "2006", etiqueta: "Llegada a México" },
          ].map((d) => (
            <div key={d.etiqueta} className="bg-white px-3 py-5">
              <dt className="sr-only">{d.etiqueta}</dt>
              <dd className="text-2xl font-extrabold text-brand-accent-dark sm:text-3xl">
                {d.dato}
              </dd>
              <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-steel">
                {d.etiqueta}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Druck Chemie México */}
      <div className="mt-14 grid items-center gap-8 overflow-hidden rounded-2xl border border-brand-line bg-brand-mist p-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:p-12">
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(141,198,63,0.18),transparent_65%)]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/20-anos.png"
            alt="20 años de Druck Chemie México"
            width={1200}
            height={627}
            className="relative w-full"
          />
        </div>
        <div className="border-l-4 border-brand-accent pl-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent-dark">
            Druck Chemie México
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-brand-navy">
            20 años construyendo confianza
          </h2>
          <p className="mt-3 text-brand-blue">
            Fundada a finales de <strong className="text-brand-navy">2006 en la Ciudad de México</strong>,
            Druck Chemie México nació con el compromiso de ofrecer al mercado
            nacional la calidad, experiencia y tecnología de Druck Chemie.
          </p>
          <p className="mt-3 text-brand-blue">
            Hoy trabajamos de manera cercana con nuestros clientes para{" "}
            <strong className="text-brand-navy">
              mejorar sus procesos, optimizar el consumo de productos y
              aumentar la eficiencia de sus operaciones
            </strong>
            .
          </p>
        </div>
      </div>

      {/* Lo que nos distingue */}
      <div className="mt-16">
        <h2 className="text-2xl font-extrabold text-brand-navy">
          Lo que nos distingue
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {pilares.map((p, i) => (
            <div
              key={p.titulo}
              className={`group relative rounded-2xl border border-brand-line bg-white p-6 transition hover:-translate-y-1 hover:border-brand-accent hover:shadow-lg lg:col-span-2 ${
                i === 3 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-brand-accent ring-4 ring-brand-accent/20 transition group-hover:bg-brand-accent group-hover:text-white">
                {p.icono}
              </div>
              <h3 className="mt-5 font-bold text-brand-navy">{p.titulo}</h3>
              <p className="mt-2 text-sm text-brand-blue/90">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-mist p-8">
          <h2 className="text-xl font-bold text-brand-navy">Misión</h2>
          <p className="mt-3 text-brand-blue">
            Forjar relaciones sólidas y duraderas con nuestros clientes;
            queremos distinguirnos por la calidad y dejar huella como una
            compañía confiable.
          </p>
        </div>
        <div className="rounded-2xl bg-brand-mist p-8">
          <h2 className="text-xl font-bold text-brand-navy">Visión</h2>
          <p className="mt-3 text-brand-blue">
            Establecer un modelo de trabajo que nos permita llevar eficiencia
            y calidad hasta nuestros clientes, consolidándolo en los próximos
            años.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-extrabold text-brand-navy">
          Nuestros valores
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-[1px] bg-brand-line sm:grid-cols-2">
          {valores.map((valor) => (
            <div key={valor.nombre} className="bg-white p-6">
              <h3 className="font-bold text-brand-accent-dark">
                {valor.nombre}
              </h3>
              <p className="mt-2 text-sm text-brand-blue/90">{valor.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
