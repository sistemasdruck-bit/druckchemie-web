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
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        Nosotros
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy">
        Una compañía confiable para la industria de artes gráficas
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-brand-blue/80">
        Druck Chemie desarrolla, fabrica y distribuye productos químicos,
        técnicos y auxiliares para la industria de las artes gráficas,
        trabajando de la mano con imprentas y talleres en todo México.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-line bg-white p-8">
          <h2 className="text-xl font-bold text-brand-navy">Misión</h2>
          <p className="mt-3 text-brand-blue/80">
            Forjar relaciones sólidas y duraderas con nuestros clientes;
            queremos distinguirnos por la calidad y dejar huella como una
            compañía confiable.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-line bg-white p-8">
          <h2 className="text-xl font-bold text-brand-navy">Visión</h2>
          <p className="mt-3 text-brand-blue/80">
            Establecer un modelo de trabajo que nos permita llevar eficiencia
            y calidad hasta nuestros clientes, consolidándolo en los próximos
            años.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-brand-navy">
          Nuestros valores
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {valores.map((valor) => (
            <div
              key={valor.nombre}
              className="rounded-xl border border-brand-line p-6"
            >
              <h3 className="font-semibold text-brand-accent">
                {valor.nombre}
              </h3>
              <p className="mt-2 text-sm text-brand-blue/70">{valor.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-brand-navy px-8 py-10 text-white">
        <h2 className="text-xl font-bold">
          Nota para dirección
        </h2>
        <p className="mt-2 text-sm text-brand-cream/80">
          Este texto parte de la misión, visión y valores publicados hoy en
          druckchemie.com.mx. Si tienen historia de la empresa, años de
          operación, certificaciones o datos adicionales que quieran resaltar
          aquí, los integro en la siguiente revisión.
        </p>
      </div>
    </div>
  );
}
