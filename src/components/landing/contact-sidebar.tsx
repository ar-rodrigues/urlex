import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  CONTACT_MAP_EMBED_URL,
  CONTACT_MAP_EXTERNAL_URL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact-info";
import { Link } from "@/lib/navigation";

export async function ContactSidebar() {
  const t = await getTranslations("Instalaciones");

  return (
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
                {t("whatsappLabel")}{" "}
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  {t("whatsappValue")}
                </a>
              </p>
              <p>
                {t("emailLabel")}{" "}
                <a href={`mailto:${t("emailValue")}`} className="hover:opacity-80">
                  {t("emailValue")}
                </a>
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
          className="relative min-h-[320px] overflow-hidden rounded-lg lg:min-h-full"
          style={{ background: "var(--color-bg-muted)" }}
        >
          <iframe
            title={t("mapTitle")}
            src={CONTACT_MAP_EMBED_URL}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={CONTACT_MAP_EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sr-only"
          >
            {t("mapOpenExternal")}
          </a>
        </div>
      </div>
    </section>
  );
}
