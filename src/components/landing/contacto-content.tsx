import { getTranslations } from "next-intl/server";
import { ContactSection } from "@/components/landing/contact-section";
import { PageBreadcrumb } from "@/components/landing/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";

export async function ContactoContent() {
  const t = await getTranslations("ContactoPage");
  const tInst = await getTranslations("Instalaciones");

  return (
    <>
      <section className="w-full" style={{ background: "var(--color-primary)" }}>
        <PageBreadcrumb current={t("breadcrumbCurrent")} />
      </section>

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

      <ContactSection
        hideTitle
        submitLabel={t("submit")}
        privacyNote={t("privacyNote")}
      />

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container grid grid-cols-1 gap-8 lg:grid-cols-[343px_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col gap-8">
            <div
              className="rounded-[var(--radius-card)] border p-4"
              style={{
                background: "var(--color-bg-muted)",
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <h2
                className="mb-3 text-lg font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                {tInst("contactTitle")}
              </h2>
              <div
                className="flex flex-col gap-2 text-base"
                style={{ color: "var(--color-primary)" }}
              >
                <p>
                  {tInst("addressLine1")}
                  <br />
                  {tInst("addressLine2")}
                  <br />
                  {tInst("addressLine3")}
                </p>
                <p>
                  {tInst("scheduleLabel")} {tInst("scheduleValue")}
                </p>
                <p>
                  {tInst("phoneLabel")} {tInst("phoneValue")}
                </p>
                <p>
                  {tInst("whatsappLabel")} {tInst("whatsappValue")}
                </p>
                <p>
                  {tInst("emailLabel")} {tInst("emailValue")}
                </p>
              </div>
            </div>

            <div
              className="flex flex-col items-center gap-4 rounded-lg p-4 text-center"
              style={{ background: "var(--color-primary)" }}
            >
              <p
                className="text-lg font-medium leading-[1.4] md:text-[1.375rem]"
                style={{ color: "var(--color-border)" }}
              >
                {tInst("sidebarCta")}
              </p>
              <Link href="/contacto">
                <Button variant="muted">{tInst("sidebarCtaButton")}</Button>
              </Link>
            </div>
          </div>

          <div
            className="flex min-h-[320px] items-center justify-center rounded-lg"
            style={{ background: "var(--color-bg-muted)" }}
            role="img"
            aria-label={tInst("mapTitle")}
          >
            <p className="px-6 text-center" style={{ color: "var(--color-text-muted)" }}>
              {tInst("mapTitle")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
