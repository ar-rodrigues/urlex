import { getTranslations } from "next-intl/server";
import { ArrendamientoPlanCards } from "@/components/landing/arrendamiento-plan-cards";
import { Reveal, REVEAL_STEP } from "@/components/ui/reveal";
import {
  ARRENDAMIENTO_PLAN_FEATURES,
  ARRENDAMIENTO_PLAN_IDS,
  type ArrendamientoPlanId,
} from "@/lib/arrendamiento-plans";

export async function ArrendamientoPlans() {
  const t = await getTranslations("ArrendamientoPage.plans");

  const plans = Object.fromEntries(
    ARRENDAMIENTO_PLAN_IDS.map((planId) => [
      planId,
      {
        name: t(`items.${planId}.name`),
        subtitle: t(`items.${planId}.subtitle`),
        scope: t(`items.${planId}.scope`),
        cta: t(`items.${planId}.cta`),
        features: ARRENDAMIENTO_PLAN_FEATURES[planId].map((featureKey) =>
          t(`features.${featureKey}`),
        ),
      },
    ]),
  ) as Record<
    ArrendamientoPlanId,
    {
      name: string;
      subtitle: string;
      scope: string;
      cta: string;
      features: string[];
    }
  >;

  return (
    <section
      id="planes"
      className="w-full scroll-mt-20 py-[var(--spacing-section)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="landing-container flex flex-col gap-10 md:gap-12">
        <div className="flex max-w-2xl flex-col items-start gap-2 text-left">
          <Reveal>
            <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase leading-none tracking-wider">
              <span style={{ color: "var(--color-primary)" }}>{t("eyebrow")}</span>
              <span
                className="inline-block h-[2px] w-8 shrink-0"
                style={{
                  background: "var(--color-accent)",
                  transform: "translateY(-0.12em)",
                }}
                aria-hidden
              />
            </div>
          </Reveal>
          <div className="flex flex-col gap-1.5">
            <Reveal delay={REVEAL_STEP}>
              <h2
                className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2.25rem]"
                style={{ color: "var(--color-primary)" }}
              >
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={REVEAL_STEP * 2}>
              <p
                className="text-base font-medium leading-[1.4] md:text-[1.375rem]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("body")}
              </p>
            </Reveal>
          </div>
        </div>

        <ArrendamientoPlanCards
          badge={t("badge")}
          scopeLabel={t("scopeLabel")}
          plans={plans}
        />
      </div>
    </section>
  );
}
