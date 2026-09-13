import { getTranslations } from "next-intl/server";
import {
  ARRENDAMIENTO_COMPARISON_ROWS,
  ARRENDAMIENTO_PLAN_IDS,
} from "@/lib/arrendamiento-plans";
import { PlanCheckIcon } from "@/components/landing/plan-check-icon";
import { Reveal, REVEAL_STEP } from "@/components/ui/reveal";

function CheckCell({ included }: { included: boolean }) {
  if (included) {
    return <PlanCheckIcon size={24} className="mx-auto" />;
  }

  return (
    <span
      className="mx-auto block h-0.5 w-6"
      style={{ background: "var(--color-border)" }}
      aria-hidden
    />
  );
}

export async function ArrendamientoComparison() {
  const t = await getTranslations("ArrendamientoPage.comparison");
  const tPlans = await getTranslations("ArrendamientoPage.plans");

  return (
    <section
      className="landing-section w-full"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container flex flex-col gap-8 md:gap-10">
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
          <Reveal delay={REVEAL_STEP}>
            <h2
              className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2.25rem]"
              style={{ color: "var(--color-primary)" }}
            >
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={REVEAL_STEP * 2}>
        <div
          className="w-full overflow-x-auto rounded-2xl border"
          style={{ borderColor: "var(--color-border)" }}
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr style={{ background: "var(--color-primary)" }}>
                <th
                  className="px-4 py-4 text-base font-semibold md:px-6"
                  style={{ color: "var(--color-text-on-primary)" }}
                >
                  {t("featureColumn")}
                </th>
                {ARRENDAMIENTO_PLAN_IDS.map((planId) => (
                  <th
                    key={planId}
                    className="px-4 py-4 text-center md:px-6"
                    style={{ color: "var(--color-text-on-primary)" }}
                  >
                    <span className="block text-base font-semibold">
                      {tPlans(`items.${planId}.name`)}
                    </span>
                    <span className="block text-sm font-medium opacity-80">
                      {tPlans(`items.${planId}.subtitle`)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ARRENDAMIENTO_COMPARISON_ROWS.map((row, index) => (
                <tr
                  key={row.key}
                  style={{
                    background: index % 2 === 0 ? "var(--color-bg)" : "var(--color-bg-muted)",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <td
                    className="px-4 py-4 text-base font-medium md:px-6"
                    style={{ color: "var(--color-text)" }}
                  >
                    {t(`rows.${row.key}`)}
                  </td>
                  <td className="px-4 py-4 text-center md:px-6">
                    <CheckCell included={row.alpha} />
                  </td>
                  <td className="px-4 py-4 text-center md:px-6">
                    <CheckCell included={row.beta} />
                  </td>
                  <td className="px-4 py-4 text-center md:px-6">
                    <CheckCell included={row.gamma} />
                  </td>
                </tr>
              ))}
              <tr
                style={{
                  background: "var(--color-bg)",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <td
                  className="px-4 py-4 text-base font-semibold md:px-6"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t("scopeRow")}
                </td>
                {ARRENDAMIENTO_PLAN_IDS.map((planId) => (
                  <td
                    key={planId}
                    className="px-4 py-4 text-center text-sm font-medium md:px-6"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t(`scope.${planId}`)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
