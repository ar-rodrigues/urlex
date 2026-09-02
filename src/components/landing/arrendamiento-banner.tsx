import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function ArrendamientoBanner() {
  const t = await getTranslations("ArrendamientoPage.banner");

  return (
    <section className="w-full py-8 md:py-10" style={{ background: "var(--color-accent)" }}>
      <div className="landing-container flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex max-w-2xl flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--color-primary)" }}
            aria-hidden
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 6V12C4 17.55 7.84 22.74 12 24C16.16 22.74 20 17.55 20 12V6L12 2Z"
                fill="var(--color-accent)"
              />
            </svg>
          </div>
          <p
            className="font-display text-xl font-bold leading-[1.2] tracking-tight md:text-2xl"
            style={{ color: "var(--color-primary)" }}
          >
            {t("title")}
          </p>
        </div>
        <a href="#planes" className="shrink-0">
          <Button variant="onAccent">{t("cta")}</Button>
        </a>
      </div>
    </section>
  );
}
