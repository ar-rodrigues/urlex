"use client";

import { useEffect, useState } from "react";
import { Drawer } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/lib/navigation";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/#servicios" },
  { key: "facilities", href: "/instalaciones" },
  { key: "trajectory", href: "/trayectoria" },
  { key: "about", href: "/nosotros" },
  { key: "contact", href: "/contacto" },
] as const;

const MOBILE_DRAWER_WIDTH = "min(320px, 85vw)";

export function LandingNav() {
  const t = useTranslations("LandingNav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-xs font-medium uppercase tracking-tight transition-opacity hover:opacity-80"
              style={{ color: "var(--color-text-on-primary)" }}
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
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="text-xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="right"
        size={MOBILE_DRAWER_WIDTH}
        zIndex={40}
        closable={false}
        destroyOnHidden
        mask={{ closable: true }}
        styles={{
          mask: { background: "rgba(3, 3, 4, 0.45)" },
          body: {
            padding: "var(--spacing-container)",
            paddingTop: "calc(var(--spacing-container) + 0.5rem)",
            background: "var(--color-primary)",
          },
        }}
        classNames={{ section: "lg:hidden" }}
      >
        <nav className="flex flex-col gap-5" aria-label="Principal">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium uppercase tracking-tight transition-opacity hover:opacity-80"
              style={{ color: "var(--color-text-on-primary)" }}
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <Link href="/contacto" onClick={() => setOpen(false)} className="mt-2">
            <Button variant="primary" className="w-full">
              {t("cta")}
            </Button>
          </Link>
        </nav>
      </Drawer>
    </header>
  );
}
