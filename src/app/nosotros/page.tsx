import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Druck Chemie México",
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

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
        Nosotros
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
        Una compañía confiable para la industria de artes gráficas
      </h1>
      <p className="mt-6 max-w-3xl border-l-4 border-brand-accent pl-6 text-lg text-brand-blue">
        Druck Chemie desarrolla, fabrica y distribuye productos químicos,
        técnicos y auxiliares para la industria de las artes gráficas,
        trabajando de la mano con imprentas y talleres en todo México.
      </p>

      {/* 20 años */}
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
          <h2 className="text-2xl font-extrabold text-brand-navy">
            20 años construyendo confianza
          </h2>
          <p className="mt-3 text-brand-blue">
            Dos décadas acompañando a imprentas y talleres de todo México con
            productos de calidad, servicio cercano y entregas puntuales. Cada
            año nos reafirma en lo que nos distingue: relaciones sólidas y
            duraderas con nuestros clientes.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
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
