import { getTranslations } from "next-intl/server";
import { ContentPageHero } from "@/components/landing/content-page-hero";
import { PageCtaBanner } from "@/components/landing/page-cta-banner";
import { SuccessCasesSection } from "@/components/landing/success-cases-section";
import {
  TrayectoriaTimeline,
  type TimelineItem,
} from "@/components/landing/trayectoria-timeline";
import { Reveal, RevealStagger } from "@/components/ui/reveal";

const TIMELINE_KEYS = ["1975", "1994", "1997", "2020"] as const;
const PROCESS_KEYS = ["1", "2", "3", "4", "5"] as const;

export async function TrayectoriaContent() {
  const t = await getTranslations("Trayectoria");

  const timelineItems: TimelineItem[] = TIMELINE_KEYS.map((key) => ({
    year: t(`timeline.${key}.year`),
    body: t(`timeline.${key}.body`),
  }));

  return (
    <>
      <ContentPageHero
        breadcrumbCurrent={t("breadcrumbCurrent")}
        variant="below"
        imageSrc="/images/trayectoria/hero.jpg"
        imageAlt={t("imageAlt")}
        imageHeights="h-[280px] sm:h-[400px] lg:h-[520px]"
        title={t("title")}
        body={t("body")}
        tagline={t("tagline")}
      />

      <TrayectoriaTimeline title={t("timelineTitle")} items={timelineItems} />

      <section
        className="landing-section w-full"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="landing-container flex flex-col gap-10">
          <Reveal>
            <h2
              className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
              style={{ color: "var(--color-primary)" }}
            >
              {t("processTitle")}
            </h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_KEYS.map((key) => (
              <div key={key} className="flex h-full flex-col items-center gap-3 text-center">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold"
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  {key}
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`process.${key}.title`)}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {t(`process.${key}.body`)}
                </p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <SuccessCasesSection />

      <PageCtaBanner
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        buttonLabel={t("ctaButton")}
      />
    </>
  );
}
