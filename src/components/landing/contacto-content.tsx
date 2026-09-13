import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/landing/contact-section";
import { ContactSidebar } from "@/components/landing/contact-sidebar";
import { ContentPageHero } from "@/components/landing/content-page-hero";

export async function ContactoContent() {
  const t = await getTranslations("ContactoPage");

  return (
    <>
      <ContentPageHero
        breadcrumbCurrent={t("breadcrumbCurrent")}
        variant="breadcrumb-only"
      />

      <section className="w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container flex flex-col gap-4 py-10 md:py-12">
          <h1
            className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
            style={{ color: "var(--color-text)" }}
          >
            {t("title")}
          </h1>
          <p
            className="max-w-4xl text-base font-medium leading-[1.4] md:text-[1.375rem]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("body")}
          </p>
        </div>
      </section>

      <ContactSection hideTitle submitLabel={t("submit")} />

      <ContactSidebar />
    </>
  );
}
