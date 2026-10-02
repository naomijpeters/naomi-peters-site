import type { ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
export type ButtonSize = "md" | "lg" | "sm";

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra?: string) {
  const base =
    "group inline-flex items-center justify-center gap-2 text-center font-semibold uppercase tracking-[0.12em] transition-colors duration-200 rounded-[3px] disabled:cursor-not-allowed disabled:opacity-60";
  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2.5 text-[0.7rem]",
    md: "px-6 py-3.5 text-[0.75rem]",
    lg: "px-7 py-4 text-[0.8rem]",
  };
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-terracotta text-white hover:bg-terracotta-deep",
    secondary: "border border-ink text-ink hover:bg-ink hover:text-ivory",
    ghost: "justify-start! text-left! text-ink underline decoration-line underline-offset-[6px] hover:decoration-terracotta px-0! py-1!",
    light: "bg-ivory text-ink hover:bg-gold",
    "outline-light": "border border-ivory/60 text-ivory hover:bg-ivory hover:text-ink",
  };
  return cx(base, sizes[size], variants[variant], extra);
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cx("h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function Container({ children, className, narrow }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={cx("mx-auto w-full px-5 sm:px-8", narrow ? "max-w-3xl" : "max-w-7xl", className)}>{children}</div>
  );
}

export function SectionLabel({
  number,
  children,
  className,
  tone = "dark",
}: {
  number?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p className={cx("label flex items-center gap-3", tone === "dark" ? "text-terracotta" : "text-gold", className)}>
      {number && <span className="tabular-nums">{number}</span>}
      {number && <span aria-hidden="true" className={cx("h-px w-8", tone === "dark" ? "bg-terracotta/50" : "bg-gold/60")} />}
      <span>{children}</span>
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b rule pb-14 pt-14 sm:pb-20 sm:pt-20">
      <Container>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="display mt-6 max-w-4xl text-[2.75rem] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{intro}</div>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
