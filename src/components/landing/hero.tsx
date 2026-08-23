import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section id="inicio" className="w-full" style={{ background: "var(--color-primary)" }}>
      <div className="landing-container flex flex-col items-stretch gap-8 py-10 lg:flex-row lg:items-center lg:gap-12 lg:py-12 xl:gap-16">
        <div className="motion-fade-up flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
          <h1
            className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.125rem] lg:text-[2.5rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("titleBefore")}{" "}
            <span style={{ color: "var(--color-accent)" }}>{t("titleHighlight")}</span>{" "}
            {t("titleAfter")}
          </h1>
          <p
            className="text-base font-medium leading-[1.45] md:text-lg lg:text-[1.375rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("subtitle")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#contacto">
              <Button variant="primary">{t("ctaPrimary")}</Button>
            </a>
            <a href="#servicios">
              <Button variant="secondary">{t("ctaSecondary")}</Button>
            </a>
          </div>
          <p className="text-sm md:text-base" style={{ color: "var(--color-text-on-primary-muted)" }}>
            {t("meta")}
          </p>
        </div>

        <div className="relative mx-auto h-[280px] w-full max-w-md shrink-0 overflow-hidden sm:h-[340px] lg:mx-0 lg:h-[464px] lg:w-[min(38%,400px)] lg:max-w-none">
          <Image
            src="/images/landing/hero.jpg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 400px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
