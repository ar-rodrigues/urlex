import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/landing/page-breadcrumb";
import { Link } from "@/lib/navigation";

const TIMELINE_KEYS = ["1996", "2005", "2012", "2018", "2024"] as const;
const PROCESS_KEYS = ["1", "2", "3", "4", "5"] as const;

export async function TrayectoriaContent() {
  const t = await getTranslations("Trayectoria");

  return (
    <>
      <section className="w-full" style={{ background: "var(--color-primary)" }}>
        <PageBreadcrumb current={t("breadcrumbCurrent")} />
        <div className="landing-container pb-0">
          <div className="relative h-[200px] w-full overflow-hidden sm:h-[280px] lg:h-[360px]">
            <Image
              src="/images/trayectoria/hero.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="landing-container flex flex-col gap-6 py-10 md:py-12">
          <h1
            className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("title")}
          </h1>
          <p
            className="max-w-4xl text-base font-medium leading-[1.4] md:text-[1.375rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("body")}
          </p>
          <p className="text-base" style={{ color: "var(--color-accent)" }}>
            {t("tagline")}
          </p>
        </div>
      </section>

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-10">
          <h2
            className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
            style={{ color: "var(--color-primary)" }}
          >
            {t("timelineTitle")}
          </h2>
          <ol className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            {TIMELINE_KEYS.map((key, index) => (
              <li
                key={key}
                className="relative flex gap-4 rounded-lg border bg-white p-5 md:gap-6"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-semibold"
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col gap-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {t(`timeline.${key}.year`)}
                  </p>
                  <h3
                    className="text-xl font-semibold md:text-2xl"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t(`timeline.${key}.title`)}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)" }}>
                    {t(`timeline.${key}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
