import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PlanCheckIcon } from "@/components/landing/plan-check-icon";
import {
  ARRENDAMIENTO_PLAN_FEATURES,
  ARRENDAMIENTO_PLAN_IDS,
} from "@/lib/arrendamiento-plans";

export async function ArrendamientoPlans() {
  const t = await getTranslations("ArrendamientoPage.plans");

  return (
    <section
      id="planes"
      className="w-full scroll-mt-20 py-[var(--spacing-section)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="landing-container flex flex-col gap-10 md:gap-12">
        <div className="flex max-w-2xl flex-col items-start gap-2 text-left">
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
          <div className="flex flex-col gap-1.5">
            <h2
              className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2.25rem]"
              style={{ color: "var(--color-primary)" }}
            >
              {t("title")}
            </h2>
            <p
              className="text-base font-medium leading-[1.4] md:text-[1.375rem]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("body")}
            </p>
          </div>
        </div>

        <ul className="grid w-full grid-cols-1 gap-6 pt-5 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {ARRENDAMIENTO_PLAN_IDS.map((planId) => {
            const isHighlighted = planId === "beta";
            const features = ARRENDAMIENTO_PLAN_FEATURES[planId];

            return (
              <li
                key={planId}
                className="relative flex flex-col overflow-visible rounded-2xl border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                style={{
                  borderColor: isHighlighted
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                  borderWidth: isHighlighted ? 2 : 1,
                }}
              >
                {isHighlighted ? (
                  <span
                    className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wide"
                    style={{
                      background: "var(--color-accent)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {t("badge")}
                  </span>
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
                    {t(`items.${planId}.name`)}
                  </h3>
                  <p
                    className="text-base font-medium"
                    style={{
                      color: isHighlighted
                        ? "var(--color-text-on-primary-muted)"
                        : "var(--color-text-muted)",
                    }}
                  >
                    {t(`items.${planId}.subtitle`)}
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                  <ul className="flex flex-1 flex-col gap-3">
                    {features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-3">
                        <PlanCheckIcon size={20} className="mt-0.5" />
                        <span
                          className="text-base font-medium leading-[1.4]"
                          style={{ color: "var(--color-text)" }}
                        >
                          {t(`features.${featureKey}`)}
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
                      {t("scopeLabel")}
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {t(`items.${planId}.scope`)}
                    </p>
                  </div>

                  <a href="#contacto-arrendamiento" className="mt-auto">
                    <Button
                      variant={isHighlighted ? "primary" : "secondaryLight"}
                      className="w-full"
                    >
                      {t(`items.${planId}.cta`)}
                    </Button>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
