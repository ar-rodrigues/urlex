import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function ArrendamientoBanner() {
  const t = await getTranslations("ArrendamientoPage.banner");

  return (
    <section
      className="w-full py-8 md:py-10"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container">
        <div
          className="flex flex-col items-center gap-2 px-6 py-6 text-center md:gap-3 md:px-10 md:py-7"
          style={{
            background: "var(--color-accent)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <p
            className="max-w-2xl font-display text-2xl font-bold leading-[1.2] tracking-tight md:text-3xl"
            style={{ color: "var(--color-primary)" }}
          >
            {t("title")}
          </p>
          <a href="#planes" className="shrink-0">
            <Button
              variant="onAccent"
              size="large"
              style={{
                height: 52,
                paddingInline: 40,
                fontSize: "1.0625rem",
              }}
            >
              {t("cta")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
