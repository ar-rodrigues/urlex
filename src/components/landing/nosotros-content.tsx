import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { NosotrosFaq } from "@/components/landing/nosotros-faq";
import { ContentPageHero } from "@/components/landing/content-page-hero";
import { Reveal, RevealStagger, REVEAL_STEP } from "@/components/ui/reveal";

const VALUES = [
  { key: "honesty", icon: "/images/nosotros/icon-honestidad.svg" },
  { key: "commitment", icon: "/images/nosotros/icon-compromiso.svg" },
  { key: "clarity", icon: "/images/nosotros/icon-claridad.svg" },
  { key: "strategy", icon: "/images/nosotros/icon-estrategia.svg" },
] as const;

const TEAM_KEYS = [
  "hector",
  "luis",
  "juan",
  "maricruz",
  "emiliano",
  "joanna",
] as const;

export async function NosotrosContent() {
  const t = await getTranslations("Nosotros");

  return (
    <>
      <ContentPageHero
        breadcrumbCurrent={t("breadcrumbCurrent")}
        variant="overlay"
        imageSrc="/images/nosotros/hero.jpg"
        imageAlt={t("imageAlt")}
        title={t("heroTitle")}
      />

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)] lg:gap-12">
          <div className="flex flex-col gap-4">
            <Reveal>
              <h2
                className="font-display text-[1.75rem] font-bold md:text-[2.25rem]"
                style={{ color: "var(--color-primary)" }}
              >
                {t("historyTitle")}
              </h2>
            </Reveal>
            <Reveal delay={REVEAL_STEP}>
              <p
                className="text-base leading-[1.5] md:text-lg"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("historyBody")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={REVEAL_STEP * 2}>
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
          </Reveal>
        </div>
      </section>

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-8">
          <Reveal>
            <h2
              className="font-display text-[1.75rem] font-bold md:text-[2.25rem]"
              style={{ color: "var(--color-text)" }}
            >
              {t("whyTitle")}
            </h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {VALUES.map(({ key, icon }) => (
              <div
                key={key}
                className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] border p-5 md:p-6"
                style={{
                  background: "var(--color-bg-muted)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md"
                  style={{ background: "var(--color-accent)" }}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-xl font-semibold leading-tight"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t(`values.${key}.title`)}
                  </h3>
                  <p
                    className="text-base leading-[1.5]"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t(`values.${key}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-8 md:gap-10">
          <Reveal>
            <h2
              className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
              style={{ color: "var(--color-text)" }}
            >
              {t("teamTitle")}
            </h2>
          </Reveal>
          <RevealStagger className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {TEAM_KEYS.map((key) => (
              <div
                key={key}
                className="flex h-full flex-col items-center gap-3 rounded-[var(--radius-card)] border px-6 py-8 text-center"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Image
                  src="/images/nosotros/icon-persona.svg"
                  alt=""
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px]"
                />
                <h3
                  className="font-display text-xl font-bold leading-tight md:text-[1.375rem]"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`team.${key}.name`)}
                </h3>
                <div className="flex w-full flex-col items-center gap-3">
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.06em]"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {t(`team.${key}.role`)}
                  </p>
                  <hr
                    className="w-full border-0 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                  <p
                    className="text-sm leading-[1.5] md:text-base"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t(`team.${key}.bio`)}
                  </p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <NosotrosFaq />
    </>
  );
}
