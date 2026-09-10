import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ContentPageHero } from "@/components/landing/content-page-hero";
import { SuccessCasesSection } from "@/components/landing/success-cases-section";
import {
  TrayectoriaTimeline,
  type TimelineItem,
} from "@/components/landing/trayectoria-timeline";
import { Link } from "@/lib/navigation";

const TIMELINE_KEYS = ["1996", "2005", "2012", "2018", "2024"] as const;
const PROCESS_KEYS = ["1", "2", "3", "4", "5"] as const;

export async function TrayectoriaContent() {
  const t = await getTranslations("Trayectoria");

  const timelineItems: TimelineItem[] = TIMELINE_KEYS.map((key) => ({
    year: t(`timeline.${key}.year`),
    title: t(`timeline.${key}.title`),
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
        className="w-full py-12 md:py-16"
        style={{ background: "var(--color-primary)" }}
      >
        <div className="landing-container">
          <h2
            className="mx-auto max-w-4xl text-center font-display text-[1.5rem] font-bold md:text-[2rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("experienceTitle")}
          </h2>
        </div>
      </section>

      <section
        className="landing-section w-full"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="landing-container flex flex-col gap-10">
          <h2
            className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
            style={{ color: "var(--color-primary)" }}
          >
            {t("processTitle")}
          </h2>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_KEYS.map((key) => (
              <li key={key} className="flex flex-col items-center gap-3 text-center">
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
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SuccessCasesSection />

      <section
        className="w-full py-9 md:py-12"
        style={{ background: "var(--color-accent)" }}
      >
        <div className="landing-container flex flex-col items-center gap-6 text-center">
          <div
            className="flex h-[60px] w-16 items-center justify-center overflow-hidden rounded-md border bg-white"
            style={{ borderColor: "var(--color-accent)" }}
          >
            <Image
              src="/images/shared/icon-question.svg"
              alt=""
              width={45}
              height={45}
            />
          </div>
          <div className="flex max-w-4xl flex-col gap-1">
            <h2
              className="font-display text-[1.5rem] font-semibold leading-normal md:text-[1.75rem]"
              style={{ color: "var(--color-bg-muted)" }}
            >
              {t("ctaTitle")}
            </h2>
            <p
              className="text-lg font-semibold md:text-2xl"
              style={{ color: "var(--color-bg-muted)" }}
            >
              {t("ctaSubtitle")}
            </p>
          </div>
          <Link href="/contacto">
            <Button variant="onAccent">{t("ctaButton")}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
