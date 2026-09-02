import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { ARRENDAMIENTO_TRUST_BADGES } from "@/lib/arrendamiento-plans";

const HERO_IMAGE = "/images/nosotros/hero.jpg";

function TrustBadgeIcon({ badgeKey }: { badgeKey: (typeof ARRENDAMIENTO_TRUST_BADGES)[number] }) {
  if (badgeKey === "personalized") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="shrink-0">
        <circle cx="12" cy="8" r="3.5" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 20V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V20" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="shrink-0">
      <path d="M12 2L4 6V12C4 17.55 7.84 22.74 12 24C16.16 22.74 20 17.55 20 12V6L12 2Z" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 12L11.5 14L15 10.5" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

      <div className="landing-container flex flex-col items-stretch gap-8 pb-10 lg:flex-row lg:items-stretch lg:gap-12 lg:pb-0 xl:gap-16">
        <div className="motion-fade-up flex min-w-0 flex-1 flex-col gap-5 lg:gap-6 lg:pb-12">
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

          <ul className="flex flex-nowrap items-center gap-4 md:gap-6">
            {ARRENDAMIENTO_TRUST_BADGES.map((key) => (
              <li key={key} className="flex shrink-0 items-center gap-2">
                <TrustBadgeIcon badgeKey={key} />
                <span
                  className="whitespace-nowrap text-sm font-medium md:text-base"
                  style={{ color: "var(--color-text-on-primary)" }}
                >
                  {t(`badges.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full shrink-0 lg:w-[min(42%,498px)]">
          <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-full lg:min-h-[400px]">
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
      </div>
    </section>
  );
}
