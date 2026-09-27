import { getTranslations } from "next-intl/server";
import { ContactSidebar } from "@/components/landing/contact-sidebar";
import { ContentPageHero } from "@/components/landing/content-page-hero";
import { InstalacionesCarousel } from "@/components/landing/instalaciones-carousel";
import { Reveal } from "@/components/ui/reveal";

export async function InstalacionesContent() {
  const t = await getTranslations("Instalaciones");

  return (
    <>
      <ContentPageHero
        breadcrumbCurrent={t("breadcrumbCurrent")}
        variant="below"
        imageSrc="/images/instalaciones/hero.jpg"
        imageAlt={t("imageAlt")}
        title={t("title")}
        body={t("body")}
      />

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container">
          <Reveal>
            <InstalacionesCarousel />
          </Reveal>
        </div>
      </section>

      <ContactSidebar />
    </>
  );
}
