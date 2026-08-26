import Link from "next/link";
import { Mark } from "./Mark";
import { Button } from "./ui/Button";

const cols = [
  {
    title: "Product",
    links: [
      ["Command Center", "/#product"],
      ["Booking", "/#product"],
      ["Tracking", "/#product"],
      ["Intelligence", "/#developers"],
      ["Analytics", "/#network"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Freight Forwarders", "/#why"],
      ["Retailers", "/#why"],
      ["Manufacturers", "/#why"],
      ["3PLs", "/#why"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/#why"],
      ["Careers", "/access/"],
      ["Contact", "/access/"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["API", "/#developers"],
      ["Documentation", "/#developers"],
      ["Security", "/#developers"],
      ["Status", "/#developers"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="resources" className="border-t border-[var(--border-subtle)] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Mark />
              <span className="text-[13px] font-semibold tracking-[0.18em]">SHIPFRONT</span>
            </div>
            <p className="mt-3 max-w-[28em] text-[15px] text-[var(--text-secondary)]">
              Shipfront. Operations for everything in motion.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[18px] font-semibold">Move with more certainty.</p>
            <Button href="/access/">Request access</Button>
          </div>
        </div>

        <div id="developers" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="text-[13px] uppercase tracking-[0.14em] text-[var(--text-muted)]">{col.title}</h2>
              <ul className="mt-3 space-y-1">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="inline-flex min-h-10 items-center text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--border-subtle)] pt-6 text-[13px] text-[var(--text-muted)]">
          <Link href="/access/">Privacy</Link>
          <Link href="/access/">Terms</Link>
          <Link href="/#developers">Security</Link>
          <p>© 2026 Shipfront</p>
        </div>
      </div>
    </footer>
  );
}
