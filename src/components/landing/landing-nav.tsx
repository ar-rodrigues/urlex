"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Drawer } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/lib/navigation";
import { PRACTICE_AREAS, SERVICE_CARDS } from "@/lib/practice-areas";

const NAV_LINK_ITEMS = [
  { key: "home", href: "/" },
  { key: "facilities", href: "/instalaciones" },
  { key: "trajectory", href: "/trayectoria" },
  { key: "about", href: "/nosotros" },
  { key: "contact", href: "/contacto" },
] as const;

const MOBILE_DRAWER_WIDTH = "min(320px, 85vw)";
const MOBILE_HEADER_OFFSET = "5.5rem";

/** Explicit typography overrides antd reset `button { font-size: inherit; text-transform: none }`. */
const desktopNavTypography: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 500,
  lineHeight: 1.25,
  textTransform: "uppercase",
  letterSpacing: "-0.025em",
};

const mobileNavTypography: CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: 1.25,
  textTransform: "uppercase",
  letterSpacing: "-0.025em",
};

const navLinkClassName = "transition-opacity hover:opacity-80";

const navButtonClassName =
  "flex items-center gap-1 border-0 bg-transparent p-0 m-0 cursor-pointer transition-opacity hover:opacity-80";

const mobileLinkClassName = "transition-opacity hover:opacity-80";

const mobileButtonClassName =
  "flex w-full items-center justify-between border-0 bg-transparent p-0 m-0 text-left cursor-pointer transition-opacity hover:opacity-80";

export function LandingNav() {
  const t = useTranslations("LandingNav");
  const tPractice = useTranslations("PracticeShared");
  const pathname = usePathname();
  const servicesMenuId = useId();
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (servicesContainerRef.current?.contains(target)) {
        return;
      }

      setServicesOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        servicesTriggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  const closeDrawer = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

  const serviceLinks = SERVICE_CARDS.map(({ areaId }) => ({
    areaId,
    href: PRACTICE_AREAS[areaId].href,
    label: tPractice(`areas.${areaId}`),
  }));

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="landing-container flex items-center justify-between gap-4 py-4 md:py-6">
        <Link href="/" className="relative block h-10 w-36 shrink-0 md:h-14 md:w-52">
          <Image
            src="/images/landing/logo.png"
            alt={t("brand")}
            fill
            className="object-contain object-left"
            sizes="208px"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Principal">
          <Link
            href="/"
            className={navLinkClassName}
            style={{ color: "var(--color-text-on-primary)", ...desktopNavTypography }}
          >
            {t("home")}
          </Link>

          <div ref={servicesContainerRef} className="relative">
            <button
              ref={servicesTriggerRef}
              type="button"
              className={navButtonClassName}
              style={{ color: "var(--color-text-on-primary)", ...desktopNavTypography }}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((value) => !value)}
            >
              {t("services")}
              <span aria-hidden className="text-[10px] leading-none">
                ▾
              </span>
            </button>

            <div
              ref={servicesMenuRef}
              id={servicesMenuId}
              className={`absolute left-0 top-full z-50 min-w-[260px] pt-2 ${
                servicesOpen ? "visible" : "invisible pointer-events-none"
              }`}
              role="menu"
              aria-label={t("services")}
              aria-hidden={!servicesOpen}
            >
              <div
                className="overflow-hidden rounded-[var(--radius-card)] border py-2 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                style={{
                  background: "var(--color-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                {serviceLinks.map(({ areaId, href, label }) => (
                  <Link
                    key={areaId}
                    href={href}
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--color-text-muted)" }}
                    onClick={() => setServicesOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINK_ITEMS.slice(1).map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={navLinkClassName}
              style={{ color: "var(--color-text-on-primary)", ...desktopNavTypography }}
            >
              {t(key)}
            </Link>
          ))}

          <Link href="/contacto">
            <Button variant="primary">{t("cta")}</Button>
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          style={{
            color: "var(--color-text-on-primary)",
            border: "1px solid var(--color-text-on-primary-muted)",
          }}
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden className="text-xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      <Drawer
        open={open}
        onClose={closeDrawer}
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
        classNames={{ section: "lg:hidden" }}
      >
        <nav className="flex flex-col gap-5" aria-label="Principal">
          <Link
            href="/"
            className={mobileLinkClassName}
            style={{ color: "var(--color-text-on-primary)", ...mobileNavTypography }}
            onClick={closeDrawer}
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
              onClick={() => setMobileServicesOpen((value) => !value)}
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
                  onClick={closeDrawer}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINK_ITEMS.slice(1).map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={mobileLinkClassName}
              style={{ color: "var(--color-text-on-primary)", ...mobileNavTypography }}
              onClick={closeDrawer}
            >
              {t(key)}
            </Link>
          ))}

          <Link href="/contacto" onClick={closeDrawer} className="mt-2">
            <Button variant="primary" className="w-full">
              {t("cta")}
            </Button>
          </Link>
        </nav>
      </Drawer>
    </header>
  );
}
