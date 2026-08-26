export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--cyan)]">
      {children}
    </p>
  );
}
