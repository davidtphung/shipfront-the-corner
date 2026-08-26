"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./ui/Eyebrow";

export function Capabilities() {
  return (
    <section id="product" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow>One control surface</Eyebrow>
        <h2 className="max-w-[18ch] text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
          Everything your shipment needs. Nothing your team has to chase.
        </h2>

        <Capability
          kicker="01"
          title="Every shipment, in one operational view."
          copy="Bring route details, carrier milestones, ETAs, documents, owners, costs, messages, and exceptions together in a single timeline."
          flip={false}
        >
          <CommandMock />
        </Capability>

        <Capability
          kicker="02"
          title="Choose the route that fits the promise."
          copy="Compare carriers, transit times, cutoffs, pricing, and risk before you commit."
          flip
        >
          <BookingMock />
        </Capability>

        <Capability
          kicker="03"
          title="See risk before it becomes a fire drill."
          copy="Shipfront turns events into prioritized work, so your team can act while there is still time to protect the delivery."
          flip={false}
        >
          <ExceptionMock />
        </Capability>

        <Capability
          kicker="04"
          title="Documents that travel with the shipment."
          copy="Keep bills of lading, packing lists, customs records, proofs of delivery, and internal notes connected to the freight they belong to."
          flip
        >
          <DocumentsMock />
        </Capability>

        <div id="network" className="scroll-mt-24">
          <Capability
            kicker="05"
            title="Turn movement into operational intelligence."
            copy="See carrier reliability, dwell time, late-delivery patterns, route performance, and cost drift across your network."
            flip={false}
          >
            <AnalyticsMock />
          </Capability>
        </div>
      </div>
    </section>
  );
}

function Capability({
  kicker,
  title,
  copy,
  flip,
  children,
}: {
  kicker: string;
  title: string;
  copy: string;
  flip: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`mt-16 grid items-center gap-8 lg:grid-cols-2 ${flip ? "lg:[&>div:first-child]:order-2" : ""}`}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="mono text-[12px] text-[var(--cyan)]">{kicker}</p>
        <h3 className="mt-2 max-w-[18ch] text-[28px] font-semibold leading-tight md:text-[36px]">{title}</h3>
        <p className="mt-4 max-w-[38em] text-[16px] text-[var(--text-secondary)] md:text-[18px]">{copy}</p>
      </motion.div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const shipments = [
  { id: "SF-2408-1187", lane: "LGB → CHI", status: "In transit" },
  { id: "SF-2408-1194", lane: "SHA → LGB", status: "Watch" },
  { id: "SF-2408-1201", lane: "SIN → RTM", status: "On time" },
];

function CommandMock() {
  const [active, setActive] = useState(0);
  const row = shipments[active];
  return (
    <div className="panel overflow-hidden">
      <div className="grid md:grid-cols-[0.7fr_1.3fr]">
        <ul className="border-b border-[var(--border-subtle)] md:border-b-0 md:border-r">
          {shipments.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full min-h-14 flex-col items-start px-4 py-3 text-left ${
                  i === active ? "bg-[rgba(91,124,255,0.12)]" : "hover:bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <span className="mono text-[12px]">{s.id}</span>
                <span className="text-[12px] text-[var(--text-muted)]">{s.lane}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="p-5">
          <p className="mono text-[12px] text-[var(--cyan)]">{row.id}</p>
          <p className="mt-1 text-[18px] font-semibold">{row.status}</p>
          <p className="mt-3 text-[14px] text-[var(--text-secondary)]">
            Operator Maya Chen. Documents 4 of 4. Cost and emissions sit on the same thread as the route.
          </p>
          <div className="mt-4 h-16 rounded-[12px] border border-[var(--border-subtle)] bg-[#0a0f18] px-4 py-3 text-[12px] text-[var(--text-muted)]">
            Sample AI note: Rail dwell at Barstow is 3 hours under plan. ETA holds.
          </div>
        </div>
      </div>
    </div>
  );
}

const carriers = [
  { name: "Harborline", days: "4d 6h", price: "$1,840", score: "96", tag: "Recommended" },
  { name: "North Arc", days: "5d 2h", price: "$1,610", score: "91", tag: "" },
  { name: "Pacific Cut", days: "3d 18h", price: "$2,240", score: "88", tag: "" },
];

function BookingMock() {
  const [mode, setMode] = useState("Intermodal");
  const rows = mode === "Ocean" ? carriers.slice(1) : carriers;
  return (
    <div className="panel p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {["Intermodal", "Ocean", "Air"].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setMode(chip)}
            className={`min-h-10 rounded-[10px] border px-3 text-[12px] ${
              mode === chip
                ? "border-[var(--border-active)] bg-[rgba(91,124,255,0.14)] text-[var(--text-primary)]"
                : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-[13px]">
          <thead className="text-[var(--text-muted)]">
            <tr>
              <th className="pb-2 font-medium">Carrier</th>
              <th className="pb-2 font-medium">Transit</th>
              <th className="pb-2 font-medium">Price</th>
              <th className="pb-2 font-medium">Reliability</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-[var(--border-subtle)]">
                <td className="py-3">
                  {row.name}
                  {row.tag && <span className="ml-2 text-[11px] text-[var(--cyan)]">{row.tag}</span>}
                </td>
                <td className="mono">{row.days}</td>
                <td className="mono">{row.price}</td>
                <td className="mono text-[var(--green)]">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExceptionMock() {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel p-5">
      <div className="mb-4 flex gap-2 text-[12px]">
        {["Critical", "Watch", "Resolved"].map((tab, i) => (
          <span
            key={tab}
            className={`rounded-[10px] px-3 py-1 ${i === 1 ? "bg-[rgba(255,180,84,0.12)] text-[var(--warning)]" : "text-[var(--text-muted)]"}`}
          >
            {tab}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-[14px] border border-[rgba(255,180,84,0.45)] bg-[rgba(255,180,84,0.08)] p-4 text-left"
      >
        <p className="text-[15px] font-semibold">Port congestion may delay arrival by 18 hours</p>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">SF-2408-1194 · Long Beach · Watch</p>
      </button>
      {open && (
        <div className="mt-3 space-y-2 text-[13px]">
          <p className="text-[var(--text-secondary)]">
            Suggested: notify consignee, reserve alternate linehaul, hold the outbound appointment.
          </p>
          <p className="text-[var(--green)]">Assigned to Jordan Hale. SLA 4h.</p>
        </div>
      )}
    </div>
  );
}

function DocumentsMock() {
  const [missing, setMissing] = useState(3);
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <p className="mono text-[12px] text-[var(--text-muted)]">Document vault</p>
        <button
          type="button"
          onClick={() => setMissing(0)}
          className="min-h-10 rounded-[10px] border border-[var(--border-subtle)] px-3 text-[12px]"
        >
          Scan packet
        </button>
      </div>
      <ul className="mt-4 space-y-2 text-[13px]">
        {["Bill of lading", "Packing list", "Customs record", "Proof of delivery"].map((doc, i) => (
          <li key={doc} className="flex items-center justify-between rounded-[12px] border border-[var(--border-subtle)] px-3 py-3">
            <span>{doc}</span>
            <span className={missing === 0 || i < 1 ? "text-[var(--green)]" : "text-[var(--warning)]"}>
              {missing === 0 || i < 1 ? "Verified" : "Missing"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-[var(--text-muted)]">{missing} missing. Sample checklist.</p>
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="panel p-5">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          ["On-time", "94.2%"],
          ["Avg dwell", "11.4h"],
          ["Exceptions", "17"],
          ["Cost variance", "+2.1%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[12px] border border-[var(--border-subtle)] px-3 py-3">
            <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
            <p className="mono text-[18px]">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-28 items-end gap-2">
        {[40, 62, 48, 78, 70, 88, 64, 92].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-[8px] bg-[linear-gradient(180deg,#53D9FF,#5B7CFF)]"
            initial={{ height: 8 }}
            whileInView={{ height: h }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.04 }}
          />
        ))}
      </div>
      <p className="mt-3 text-[12px] text-[var(--text-muted)]">Sample network view. Placeholder figures.</p>
    </div>
  );
}
