import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import type { PracticeAreaId } from "@/lib/practice-areas";
import { PRACTICE_AREAS } from "@/lib/practice-areas";
import { HeroReveal, HERO_STEP, HERO_IMAGE_DELAY } from "@/components/ui/reveal";

type Props = {
  areaId: PracticeAreaId;
};

export async function PracticeHero({ areaId }: Props) {
  const area = PRACTICE_AREAS[areaId];
  const t = await getTranslations(`Practice.${areaId}`);

  return (
    <section className="w-full" style={{ background: "var(--color-primary)" }}>
      <div className="landing-container py-4 md:py-5">
        <HeroReveal>
          <nav
            aria-label="Miga de pan"
            className="flex flex-wrap gap-x-1 text-sm font-semibold md:text-base lg:text-lg"
          >
            <Link
              href="/#inicio"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-accent)" }}
            >
              {t("breadcrumbHome")}
            </Link>
            <span style={{ color: "var(--color-accent)" }}>/</span>
            <Link
              href="/servicios"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-accent)" }}
            >
              {t("breadcrumbServices")}
            </Link>
            <span style={{ color: "var(--color-border)" }}>/</span>
            <span style={{ color: "var(--color-border)" }}>
              {t("breadcrumbCurrent")}
            </span>
          </nav>
        </HeroReveal>
      </div>

      <div className="landing-container flex flex-col items-stretch gap-8 pb-10 lg:flex-row lg:items-center lg:gap-12 lg:pb-12 xl:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
          <HeroReveal delay={HERO_STEP}>
            <h1
              className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-[0.03em] md:text-[2rem] lg:text-[2.25rem]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              {t("title")}
            </h1>
          </HeroReveal>
          <HeroReveal delay={HERO_STEP * 2}>
            <div
              className="flex flex-col gap-4 text-base font-medium leading-[1.45] md:text-lg lg:text-[1.375rem]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              <p>{t("body")}</p>
            </div>
          </HeroReveal>
          <HeroReveal delay={HERO_STEP * 3}>
            <p className="text-sm md:text-base" style={{ color: "var(--color-accent)" }}>
              {t("practiceArea")}
            </p>
          </HeroReveal>
        </div>

        <HeroReveal
          delay={HERO_IMAGE_DELAY}
          from="right"
          scale
          className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-lg sm:h-[280px] lg:h-[321px] lg:w-[min(42%,498px)]"
        >
          <Image
            src={area.heroImage}
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 498px"
            priority
          />
        </HeroReveal>
      </div>
    </section>
  );
}
