import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { HeroReveal, HERO_STEP, HERO_IMAGE_DELAY } from "@/components/ui/reveal";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section id="inicio" className="w-full" style={{ background: "var(--color-primary)" }}>
      <div className="landing-container flex flex-col items-stretch gap-8 py-10 lg:flex-row lg:items-center lg:gap-12 lg:py-12 xl:gap-16">
        <div className="order-2 flex min-w-0 flex-1 flex-col gap-5 lg:order-1 lg:gap-6">
          <HeroReveal>
            <h1
              className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.125rem] lg:text-[2.5rem]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              {t("titleBefore")}{" "}
              <span style={{ color: "var(--color-accent)" }}>{t("titleHighlight")}</span>{" "}
              {t("titleAfter")}
            </h1>
          </HeroReveal>
          <HeroReveal delay={HERO_STEP}>
            <p
              className="text-base font-medium leading-[1.45] md:text-lg lg:text-[1.375rem]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              {t("subtitle")}
            </p>
          </HeroReveal>
          <HeroReveal delay={HERO_STEP * 2}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href="#contacto">
                <Button variant="primary">{t("ctaPrimary")}</Button>
              </a>
              <a href="#servicios">
                <Button variant="secondary">{t("ctaSecondary")}</Button>
              </a>
            </div>
          </HeroReveal>
          <HeroReveal delay={HERO_STEP * 3}>
            <p className="text-sm md:text-base" style={{ color: "var(--color-text-on-primary-muted)" }}>
              {t("meta")}
            </p>
          </HeroReveal>
        </div>

        <HeroReveal
          delay={HERO_IMAGE_DELAY}
          from="right"
          scale
          className="relative order-1 h-[280px] w-full shrink-0 overflow-hidden sm:h-[340px] lg:order-2 lg:h-[464px] lg:w-[min(38%,400px)]"
        >
          <Image
            src="/images/landing/hero.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 400px"
            priority
          />
        </HeroReveal>
      </div>
    </section>
  );
}
