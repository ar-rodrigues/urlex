import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "/images/arrendamiento/hero.jpg";

export async function ArrendamientoHero() {
  const tPractice = await getTranslations("Practice.arrendamiento");
  const t = await getTranslations("ArrendamientoPage.hero");

  return (
    <section className="w-full" style={{ background: "var(--color-primary)" }}>
      <div className="landing-container py-4 md:py-5">
        <nav
          aria-label="Miga de pan"
          className="flex flex-wrap gap-x-1 text-sm font-semibold md:text-base lg:text-lg"
        >
          <Link
            href="/#inicio"
            className="transition-opacity hover:opacity-80"
            style={{ color: "var(--color-accent)" }}
          >
            {tPractice("breadcrumbHome")}
          </Link>
          <span style={{ color: "var(--color-accent)" }}>/</span>
          <Link
            href="/servicios"
            className="transition-opacity hover:opacity-80"
            style={{ color: "var(--color-accent)" }}
          >
            {tPractice("breadcrumbServices")}
          </Link>
          <span style={{ color: "var(--color-border)" }}>/</span>
          <span style={{ color: "var(--color-border)" }}>
            {tPractice("breadcrumbCurrent")}
          </span>
        </nav>
      </div>

      <div className="landing-container flex flex-col items-stretch gap-8 pb-10 lg:flex-row lg:items-center lg:gap-12 lg:pb-12 xl:gap-16">
        <div className="motion-fade-up flex min-w-0 flex-1 flex-col gap-5 lg:gap-6">
          <h1
            className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-[0.03em] md:text-[2rem] lg:text-[2.25rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {tPractice("title")}
          </h1>
          <p
            className="text-base font-medium leading-[1.45] md:text-lg lg:text-[1.375rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {tPractice("body")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a href="#planes">
              <Button variant="primary">{t("ctaPlans")}</Button>
            </a>
            <a href="#contacto-arrendamiento">
              <Button variant="secondary">{t("ctaAdvice")}</Button>
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[280px] w-full max-w-md shrink-0 overflow-hidden sm:h-[340px] lg:mx-0 lg:h-[464px] lg:w-[min(42%,498px)] lg:max-w-none">
          <Image
            src={HERO_IMAGE}
            alt={tPractice("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 498px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
