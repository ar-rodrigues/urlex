import { getTranslations } from "next-intl/server";
import { ProcessStepBadge } from "@/components/landing/process-step-badge";
import { ARRENDAMIENTO_PROCESS_STEPS } from "@/lib/arrendamiento-plans";
import { Reveal, RevealStagger, REVEAL_STEP } from "@/components/ui/reveal";

export async function ArrendamientoProcess() {
  const t = await getTranslations("ArrendamientoPage.process");

  return (
    <section
      className="w-full py-[var(--spacing-section)]"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container flex flex-col items-center gap-10 md:gap-12">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <Reveal>
          <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase leading-none tracking-wider">
            <span
              className="inline-block h-[2px] w-8 shrink-0"
              style={{
                background: "var(--color-accent)",
                transform: "translateY(-0.12em)",
              }}
              aria-hidden
            />
            <span style={{ color: "var(--color-primary)" }}>{t("eyebrow")}</span>
            <span
              className="inline-block h-[2px] w-8 shrink-0"
              style={{
                background: "var(--color-accent)",
                transform: "translateY(-0.12em)",
              }}
              aria-hidden
            />
          </div>
          </Reveal>
          <Reveal delay={REVEAL_STEP}>
          <h2
            className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight md:text-[2.25rem]"
            style={{ color: "var(--color-primary)" }}
          >
            {t("title")}
          </h2>
          </Reveal>
          <Reveal delay={REVEAL_STEP * 2}>
          <p
            className="text-base font-medium leading-[1.4] md:text-[1.375rem]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("body")}
          </p>
          </Reveal>
        </div>

        <RevealStagger
          scale
          className="grid w-full max-w-4xl grid-cols-1 gap-10 md:grid-cols-3 md:items-stretch md:gap-4"
        >
          {ARRENDAMIENTO_PROCESS_STEPS.map(({ key }, index) => (
            <div
              key={key}
              className="relative flex h-full flex-col items-center gap-4 text-center"
            >
              {index < ARRENDAMIENTO_PROCESS_STEPS.length - 1 ? (
                <span
                  className="absolute left-[calc(50%+28px)] top-7 hidden h-px md:block"
                  style={{
                    width: "calc(100% - 56px)",
                    background: "var(--color-border)",
                  }}
                  aria-hidden
                />
              ) : null}

              <ProcessStepBadge index={index} />

              <div className="flex flex-1 flex-col gap-2">
                <h3
                  className="font-display text-lg font-bold md:min-h-[3.25rem] md:text-xl"
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
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
