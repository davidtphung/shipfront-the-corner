import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-5 text-[13px] font-semibold tracking-[0.04em] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const styles = {
    primary:
      "bg-[var(--blue)] !text-[#07090D] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_24px_rgba(91,124,255,0.35)]",
    secondary:
      "border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:-translate-y-0.5 hover:border-[var(--border-active)]",
    ghost: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
