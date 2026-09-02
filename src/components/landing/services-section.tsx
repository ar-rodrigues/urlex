import { getTranslations } from "next-intl/server";
import { ServiceCardsCarousel } from "@/components/landing/service-cards-carousel";

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

        <ServiceCardsCarousel />
      </div>
    </section>
  );
}
