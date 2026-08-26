const partners = ["Forwarders", "Retailers", "Industrial suppliers", "Manufacturers", "3PLs", "Marketplaces"];

const chips = [
  "42 countries connected",
  "98.7% shipment data completeness",
  "Minutes, not hours, to resolve exceptions",
  "One workspace across every carrier",
];

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--border-subtle)] px-5 py-12 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-center text-[15px] text-[var(--text-secondary)]">Built for teams moving complex freight.</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {partners.map((name) => (
            <li key={name} className="mono text-[12px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {name}
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-[var(--border-subtle)] px-3 py-2 text-[12px] text-[var(--text-secondary)]"
            >
              {chip}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-[12px] text-[var(--text-muted)]">Sample product figures. Not verified customer metrics.</p>
      </div>
    </section>
  );
}
