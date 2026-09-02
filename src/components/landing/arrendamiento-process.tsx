import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ARRENDAMIENTO_PROCESS_STEPS } from "@/lib/arrendamiento-plans";

export async function ArrendamientoProcess() {
  const t = await getTranslations("ArrendamientoPage.process");

  return (
    <section
      className="relative w-full py-[var(--spacing-section)]"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-1"
        style={{ background: "var(--color-accent)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 top-0 w-1"
        style={{ background: "var(--color-accent)" }}
        aria-hidden
      />

      <div className="landing-container flex flex-col items-center gap-10 md:gap-12">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-accent)" }}
          >
            {t("eyebrow")}
          </p>
          <h2
            className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2.25rem]"
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

        <ol className="grid w-full max-w-4xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-4">
          {ARRENDAMIENTO_PROCESS_STEPS.map(({ key, icon }, index) => (
            <li key={key} className="relative flex flex-col items-center gap-4 text-center">
              {index < ARRENDAMIENTO_PROCESS_STEPS.length - 1 ? (
                <span
                  className="absolute left-[calc(50%+36px)] top-7 hidden h-px md:block"
                  style={{
                    width: "calc(100% - 72px)",
                    background: "var(--color-border)",
                  }}
                  aria-hidden
                />
              ) : null}

              <div className="relative flex flex-col items-center">
                <span
                  className="absolute -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-md"
                  style={{ background: "var(--color-primary)" }}
                >
                  <Image src={icon} alt="" width={32} height={32} className="h-8 w-auto" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="font-display text-lg font-bold md:text-xl"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`steps.${key}.title`)}
                </h3>
                <p
                  className="text-base font-medium leading-[1.4]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t(`steps.${key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
