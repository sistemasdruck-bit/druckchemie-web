import Link from "next/link";
import type { ReactNode } from "react";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark";
  external?: boolean;
  className?: string;
};

/**
 * Enlace con botón circular de flecha, al estilo de druckchemie.com
 * ("Sobre nosotros ›", "Ver producto ›", "Más información ›").
 */
export default function ArrowLink({
  href,
  children,
  variant = "dark",
  external = false,
  className = "",
}: ArrowLinkProps) {
  const textClass = variant === "light" ? "text-white" : "text-brand-navy";
  const circleClass =
    variant === "light"
      ? "bg-white text-brand-navy"
      : "bg-brand-navy text-white";

  const content = (
    <>
      <span>{children}</span>
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${circleClass} transition-colors duration-200 group-hover:bg-brand-accent group-hover:text-white`}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  const classes = `group inline-flex items-center gap-3 text-sm font-semibold ${textClass} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
