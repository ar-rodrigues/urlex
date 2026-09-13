import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactSidebar } from "@/components/landing/contact-sidebar";
import { ContentPageHero } from "@/components/landing/content-page-hero";
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
            <div
              className="flex h-[280px] items-center justify-center rounded-lg md:h-[420px]"
              style={{ background: "var(--color-bg-muted)" }}
              role="img"
              aria-label={t("galleryAlt")}
            >
              <Image
                src="/images/instalaciones/hero.jpg"
                alt={t("galleryAlt")}
                width={1147}
                height={533}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSidebar />
    </>
  );
}
