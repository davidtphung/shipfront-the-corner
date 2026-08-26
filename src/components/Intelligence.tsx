"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./ui/Eyebrow";

const prompts = [
  "Which shipments are most likely to miss their delivery window this week?",
  "Show all containers delayed at Long Beach.",
  "Why did spend increase on our Asia-to-US routes?",
  "Draft customer updates for shipments with high-risk ETAs.",
  "Which carriers had the best on-time performance this quarter?",
];

const answer =
  "Seven shipments sit inside a 36-hour miss window. Four are tied to Long Beach dwell. Two need a customer update tonight. One can still make Friday if rail is held.";

export function Intelligence() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (reduce) {
      setQuery(prompts[0]);
      setShown(answer);
      return;
    }
    let i = 0;
    const type = window.setInterval(() => {
      i += 1;
      setQuery(prompts[0].slice(0, i));
      if (i >= prompts[0].length) window.clearInterval(type);
    }, 18);
    const stream = window.setTimeout(() => {
      let j = 0;
      const write = window.setInterval(() => {
        j += 1;
        setShown(answer.slice(0, j));
        if (j >= answer.length) window.clearInterval(write);
      }, 10);
    }, 1400);
    return () => {
      window.clearInterval(type);
      window.clearTimeout(stream);
    };
  }, [reduce]);

  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(168,139,255,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <Eyebrow>The Crate intelligence layer</Eyebrow>
        <h2 className="max-w-[16ch] text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
          Ask your operation what matters.
        </h2>
        <p className="mt-5 max-w-[40em] text-[17px] text-[var(--text-secondary)] md:text-[19px]">
          Use natural language to understand what changed, which shipments need attention, and where your network is exposed.
        </p>

        <div className="panel mt-10 p-5 md:p-7">
          <p className="mono text-[12px] text-[var(--text-muted)]">Query</p>
          <p className="mt-2 min-h-[3em] text-[18px]">{query}<span className="ml-0.5 inline-block h-5 w-px bg-[var(--cyan)]" /></p>
          <div className="mt-6 rounded-[16px] border border-[var(--border-subtle)] bg-[#0a0f18] p-5">
            <p className="text-[16px] text-[var(--text-primary)]">{shown}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["SF-2408-1194", "Long Beach dwell"],
                ["SF-2408-1210", "ETA Friday hold"],
                ["SF-2408-1187", "On plan"],
              ].map(([id, note]) => (
                <motion.div
                  key={id}
                  className="rounded-[12px] border border-[var(--border-subtle)] px-3 py-3"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <p className="mono text-[12px] text-[var(--cyan)]">{id}</p>
                  <p className="text-[13px] text-[var(--text-secondary)]">{note}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Create task", "Open report", "Set alert", "Draft message"].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="min-h-10 rounded-[10px] border border-[var(--border-subtle)] px-3 text-[12px] text-[var(--text-secondary)] hover:border-[var(--border-active)] hover:text-[var(--text-primary)]"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {prompts.slice(1).map((prompt) => (
              <li key={prompt} className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-[12px] text-[var(--text-muted)]">
                {prompt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
