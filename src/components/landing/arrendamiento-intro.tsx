import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { ARRENDAMIENTO_INTRO_FEATURES } from "@/lib/arrendamiento-plans";

export async function ArrendamientoIntro() {
  const t = await getTranslations("ArrendamientoPage.intro");

  return (
    <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-5 lg:max-w-md">
          <div className="flex w-fit flex-col items-center gap-1.5">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-primary)" }}
            >
              {t("eyebrow")}
            </p>
            <span
              className="block h-[3px] w-8"
              style={{ background: "var(--color-accent)" }}
              aria-hidden
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h2
                className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2rem]"
                style={{ color: "var(--color-primary)" }}
              >
                {t("title")}
              </h2>
              <p
                className="text-base font-medium leading-[1.4] md:text-[1.375rem]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("body")}
              </p>
            </div>

            <a href="#planes" className="w-fit">
              <Button
                variant="onAccent"
                style={{ height: 52, paddingInline: 40, fontSize: "1.0625rem" }}
              >
                {t("cta")}
              </Button>
            </a>
          </div>
        </div>

        <ul className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 lg:gap-5">
          {ARRENDAMIENTO_INTRO_FEATURES.map(({ key, icon }) => (
            <li
              key={key}
              className="flex h-full items-start gap-4 rounded-2xl border bg-white px-4 pb-6 pt-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="flex h-11 w-12 shrink-0 items-center justify-center rounded-md"
                style={{ background: "var(--color-primary)" }}
              >
                <Image src={icon} alt="" width={28} height={28} className="h-7 w-7" />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <h3
                  className="font-display text-lg leading-tight md:text-xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`features.${key}.title`)}
                </h3>
                <p
                  className="text-sm font-medium leading-[1.4] md:text-base"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t(`features.${key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
