"use client";

import { Drawer } from "antd";
import { useTranslations } from "next-intl";
import { AntdProvider } from "@/components/providers/antd-provider";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { PRACTICE_AREAS } from "@/lib/practice-areas";

const MOBILE_DRAWER_WIDTH = "min(320px, 85vw)";
const MOBILE_HEADER_OFFSET = "5rem";

const mobileNavTypography = {
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: 1.25,
  textTransform: "uppercase" as const,
  letterSpacing: "-0.025em",
};

const mobileLinkClassName = "transition-opacity hover:opacity-80";

const mobileButtonClassName =
  "flex w-full items-center justify-between border-0 bg-transparent p-0 m-0 text-left cursor-pointer transition-opacity hover:opacity-80";

type ServiceLink = {
  areaId: string;
  href: string;
  label: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  servicesMenuId: string;
  mobileServicesOpen: boolean;
  onToggleMobileServices: () => void;
  serviceLinks: ServiceLink[];
  navLinkItems: ReadonlyArray<{ key: string; href: string }>;
};

export function MobileNavDrawer({
  open,
  onClose,
  servicesMenuId,
  mobileServicesOpen,
  onToggleMobileServices,
  serviceLinks,
  navLinkItems,
}: Props) {
  const t = useTranslations("LandingNav");

  return (
    <AntdProvider>
      <Drawer
        open={open}
        onClose={onClose}
        placement="right"
        size={MOBILE_DRAWER_WIDTH}
        zIndex={40}
        closable={false}
        destroyOnHidden
        mask={{ closable: true }}
        styles={{
          mask: { background: "rgba(3, 3, 4, 0.45)" },
          body: {
            paddingInline: "var(--spacing-container)",
            paddingBottom: "var(--spacing-container)",
            paddingTop: `calc(${MOBILE_HEADER_OFFSET} + var(--spacing-container))`,
            background: "var(--color-primary)",
            overflowY: "auto",
          },
        }}
        classNames={{ section: "xl:hidden" }}
      >
        <nav className="flex flex-col gap-5" aria-label="Principal">
          <Link
            href="/"
            className={mobileLinkClassName}
            style={{ color: "var(--color-text-on-primary)", ...mobileNavTypography }}
            onClick={onClose}
          >
            {t("home")}
          </Link>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className={mobileButtonClassName}
              style={{ color: "var(--color-text-on-primary)", ...mobileNavTypography }}
              aria-expanded={mobileServicesOpen}
              aria-controls={`${servicesMenuId}-mobile`}
              aria-label={mobileServicesOpen ? t("collapseServices") : t("expandServices")}
              onClick={onToggleMobileServices}
            >
              {t("services")}
              <span aria-hidden className="text-base leading-none">
                {mobileServicesOpen ? "−" : "+"}
              </span>
            </button>

            <div
              id={`${servicesMenuId}-mobile`}
              className={`flex flex-col gap-2 pl-3 ${
                mobileServicesOpen ? "visible" : "hidden"
              }`}
              aria-hidden={!mobileServicesOpen}
            >
              {serviceLinks.map(({ areaId, href, label }) => (
                <Link
                  key={areaId}
                  href={href}
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: "var(--color-text-on-primary-muted)" }}
                  onClick={onClose}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href={PRACTICE_AREAS.arrendamiento.href}
            className={mobileLinkClassName}
            style={{ color: "var(--color-text-on-primary)", ...mobileNavTypography }}
            onClick={onClose}
          >
            {t("lease")}
          </Link>

          {navLinkItems.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={mobileLinkClassName}
              style={{ color: "var(--color-text-on-primary)", ...mobileNavTypography }}
              onClick={onClose}
            >
              {t(key as "facilities" | "trajectory" | "about" | "contact")}
            </Link>
          ))}

          <Link href="/contacto" onClick={onClose} className="mt-2">
            <Button variant="primary" className="w-full">
              {t("cta")}
            </Button>
          </Link>
        </nav>
      </Drawer>
    </AntdProvider>
  );
}
