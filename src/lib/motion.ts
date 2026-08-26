export const easeEnter = [0.22, 1, 0.36, 1] as const;
export const easeStd = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeEnter },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const micro = { duration: 0.18, ease: easeStd };
export const component = { duration: 0.36, ease: easeEnter };
export const section = { duration: 0.8, ease: easeEnter };
