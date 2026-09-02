import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  ARRENDAMIENTO_PLAN_FEATURES,
  ARRENDAMIENTO_PLAN_IDS,
} from "@/lib/arrendamiento-plans";

export async function ArrendamientoPlans() {
  const t = await getTranslations("ArrendamientoPage.plans");

  return (
    <section
      id="planes"
      className="relative w-full scroll-mt-20 py-[var(--spacing-section)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-1"
        style={{ background: "var(--color-accent)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 top-0 w-1"
        style={{ background: "var(--color-accent)" }}
        aria-hidden
      />

      <div className="landing-container flex flex-col items-center gap-10 md:gap-12">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-accent)" }}
          >
            {t("eyebrow")}
          </p>
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

        <ul className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-8">
          {ARRENDAMIENTO_PLAN_IDS.map((planId) => {
            const isHighlighted = planId === "beta";
            const features = ARRENDAMIENTO_PLAN_FEATURES[planId];

            return (
              <li
                key={planId}
                className="flex flex-col overflow-hidden rounded-2xl border bg-white"
                style={{
                  borderColor: isHighlighted
                    ? "var(--color-accent)"
                    : "var(--color-border)",
                  borderWidth: isHighlighted ? 2 : 1,
                }}
              >
                {isHighlighted ? (
                  <div
                    className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide"
                    style={{
                      background: "var(--color-primary)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {t("badge")}
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                  <div className="flex flex-col gap-1">
                    <h3
                      className="font-display text-2xl font-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {t(`items.${planId}.name`)}
                    </h3>
                    <p
                      className="text-base font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {t(`items.${planId}.subtitle`)}
                    </p>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3">
                    {features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-0.5 shrink-0"
                          aria-hidden
                        >
                          <path
                            d="M12 2L4 6V12C4 17.55 7.84 22.74 12 24C16.16 22.74 20 17.55 20 12V6L12 2Z"
                            fill="var(--color-accent)"
                          />
                          <path
                            d="M9.5 12L11.5 14L15 10.5"
                            stroke="var(--color-primary)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
