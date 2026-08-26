"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
  status: "live" | "watch" | "ok";
};

const nodes: Node[] = [
  { id: "lgb", name: "Long Beach", x: 132, y: 178, status: "live" },
  { id: "lax", name: "Los Angeles", x: 118, y: 168, status: "ok" },
  { id: "chi", name: "Chicago", x: 198, y: 138, status: "live" },
  { id: "nyc", name: "New York", x: 236, y: 142, status: "ok" },
  { id: "sha", name: "Shanghai", x: 548, y: 164, status: "watch" },
  { id: "sin", name: "Singapore", x: 528, y: 232, status: "ok" },
  { id: "rtm", name: "Rotterdam", x: 368, y: 118, status: "ok" },
];

const routes = [
  { from: "lgb", to: "chi", key: "lgb-chi" },
  { from: "sha", to: "lgb", key: "sha-lgb" },
  { from: "sin", to: "rtm", key: "sin-rtm" },
  { from: "rtm", to: "nyc", key: "rtm-nyc" },
  { from: "chi", to: "nyc", key: "chi-nyc" },
];

const events = [
  "Container gated out, Long Beach",
  "Customs documents verified",
  "Rail departure confirmed",
];

const timeline = [
  { label: "Origin pickup", done: true },
  { label: "Port departure", done: true },
  { label: "Rail transfer", done: false, current: true },
  { label: "Final delivery", done: false },
];

function nodeOf(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function CommandCenter() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>("lgb");
  const [tick, setTick] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = window.setTimeout(() => setReady(true), reduce ? 0 : 400);
    if (reduce) return () => window.clearTimeout(boot);
    const id = window.setInterval(() => setTick((n) => (n + 1) % events.length), 2800);
    return () => {
      window.clearTimeout(boot);
      window.clearInterval(id);
    };
  }, [reduce]);

  const hovered = useMemo(() => nodes.find((n) => n.id === hover) ?? nodes[0], [hover]);

  return (
    <div className="panel relative overflow-hidden p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">Crate Command Center</p>
          <p className="text-[15px] text-[var(--text-secondary)]">Live network sample</p>
        </div>
        <span className="mono rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] text-[var(--green)]">
          SYS LIVE
        </span>
      </div>

      <div className="relative grid gap-3 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[#0a0f18]">
          <svg viewBox="0 0 640 320" className="h-auto w-full" role="img" aria-label="Sample freight map with routes between Long Beach, Chicago, Shanghai, Rotterdam, Singapore, and New York">
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="60%" r="60%">
                <stop offset="0%" stopColor="#5B7CFF" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#07090D" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="640" height="320" fill="url(#mapGlow)" />
            <g opacity="0.22" stroke="#8aa0c4" fill="none" strokeWidth="1">
              <path d="M70 70 C140 40, 220 50, 300 70 C360 86, 410 60, 500 80 C560 94, 600 120, 620 150" />
              <path d="M40 150 C120 130, 200 170, 280 160 C360 150, 430 190, 520 180 C570 176, 610 200, 630 220" />
              <path d="M80 230 C160 210, 250 250, 340 240 C420 230, 500 260, 600 250" />
              <path d="M90 110 C150 150, 130 210, 190 240" />
              <path d="M430 90 C470 130, 510 120, 560 160" />
            </g>
            {routes.map((route, i) => {
              const a = nodeOf(route.from);
              const b = nodeOf(route.to);
              const midX = (a.x + b.x) / 2;
              const midY = Math.min(a.y, b.y) - 36;
              return (
                <motion.path
                  key={route.key}
                  d={`M${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
                  fill="none"
                  stroke={route.key === "lgb-chi" ? "#53D9FF" : "#5B7CFF"}
                  strokeWidth={route.key === "lgb-chi" ? 1.8 : 1.1}
                  strokeOpacity={route.key === "lgb-chi" ? 0.9 : 0.35}
                  strokeDasharray="6 8"
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={ready || reduce ? { pathLength: 1, opacity: 1 } : undefined}
                  transition={{ duration: 1.1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
            {nodes.map((node, i) => (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.name} node`}
                className="cursor-pointer"
                onMouseEnter={() => setHover(node.id)}
                onFocus={() => setHover(node.id)}
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="9"
                  fill={node.status === "watch" ? "#FFB454" : "#53D9FF"}
                  opacity="0.16"
                  animate={reduce ? undefined : { scale: [1, 1.45, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.2 }}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="3.4"
                  fill={node.status === "watch" ? "#FFB454" : node.id === "lgb" ? "#53D9FF" : "#5B7CFF"}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.08, type: "spring", stiffness: 260, damping: 22 }}
                />
              </g>
            ))}
          </svg>
          <div className="pointer-events-none absolute left-4 top-4 rounded-[10px] border border-[var(--border-subtle)] bg-[rgba(12,16,23,0.82)] px-3 py-2 text-[12px]">
            <p className="mono text-[var(--cyan)]">{hovered.name}</p>
            <p className="text-[var(--text-secondary)]">Hover a node to inspect the lane.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <motion.article
            className="panel-tight p-4"
            initial={reduce ? false : { x: 18, opacity: 0 }}
            animate={ready || reduce ? { x: 0, opacity: 1 } : undefined}
            transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.55 }}
          >
            <p className="mono text-[11px] text-[var(--text-muted)]">SHIPMENT</p>
            <h3 className="mono mt-1 text-[15px] text-[var(--text-primary)]">SF-2408-1187</h3>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
              <div>
                <dt className="text-[var(--text-muted)]">Route</dt>
                <dd>Long Beach to Chicago</dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">Mode</dt>
                <dd>Intermodal</dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">Status</dt>
                <dd className="text-[var(--cyan)]">In transit</dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">ETA</dt>
                <dd className="mono">Aug 28, 09:40</dd>
              </div>
              <div>
                <dt className="text-[var(--text-muted)]">Risk</dt>
                <dd className="text-[var(--green)]">Low</dd>
              </div>
            </dl>
          </motion.article>

          <div className="panel-tight p-4">
            <p className="mono mb-3 text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Route thread</p>
            <ol className="space-y-2">
              {timeline.map((step) => (
                <li key={step.label} className="flex items-center gap-2 text-[13px]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      step.done ? "bg-[var(--green)]" : step.current ? "bg-[var(--cyan)]" : "bg-[var(--text-muted)]"
                    }`}
                  />
                  <span className={step.current ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="panel-tight min-h-[112px] p-4">
            <p className="mono mb-2 text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Live events</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={events[tick]}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                className="text-[13px] text-[var(--text-primary)]"
              >
                {events[tick]}
              </motion.p>
            </AnimatePresence>
            <p className="mt-2 text-[12px] text-[var(--text-muted)]">Sample event stream. Not live customer data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
