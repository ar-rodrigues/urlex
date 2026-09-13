"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/lib/navigation";
import { PRACTICE_AREAS, SERVICE_CARDS } from "@/lib/practice-areas";

const MobileNavDrawer = dynamic(
  () =>
    import("@/components/landing/mobile-nav-drawer").then(
      (mod) => mod.MobileNavDrawer,
    ),
  { ssr: false },
);

const NAV_LINK_ITEMS = [
  { key: "home", href: "/" },
  { key: "facilities", href: "/instalaciones" },
  { key: "trajectory", href: "/trayectoria" },
  { key: "about", href: "/nosotros" },
  { key: "contact", href: "/contacto" },
] as const;

/** Explicit typography for nav controls (native buttons inherit body font otherwise). */
const desktopNavTypography: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 500,
  lineHeight: 1.25,
  textTransform: "uppercase",
  letterSpacing: "-0.025em",
};

const navLinkClassName = "transition-opacity hover:opacity-80";

const navButtonClassName =
  "flex items-center gap-1 border-0 bg-transparent p-0 m-0 cursor-pointer transition-opacity hover:opacity-80";

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
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 w-full"
        style={{
          background: "var(--color-primary)",
          boxShadow: "0 1px 0 0 var(--color-primary)",
        }}
      >
        <div className="landing-container flex items-center justify-between gap-4 py-4 md:py-6">
          <Link
            href="/"
            className="relative block h-12 w-44 shrink-0 md:h-16 md:w-56 xl:h-20 xl:w-72"
          >
            <Image
              src="/images/landing/logo.png"
              alt={t("brand")}
              fill
              className="object-contain object-left"
              sizes="(min-width: 1280px) 288px, (min-width: 768px) 224px, 176px"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-5 xl:flex 2xl:gap-7"
            aria-label="Principal"
          >
            <Link
              href="/"
              className={navLinkClassName}
              style={{
                color: "var(--color-text-on-primary)",
                ...desktopNavTypography,
              }}
            >
              {t("home")}
            </Link>

            <div ref={servicesContainerRef} className="relative">
              <button
                ref={servicesTriggerRef}
                type="button"
                className={navButtonClassName}
                style={{
                  color: "var(--color-text-on-primary)",
                  ...desktopNavTypography,
                }}
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

            <Link
              href={PRACTICE_AREAS.arrendamiento.href}
              className={navLinkClassName}
              style={{
                color: "var(--color-text-on-primary)",
                ...desktopNavTypography,
              }}
            >
              {t("lease")}
            </Link>

            {NAV_LINK_ITEMS.slice(1).map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={navLinkClassName}
                style={{
                  color: "var(--color-text-on-primary)",
                  ...desktopNavTypography,
                }}
              >
                {t(key)}
              </Link>
            ))}

            <Link href="/contacto" className="shrink-0">
              <Button variant="primary" className="whitespace-nowrap">
                {t("cta")}
              </Button>
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg xl:hidden"
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

        {open ? (
          <MobileNavDrawer
            open={open}
            onClose={closeDrawer}
            servicesMenuId={servicesMenuId}
            mobileServicesOpen={mobileServicesOpen}
            onToggleMobileServices={() =>
              setMobileServicesOpen((value) => !value)
            }
            serviceLinks={serviceLinks}
            navLinkItems={NAV_LINK_ITEMS.slice(1)}
          />
        ) : null}
      </header>
      {/* Matches header height so page content is not covered by position:fixed */}
      <div
        aria-hidden
        className="h-[5rem] shrink-0 md:h-[7rem] xl:h-[8rem]"
      />
    </>
  );
}
