"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { REVEAL_STEP } from "@/components/ui/reveal";

type Props = {
  value: string;
  label: string;
  delay?: number;
};

function parseStat(value: string): { target: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1] ?? "",
    target: Number(match[2]),
    suffix: match[3] ?? "",
  };
}

export function AnimatedStat({ value, label, delay = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const parsed = parseStat(value);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 22, mass: 0.8 });
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || reduceMotion) {
      setDisplay(value);
      return;
    }

    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(`${parsed.prefix}${Math.round(latest)}${parsed.suffix}`);
    });
    return unsubscribe;
  }, [parsed, reduceMotion, spring, value]);

  useEffect(() => {
    if (!parsed || reduceMotion || !inView) return;

    const timer = window.setTimeout(() => {
      motionValue.set(parsed.target);
    }, delay * 1000);

    return () => window.clearTimeout(timer);
  }, [delay, inView, motionValue, parsed, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2 p-4 text-center md:text-left"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      <p
        className="font-display text-3xl font-bold tracking-[0.03em] md:text-[2.5rem]"
        style={{ color: "var(--color-primary)" }}
      >
        {display}
      </p>
      <motion.p
        className="text-sm uppercase tracking-wide md:text-base"
        style={{ color: "var(--color-text-muted)" }}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + REVEAL_STEP,
        }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
