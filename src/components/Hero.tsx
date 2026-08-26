"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CommandCenter } from "./CommandCenter";
import { Button } from "./ui/Button";
import { Eyebrow } from "./ui/Eyebrow";
import { easeEnter, stagger, fadeUp } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
      <div className="horizon" aria-hidden="true" />
      <div className="relative z-[2] mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div variants={stagger} initial={reduce ? false : "hidden"} animate="show">
          <motion.div variants={fadeUp}>
            <Eyebrow>The Crate / Freight operating system</Eyebrow>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              className="max-w-[14ch] text-[46px] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[72px] xl:text-[96px]"
              initial={reduce ? false : { y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: easeEnter, delay: 0.08 }}
            >
              Know where every shipment stands.
            </motion.h1>
          </div>
          <motion.p
            className="mt-6 max-w-[38em] text-[17px] text-[var(--text-secondary)] md:text-[19px]"
            variants={fadeUp}
          >
            Shipfront brings bookings, carriers, documents, exceptions, and live tracking into one operational workspace so your team can move goods with confidence.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeUp}>
            <Button href="/access/">Request access</Button>
            <Button href="/#product" variant="secondary">
              Explore the platform
            </Button>
          </motion.div>
        </motion.div>
        <CommandCenter />
      </div>
    </section>
  );
}
