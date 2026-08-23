import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function AboutSection() {
  const t = await getTranslations("AboutSection");

  return (
    <section id="nosotros" className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <h2
            className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-[0.03em] md:text-[2rem] lg:text-[2.25rem]"
            style={{ color: "var(--color-text)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base font-medium leading-[1.45] md:text-lg lg:text-[1.375rem]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("body")}
          </p>
          <blockquote
            className="relative overflow-hidden py-5 pl-8 pr-4"
            style={{ background: "var(--color-bg-quote)" }}
          >
            <span
              className="absolute bottom-0 left-0 top-0 w-3.5"
              style={{ background: "var(--color-primary)" }}
              aria-hidden
            />
            <p
              className="font-display text-lg italic leading-snug md:text-xl"
              style={{ color: "var(--color-primary)" }}
            >
              {t("quote")}
            </p>
          </blockquote>
        </div>

        <div className="relative mx-auto h-[240px] w-full max-w-md shrink-0 overflow-hidden sm:h-[280px] lg:mx-0 lg:h-[268px] lg:w-[min(38%,400px)] lg:max-w-none">
          <Image
            src="/images/landing/about.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 400px"
          />
        </div>
      </div>
    </section>
  );
}
