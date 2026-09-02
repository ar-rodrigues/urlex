import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  ARRENDAMIENTO_COMPARISON_ROWS,
  ARRENDAMIENTO_PLAN_IDS,
} from "@/lib/arrendamiento-plans";

function CheckCell({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
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
    );
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

  return (
    <section
      className="landing-section w-full"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container flex flex-col items-center gap-8 md:gap-10">
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
        </div>

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
                    className="px-4 py-4 text-center text-base font-semibold md:px-6"
                    style={{ color: "var(--color-text-on-primary)" }}
                  >
                    {planId.charAt(0).toUpperCase() + planId.slice(1)}
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
      </div>
    </section>
  );
}
