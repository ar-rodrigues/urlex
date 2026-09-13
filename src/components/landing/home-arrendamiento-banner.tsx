import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Reveal, REVEAL_STEP, REVEAL_IMAGE_DELAY } from "@/components/ui/reveal";

export async function HomeArrendamientoBanner() {
  const t = await getTranslations("HomeArrendamientoBanner");

  return (
    <section
      className="w-full py-8 md:py-10"
      style={{ background: "var(--color-bg)" }}
      aria-label={t("title")}
    >
      <div className="landing-container">
        <Link
          href="/servicios/arrendamiento"
          className="relative grid min-h-[12rem] grid-cols-1 items-center overflow-hidden transition-opacity hover:opacity-95 md:min-h-[14rem] md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:min-h-[16rem]"
          style={{ background: "var(--color-primary)" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              backgroundImage: [
                "radial-gradient(circle at 82% 55%, color-mix(in srgb, var(--color-text-on-primary) 14%, transparent) 0%, transparent 38%)",
                "radial-gradient(circle at 82% 55%, transparent 26%, color-mix(in srgb, var(--color-text-on-primary) 9%, transparent) 27%, transparent 46%)",
                "radial-gradient(circle at 82% 55%, transparent 46%, color-mix(in srgb, var(--color-text-on-primary) 6%, transparent) 47%, transparent 66%)",
                "radial-gradient(circle at 18% 40%, transparent 16%, color-mix(in srgb, var(--color-text-on-primary) 7%, transparent) 17%, transparent 38%)",
              ].join(", "),
            }}
          />

          <div className="relative z-10 flex flex-col gap-0.5 px-6 py-8 md:gap-1 md:px-10 md:py-10 lg:max-w-2xl">
            <Reveal>
              <h2
                className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.125rem] lg:text-[2.5rem]"
                style={{
                  color: "var(--color-text-on-primary)",
                  fontFamily: "var(--font-family-display)",
                }}
              >
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={REVEAL_STEP}>
              <p
                className="text-sm font-medium leading-[1.45] md:text-base lg:text-lg"
                style={{ color: "var(--color-text-on-primary)" }}
              >
                {t("subtitle")}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={REVEAL_IMAGE_DELAY}
            from="right"
            scale
            className="relative z-10 flex h-full min-h-[10rem] items-end justify-end md:min-h-full"
          >
            <Image
              src="/images/landing/banner-arrendamiento-building.webp"
              alt={t("imageAlt")}
              width={634}
              height={241}
              sizes="(max-width: 768px) 90vw, 45vw"
              className="h-auto w-full max-w-md object-contain object-bottom md:max-w-none md:translate-x-2 lg:translate-x-4"
              priority={false}
            />
          </Reveal>
        </Link>
      </div>
    </section>
  );
}
