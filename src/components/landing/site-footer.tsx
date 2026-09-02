import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact-info";
import { Link } from "@/lib/navigation";
import { PRACTICE_AREAS, PRACTICE_AREA_IDS } from "@/lib/practice-areas";

export async function SiteFooter() {
  const t = await getTranslations("SiteFooter");
  const tShared = await getTranslations("PracticeShared");
  const year = new Date().getFullYear();

  const serviceLinks = PRACTICE_AREA_IDS.map((id) => ({
    href: PRACTICE_AREAS[id].href,
    label: tShared(`areas.${id}`),
  }));

  const navLinks = [
    { href: "/", label: t("linkHome") },
    { href: "/nosotros", label: t("linkAbout") },
    { href: "/trayectoria", label: t("linkTrajectory") },
    { href: "/instalaciones", label: t("linkFacilities") },
    { href: "/contacto", label: t("linkContact") },
  ];

  const social = [
    { src: "/images/landing/social-1.svg", label: t("socialInstagram") },
    { src: "/images/landing/social-2.svg", label: t("socialLinkedin") },
    { src: "/images/landing/social-3.svg", label: t("socialX") },
  ];

  return (
    <footer className="w-full" style={{ background: "var(--color-primary)" }}>
      <div className="landing-container grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/images/landing/icon-footer.svg"
            alt={t("brand")}
            width={57}
            height={45}
            className="h-[45px] w-auto"
            sizes="57px"
          />
          <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-on-primary)" }}>
            {t("tagline")}
          </p>
          <p
            className="font-display text-sm italic md:text-base"
            style={{ color: "var(--color-text-on-primary-muted)" }}
          >
            {t("quote")}
          </p>
          <div className="flex gap-4 pt-2">
            {social.map((item) => (
              <a
                key={item.label}
                href="#"
                aria-label={item.label}
                className="flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-80"
              >
                <Image
                  src={item.src}
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] brightness-0 invert"
                />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-accent)" }}
          >
            {t("servicesTitle")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-on-primary)" }}>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:opacity-80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-accent)" }}
          >
            {t("navTitle")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-on-primary)" }}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:opacity-80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3
            className="mb-4 text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-accent)" }}
          >
            {t("contactTitle")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed" style={{ color: "var(--color-text-on-primary)" }}>
            <li>
              {t("addressLine1")}
              <br />
              {t("addressLine2")}
              <br />
              {t("addressLine3")}
            </li>
            <li>
              {t("scheduleLabel")} {t("scheduleValue")}
            </li>
            <li>
              {t("whatsappLabel")}{" "}
              <a
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                {t("whatsappValue")}
              </a>
            </li>
            <li>
              {t("emailLabel")}{" "}
              <a href={`mailto:${t("emailValue")}`} className="hover:opacity-80">
                {t("emailValue")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="landing-container flex flex-col gap-2 border-t py-6 text-sm md:flex-row md:items-center md:justify-between"
        style={{
          borderColor: "rgba(255,255,255,0.15)",
          color: "var(--color-text-on-primary-muted)",
        }}
      >
        <p>{t("copyright", { year })}</p>
        <a href="#" className="hover:opacity-80" style={{ color: "var(--color-text-on-primary)" }}>
          {t("privacy")}
        </a>
      </div>
    </footer>
  );
}
