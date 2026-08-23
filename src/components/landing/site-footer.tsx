import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";

export async function SiteFooter() {
  const t = await getTranslations("SiteFooter");
  const year = new Date().getFullYear();

  const serviceLinks = [
    { href: "/familiar", label: t("linkFamily") },
    { href: "/mercantil", label: t("linkCommercial") },
    { href: "/arrendamiento", label: t("linkLease") },
    { href: "/contratos", label: t("linkContracts") },
    { href: "/civil", label: t("linkCivil") },
    { href: "/laboral", label: t("linkLabor") },
    { href: "/licencias", label: t("linkPermits") },
  ];

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
        <div className="flex flex-col gap-4">
          <div className="relative h-12 w-40">
            <Image
              src="/images/landing/logo.png"
              alt={t("brand")}
              fill
              className="object-contain object-left"
              sizes="160px"
            />
          </div>
          <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--color-text-on-primary)" }}>
            {t("tagline")}
          </p>
          <p
            className="font-display text-sm italic md:text-base"
            style={{ color: "var(--color-text-on-primary-muted)" }}
          >
            {t("quote")}
          </p>
          <div className="flex gap-3 pt-2">
            {social.map((item) => (
              <a
                key={item.label}
                href="#"
                aria-label={item.label}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ background: "var(--color-accent)" }}
              >
                <Image src={item.src} alt="" width={18} height={18} />
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
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "var(--color-text-on-primary)" }}>
            <li>{t("address")}</li>
            <li>{t("phone")}</li>
            <li>{t("email")}</li>
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
