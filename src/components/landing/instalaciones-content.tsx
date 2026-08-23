import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/landing/page-breadcrumb";
import { Link } from "@/lib/navigation";

export async function InstalacionesContent() {
  const t = await getTranslations("Instalaciones");

  return (
    <>
      <section className="w-full" style={{ background: "var(--color-primary)" }}>
        <PageBreadcrumb current={t("breadcrumbCurrent")} />
        <div className="landing-container pb-0">
          <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] lg:h-[420px]">
            <Image
              src="/images/instalaciones/hero.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="landing-container flex flex-col gap-6 py-10 md:py-12">
          <h1
            className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("title")}
          </h1>
          <p
            className="max-w-4xl text-base font-medium leading-[1.4] md:text-[1.375rem]"
            style={{ color: "var(--color-text-on-primary)" }}
          >
            {t("body")}
          </p>
        </div>
      </section>

      <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
        <div className="landing-container">
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
        </div>
      </section>

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
                {t("contactTitle")}
              </h2>
              <div
                className="flex flex-col gap-2 text-base"
                style={{ color: "var(--color-primary)" }}
              >
                <p>
                  {t("addressLine1")}
                  <br />
                  {t("addressLine2")}
                  <br />
                  {t("addressLine3")}
                </p>
                <p>
                  {t("scheduleLabel")} {t("scheduleValue")}
                </p>
                <p>
                  {t("phoneLabel")} {t("phoneValue")}
                </p>
                <p>
                  {t("whatsappLabel")} {t("whatsappValue")}
                </p>
                <p>
                  {t("emailLabel")} {t("emailValue")}
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
                {t("sidebarCta")}
              </p>
              <Link href="/contacto">
                <Button variant="muted">{t("sidebarCtaButton")}</Button>
              </Link>
            </div>
          </div>

          <div
            className="flex min-h-[320px] items-center justify-center rounded-lg"
            style={{ background: "var(--color-bg-muted)" }}
            role="img"
            aria-label={t("mapTitle")}
          >
            <p className="px-6 text-center" style={{ color: "var(--color-text-muted)" }}>
              {t("mapTitle")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
