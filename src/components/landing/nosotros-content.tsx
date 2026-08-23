import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageBreadcrumb } from "@/components/landing/page-breadcrumb";
import { NosotrosFaq } from "@/components/landing/nosotros-faq";

const VALUE_KEYS = ["honesty", "commitment", "clarity", "strategy"] as const;
const TEAM_KEYS = ["luis", "juan", "maricruz"] as const;

export async function NosotrosContent() {
  const t = await getTranslations("Nosotros");

  return (
    <>
      <section className="w-full" style={{ background: "var(--color-primary)" }}>
        <PageBreadcrumb current={t("breadcrumbCurrent")} />
        <div className="landing-container pb-0">
          <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] lg:h-[420px]">
            <Image
              src="/images/nosotros/hero.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-x-0 bottom-0 px-6 py-6 md:px-10 md:py-8"
              style={{ background: "var(--color-primary)" }}
            >
              <h1
                className="font-display text-[1.5rem] font-bold leading-[1.2] tracking-[0.03em] md:text-[2.25rem]"
                style={{ color: "var(--color-text-on-primary)" }}
              >
                {t("heroTitle")}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)] lg:gap-12">
          <div className="flex flex-col gap-4">
            <h2
              className="font-display text-[1.75rem] font-bold md:text-[2.25rem]"
              style={{ color: "var(--color-primary)" }}
            >
              {t("historyTitle")}
            </h2>
            <p
              className="text-base leading-[1.5] md:text-lg"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("historyBody")}
            </p>
          </div>
          <aside
            className="rounded-lg p-6"
            style={{ background: "var(--color-primary)" }}
          >
            <h3
              className="mb-3 text-sm font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-accent)" }}
            >
              {t("missionTitle")}
            </h3>
            <p
              className="text-base leading-[1.5]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              {t("missionBody")}
            </p>
          </aside>
        </div>
      </section>

      <section
        className="landing-section w-full"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="landing-container flex flex-col gap-8">
          <h2
            className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
            style={{ color: "var(--color-primary)" }}
          >
            {t("whyTitle")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-[var(--radius-card)] bg-white p-5"
              >
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`values.${key}.title`)}
                </h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  {t(`values.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-8">
          <h2
            className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
            style={{ color: "var(--color-primary)" }}
          >
            {t("teamTitle")}
          </h2>
          <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_KEYS.map((key) => (
              <li
                key={key}
                className="flex flex-col gap-3 rounded-lg border p-5"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold"
                  style={{
                    background: "var(--color-bg-muted)",
                    color: "var(--color-primary)",
                  }}
                  aria-hidden
                >
                  {t(`team.${key}.name`).charAt(0)}
                </div>
                <h3
                  className="font-display text-xl font-bold leading-tight"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`team.${key}.name`)}
                </h3>
                <p
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-accent)" }}
                >
                  {t(`team.${key}.role`)}
                </p>
                <p style={{ color: "var(--color-text-muted)" }}>
                  {t(`team.${key}.bio`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NosotrosFaq />
    </>
  );
}
