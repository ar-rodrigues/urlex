"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "services", href: "/#servicios" },
  { key: "facilities", href: "/instalaciones" },
  { key: "trajectory", href: "/trayectoria" },
  { key: "about", href: "/nosotros" },
  { key: "contact", href: "/contacto" },
] as const;

export function LandingNav() {
  const t = useTranslations("LandingNav");
  const [open, setOpen] = useState(false);

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

      {open ? (
        <div className="landing-container flex flex-col gap-4 pb-6 lg:hidden">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium uppercase"
              style={{ color: "var(--color-text-on-primary)" }}
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <Link href="/contacto" onClick={() => setOpen(false)}>
            <Button variant="primary" className="w-full">
              {t("cta")}
            </Button>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
