import { getTranslations } from "next-intl/server";

const STAT_KEYS = ["experience", "areas", "attention", "location"] as const;

export async function StatsSection() {
  const t = await getTranslations("StatsSection");

  return (
    <section id="trayectoria" className="w-full py-8" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {STAT_KEYS.map((key) => (
          <div key={key} className="flex flex-col gap-2 p-4 text-center md:text-left">
            <p
              className="font-display text-3xl font-bold tracking-[0.03em] md:text-[2.5rem]"
              style={{ color: "var(--color-primary)" }}
            >
              {t(`items.${key}.value`)}
            </p>
            <p
              className="text-sm uppercase tracking-wide md:text-base"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t(`items.${key}.label`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
