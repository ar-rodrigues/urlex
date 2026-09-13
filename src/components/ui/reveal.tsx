"use client";

import { Children, isValidElement } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Delay between title → text → CTAs within a section. */
export const REVEAL_STEP = 0.1;

/** Stronger stagger for above-the-fold heroes. */
export const HERO_STEP = 0.14;

/**
 * Short beat after sibling text — not a long hold that leaves blank space.
 */
export const REVEAL_IMAGE_DELAY = 0.15;

/** Hero photo: after title → subtitle → CTAs (HERO_STEP × 3 ≈ 0.42). */
export const HERO_IMAGE_DELAY = 0.5;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  /** Soft slide from the side (e.g. quote callouts). */
  from?: "up" | "left" | "right";
  /**
   * Photo/media entrance. Waits at least REVEAL_IMAGE_DELAY /
   * HERO_IMAGE_DELAY so images don't beat nearby text.
   */
  scale?: boolean;
};

/** Fire as soon as the block nears the viewport — avoid empty “waiting” gaps. */
const viewport = { once: true, amount: 0.08, margin: "0px 0px 20% 0px" } as const;

const OFFSET = 28;
const DURATION = 0.55;
const MEDIA_DURATION = 0.85;

const HERO_OFFSET = 48;
const HERO_DURATION = 0.8;
const HERO_EASE = [0.16, 1, 0.3, 1] as const;

function textInitial(from: RevealProps["from"], offset: number) {
  return {
    opacity: 0,
    y: from === "up" || !from ? offset : 0,
    x: from === "left" ? -offset : from === "right" ? offset : 0,
  };
}

/** Photo entrance: soft zoom-out + crop expand (distinct from text slide-up). */
function mediaInitial() {
  return {
    opacity: 0,
    scale: 1.08,
    clipPath: "inset(10% 10% 10% 10%)",
  };
}

function mediaAnimate() {
  return {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
  };
}

function mediaDelay(delay: number, floor: number, isMedia: boolean) {
  return isMedia ? Math.max(delay, floor) : delay;
}

export function Reveal({
  children,
  className,
  delay = 0,
  style,
  from = "up",
  scale = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const resolvedDelay = mediaDelay(delay, REVEAL_IMAGE_DELAY, scale);

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={scale ? mediaInitial() : textInitial(from, OFFSET)}
      whileInView={scale ? mediaAnimate() : { opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{
        duration: scale ? MEDIA_DURATION : DURATION,
        ease: scale ? HERO_EASE : [0.22, 1, 0.36, 1],
        delay: resolvedDelay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Above-the-fold entrance — mounts with animate (not scroll), larger travel.
 * Use for page heroes: breadcrumbs, titles, copy, images, CTAs.
 */
export function HeroReveal({
  children,
  className,
  delay = 0,
  style,
  from = "up",
  scale = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const resolvedDelay = mediaDelay(delay, HERO_IMAGE_DELAY, scale);

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={scale ? mediaInitial() : textInitial(from, HERO_OFFSET)}
      animate={scale ? mediaAnimate() : { opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: scale ? MEDIA_DURATION : HERO_DURATION,
        ease: HERO_EASE,
        delay: 0.15 + resolvedDelay,
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  scale?: boolean;
};

export function RevealStagger({
  children,
  className,
  stagger = REVEAL_STEP,
  scale = false,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion();
  const items = Children.toArray(children);
  const step = Math.min(Math.max(stagger, 0), 0.14);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {items.map((child, index) => (
        <motion.div
          key={isValidElement(child) && child.key != null ? String(child.key) : index}
          initial={{ opacity: 0, y: OFFSET, scale: scale ? 0.96 : 1 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewport}
          transition={{
            duration: DURATION,
            ease: [0.22, 1, 0.36, 1],
            delay: index * step,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
