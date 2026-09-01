import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";

const SERVICES = [
  { key: "family", icon: "/images/landing/icon-familia.svg", href: "/familiar" },
  { key: "lease", icon: "/images/landing/icon-arrendamiento.svg", href: "/arrendamiento" },
  { key: "commercial", icon: "/images/landing/icon-mercantil.svg", href: "/mercantil" },
  { key: "contracts", icon: "/images/landing/icon-contrato.svg", href: "/contratos" },
  { key: "civil", icon: "/images/landing/icon-civil.svg", href: "/civil" },
  { key: "labor", icon: "/images/landing/icon-laboral.svg", href: "/laboral" },
  { key: "permits", icon: "/images/landing/icon-permisos.svg", href: "/licencias" },
] as const;

export async function ServicesSection() {
  const t = await getTranslations("ServicesSection");

  return (
    <section id="servicios" className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container flex flex-col gap-8">
        <div className="flex max-w-4xl flex-col gap-4">
          <h2
            className="font-display text-[1.75rem] font-bold leading-[1.1] tracking-[0.03em] md:text-[2.25rem]"
            style={{ color: "var(--color-text)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base font-medium leading-[1.45] md:text-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        <div className="-mx-2 flex gap-6 overflow-x-auto px-2 pb-4 pt-2 [scrollbar-width:thin]">
          {SERVICES.map(({ key, icon, href }) => (
            <article
              key={key}
              className="flex w-[280px] shrink-0 flex-col gap-7 rounded-[var(--radius-card)] bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] md:w-[293px]"
            >
              <div
                className="flex h-11 w-12 items-center justify-center rounded-md"
                style={{ background: "var(--color-primary)" }}
              >
                <Image src={icon} alt="" width={28} height={28} className="h-7 w-auto" />
              </div>
              <div className="flex flex-col gap-2">
                <h3
                  className="text-xl font-semibold leading-tight tracking-tight md:text-2xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-base leading-[25px]" style={{ color: "var(--color-text-muted)" }}>
                  {t(`items.${key}.description`)}
                </p>
              </div>
              <Link href={href} className="mt-auto">
                <Button variant="primary" className="w-full">
                  {t("cta")}
                </Button>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
