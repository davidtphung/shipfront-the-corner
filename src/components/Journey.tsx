"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  { n: "01", title: "Plan", copy: "Compare routes, capacity, cost, and confidence." },
  { n: "02", title: "Book", copy: "Commit with carrier and document requirements in view." },
  { n: "03", title: "Track", copy: "Follow milestones, location signals, and ETA changes." },
  { n: "04", title: "Resolve", copy: "Turn exceptions into owned, time-bound actions." },
  { n: "05", title: "Learn", copy: "Use network performance to make the next move better." },
];

export function Journey() {
  const reduce = useReducedMotion();

  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="max-w-[16ch] text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
          From booking to delivery, one operational thread.
        </h2>
        <div className="relative mt-12 overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[#0a0f18] p-6 md:p-10">
          <svg viewBox="0 0 1100 160" className="hidden w-full md:block" aria-hidden="true">
            <path
              d="M40 110 C 180 40, 320 40, 460 110 S 740 180, 880 90 1060 40, 1060 40"
              fill="none"
              stroke="rgba(91,124,255,0.45)"
              strokeWidth="1.5"
            />
            <motion.rect
              x="28"
              y="98"
              width="22"
              height="16"
              rx="2"
              fill="#53D9FF"
              animate={reduce ? undefined : { offsetDistance: ["0%", "100%"] }}
              style={{ offsetPath: "path('M40 110 C 180 40, 320 40, 460 110 S 740 180, 880 90 1060 40, 1060 40')" }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </svg>
          <ol className="mt-4 grid gap-4 md:grid-cols-5">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-[16px] border border-[var(--border-subtle)] p-4">
                <p className="mono text-[12px] text-[var(--cyan)]">{step.n}</p>
                <h3 className="mt-2 text-[20px] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[14px] text-[var(--text-secondary)]">{step.copy}</p>
                <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                  {["Origin", "Port", "Ocean / rail", "Hub", "Door"][i]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
