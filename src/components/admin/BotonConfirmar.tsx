"use client";

/** Botón de envío que pide confirmación (para borrar). */
export default function BotonConfirmar({
  mensaje,
  children,
  className,
}: {
  mensaje: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(mensaje)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
