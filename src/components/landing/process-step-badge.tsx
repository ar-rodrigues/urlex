"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  index: number;
};

/** Entrance for process step numbers (01, 02, 03) — scale pop, staggered. */
export function ProcessStepBadge({ index }: Props) {
  const reduceMotion = useReducedMotion();
  const label = String(index + 1).padStart(2, "0");

  const className =
    "relative z-10 flex h-14 w-14 items-center justify-center rounded-full font-display text-lg font-bold";
  const style = {
    background: "var(--color-primary)",
    color: "var(--color-text-on-primary)",
  } as const;

  if (reduceMotion) {
    return (
      <span className={className} style={style}>
        {label}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.55 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 22,
        delay: index * 0.14,
      }}
    >
      {label}
    </motion.span>
  );
}
