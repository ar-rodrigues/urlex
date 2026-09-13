"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { PlanCheckIcon } from "@/components/landing/plan-check-icon";
import {
  ARRENDAMIENTO_PLAN_FEATURES,
  ARRENDAMIENTO_PLAN_IDS,
  type ArrendamientoPlanId,
} from "@/lib/arrendamiento-plans";

type PlanCopy = {
  name: string;
  subtitle: string;
  scope: string;
  cta: string;
  features: string[];
};

type Props = {
  badge: string;
  scopeLabel: string;
  plans: Record<ArrendamientoPlanId, PlanCopy>;
};

const viewport = { once: true, amount: 0.25 } as const;

export function ArrendamientoPlanCards({ badge, scopeLabel, plans }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid w-full grid-cols-1 gap-6 pt-5 lg:grid-cols-3 lg:items-stretch lg:gap-8">
      {ARRENDAMIENTO_PLAN_IDS.map((planId, index) => {
        const isHighlighted = planId === "beta";
        const features = ARRENDAMIENTO_PLAN_FEATURES[planId];
        const copy = plans[planId];
        const delay = index * 0.1;

        return (
          <motion.div
            key={planId}
            className={[
              "relative flex h-full flex-col overflow-visible rounded-2xl border bg-white",
              isHighlighted ? "z-10 lg:-translate-y-2" : "z-0",
            ].join(" ")}
            style={{
              borderColor: isHighlighted
                ? "var(--color-accent)"
                : "var(--color-border)",
              borderWidth: isHighlighted ? 2 : 1,
              boxShadow: isHighlighted
                ? "0 20px 48px color-mix(in srgb, var(--color-primary) 28%, transparent), 0 8px 20px color-mix(in srgb, var(--color-text) 14%, transparent)"
                : "0 8px 24px color-mix(in srgb, var(--color-text) 6%, transparent)",
            }}
            initial={
              reduceMotion
                ? false
                : isHighlighted
                  ? { opacity: 0, y: 36, scale: 0.92 }
                  : { opacity: 0, y: 28, scale: 1 }
            }
            whileInView={
              reduceMotion
                ? undefined
                : isHighlighted
                  ? { opacity: 1, y: 0, scale: 1.03 }
                  : { opacity: 1, y: 0, scale: 1 }
            }
            viewport={viewport}
            transition={{
              duration: isHighlighted ? 0.65 : 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: isHighlighted ? delay + 0.08 : delay,
            }}
          >
            {isHighlighted ? (
              <motion.span
                className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-primary)",
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.9 }}
                whileInView={
                  reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={viewport}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: delay + 0.35,
                }}
              >
                {badge}
              </motion.span>
            ) : null}

            <div
              className={`flex flex-col gap-1 px-6 md:px-8 ${
                isHighlighted
                  ? "rounded-t-[0.875rem] pb-5 pt-9 md:pb-6"
                  : "rounded-t-2xl pb-0 pt-8"
              }`}
              style={
                isHighlighted
                  ? { background: "var(--color-primary)" }
                  : undefined
              }
            >
              <h3
                className="font-display text-2xl font-bold"
                style={{
                  color: isHighlighted
                    ? "var(--color-text-on-primary)"
                    : "var(--color-primary)",
                }}
              >
                {copy.name}
              </h3>
              <p
                className="text-base font-medium"
                style={{
                  color: isHighlighted
                    ? "var(--color-text-on-primary-muted)"
                    : "var(--color-text-muted)",
                }}
              >
                {copy.subtitle}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
              <ul className="flex flex-1 flex-col gap-3">
                {features.map((featureKey, featureIndex) => (
                  <li key={featureKey} className="flex items-start gap-3">
                    <PlanCheckIcon size={20} className="mt-0.5" />
                    <span
                      className="text-base font-medium leading-[1.4]"
                      style={{ color: "var(--color-text)" }}
                    >
                      {copy.features[featureIndex]}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-col gap-1 border-t pt-4"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {scopeLabel}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {copy.scope}
                </p>
              </div>

              <a href="#contacto-arrendamiento" className="mt-auto">
                <Button
                  variant={isHighlighted ? "primary" : "secondaryLight"}
                  className="w-full"
                >
                  {copy.cta}
                </Button>
              </a>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
