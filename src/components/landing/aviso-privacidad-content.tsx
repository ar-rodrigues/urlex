import { getTranslations } from "next-intl/server";
import { ContentPageHero } from "@/components/landing/content-page-hero";

const SECTION_KEYS = [
  "controller",
  "data",
  "purpose",
  "arco",
  "transfer",
] as const;

export async function AvisoPrivacidadContent() {
  const t = await getTranslations("AvisoPrivacidad");

  return (
    <>
      <ContentPageHero
        breadcrumbCurrent={t("breadcrumbCurrent")}
        variant="breadcrumb-only"
      />

      <section className="w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-8 py-10 md:gap-10 md:py-14">
          <header className="flex flex-col gap-3">
            <h1
              className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
              style={{ color: "var(--color-text)" }}
            >
              {t("title")}
            </h1>
            <p
              className="text-sm font-medium md:text-base"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("lastUpdated")}
            </p>
          </header>

          <div className="flex max-w-3xl flex-col gap-8">
            {SECTION_KEYS.map((key) => (
              <section key={key} className="flex flex-col gap-2">
                <h2
                  className="font-display text-xl font-bold tracking-[0.02em] md:text-2xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`sections.${key}.title`)}
                </h2>
                <p
                  className="text-base leading-relaxed md:text-lg"
                  style={{ color: "var(--color-text)" }}
                >
                  {t(`sections.${key}.body`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
