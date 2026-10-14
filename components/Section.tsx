import type { ReactNode } from "react";

export function Section({
  id,
  title,
  className = "",
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section ${className}`}>
      <h2 id={`${id}-title`} className="text-h2 font-bold text-balance">
        {title}
      </h2>
      {children}
    </section>
  );
}
