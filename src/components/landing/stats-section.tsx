import { getTranslations } from "next-intl/server";
import { AnimatedStat } from "@/components/ui/animated-stat";

const STAT_KEYS = ["experience", "areas", "attention", "location"] as const;

export async function StatsSection() {
  const t = await getTranslations("StatsSection");

  return (
    <section id="trayectoria" className="w-full py-8" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {STAT_KEYS.map((key, index) => (
          <AnimatedStat
            key={key}
            value={t(`items.${key}.value`)}
            label={t(`items.${key}.label`)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
