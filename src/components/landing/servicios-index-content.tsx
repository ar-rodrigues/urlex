import { getTranslations } from "next-intl/server";
import { ContentPageHero } from "@/components/landing/content-page-hero";
import { ServiceCardsGrid } from "@/components/landing/service-cards-grid";

export async function ServiciosIndexContent() {
  const t = await getTranslations("ServiciosPage");

  return (
    <>
      <ContentPageHero
        breadcrumbCurrent={t("breadcrumbCurrent")}
        variant="below"
        title={t("title")}
        body={t("body")}
      />

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-8">
          <ServiceCardsGrid translationNamespace="ServiciosPage" layout="grid" />
        </div>
      </section>
    </>
  );
}
