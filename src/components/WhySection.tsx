"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./ui/Eyebrow";

const cards = [
  {
    title: "Too many systems",
    copy: "Carrier portals, spreadsheets, document folders, and inboxes create a fragmented view of the same shipment.",
    visual: "systems",
  },
  {
    title: "Exceptions arrive late",
    copy: "By the time a delay reaches your team, the customer promise may already be broken.",
    visual: "delay",
  },
  {
    title: "Visibility is not control",
    copy: "A tracking page tells you where something is. An operating system tells you what to do next.",
    visual: "control",
  },
];

export function WhySection() {
  const reduce = useReducedMotion();

  return (
    <section id="why" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow>Why Shipfront</Eyebrow>
        <h2 className="max-w-[16ch] text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
          Shipping should not require detective work.
        </h2>
        <p className="mt-5 max-w-[44em] text-[17px] text-[var(--text-secondary)] md:text-[19px]">
          Operations teams still chase updates across portals, inboxes, spreadsheets, PDFs, carrier sites, and calls. The Crate pulls the signal into one continuously updated operational view.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              className="panel group p-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-[var(--border-active)]"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <MiniVisual kind={card.visual} />
              <h3 className="mt-5 text-[22px] font-semibold">{card.title}</h3>
              <p className="mt-2 text-[16px] text-[var(--text-secondary)]">{card.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniVisual({ kind }: { kind: string }) {
  if (kind === "systems") {
    return (
      <div className="relative h-36 overflow-hidden rounded-[14px] border border-[var(--border-subtle)] bg-[#0a0f18] p-3">
        <div className="grid grid-cols-3 gap-2">
          {["Portal", "Sheet", "Inbox"].map((label, i) => (
            <motion.div
              key={label}
              className="rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-3 text-[11px] text-[var(--text-muted)]"
              animate={{ x: [0, 18, 0], opacity: [0.55, 1, 0.7] }}
              transition={{ duration: 3.4, delay: i * 0.2, repeat: Infinity }}
            >
              {label}
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-3 left-3 right-3 rounded-[10px] border border-[var(--border-active)] bg-[rgba(91,124,255,0.12)] px-3 py-2 text-[12px] text-[var(--cyan)]">
          One Shipfront panel
        </div>
      </div>
    );
  }

  if (kind === "delay") {
    return (
      <div className="relative h-36 overflow-hidden rounded-[14px] border border-[var(--border-subtle)] bg-[#0a0f18] p-4">
        <div className="mb-4 h-px bg-[var(--border-subtle)]" />
        <motion.div
          className="rounded-[10px] border px-3 py-2 text-[12px]"
          animate={{
            borderColor: ["#ffb454", "#53d9ff", "#43e7a8"],
            color: ["#ffb454", "#53d9ff", "#43e7a8"],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Delay detected. Task opened.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative h-36 overflow-hidden rounded-[14px] border border-[var(--border-subtle)] bg-[#0a0f18] p-3">
      <div className="mb-3 flex items-center gap-2 text-[12px] text-[var(--cyan)]">
        <span className="h-2 w-2 rounded-full bg-[var(--cyan)]" />
        Long Beach
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {["Notify customer", "Rebook", "Upload document", "Assign owner"].map((action) => (
          <div key={action} className="rounded-[10px] border border-[var(--border-subtle)] px-2 py-2 text-[var(--text-secondary)]">
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}
