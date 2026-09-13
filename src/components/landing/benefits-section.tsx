import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal, RevealStagger } from "@/components/ui/reveal";

const BENEFITS = [
  { key: "trajectory", icon: "/images/landing/icon-trayectoria.svg" },
  { key: "preventive", icon: "/images/landing/icon-preventiva.svg" },
  { key: "personalized", icon: "/images/landing/icon-atencion.svg" },
  { key: "integral", icon: "/images/landing/icon-integral.svg" },
] as const;

export async function BenefitsSection() {
  const t = await getTranslations("BenefitsSection");

  return (
    <section
      id="instalaciones"
      className="landing-section w-full"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="landing-container flex flex-col items-center gap-10 md:gap-12">
        <Reveal>
          <h2
            className="font-display text-center text-[1.75rem] font-bold leading-[1.1] tracking-[0.03em] md:text-[2.25rem]"
            style={{ color: "var(--color-text)" }}
          >
            {t("title")}
          </h2>
        </Reveal>

        <RevealStagger
          stagger={0.12}
          scale
          className="grid w-full max-w-[1096px] grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {BENEFITS.map(({ key, icon }) => (
            <div
              key={key}
              className="flex h-full flex-col gap-2 rounded-2xl border border-black/10 bg-white p-8 shadow-[0_4px_8px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-12 shrink-0 items-center justify-center rounded-md"
                  style={{ background: "var(--color-primary)" }}
                >
                  <Image src={icon} alt="" width={28} height={28} className="h-7 w-7" />
                </div>
                <h3
                  className="font-display text-xl leading-tight md:text-[1.75rem]"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t(`items.${key}.title`)}
                </h3>
              </div>
              <p
                className="text-base font-medium leading-[1.4] md:text-[1.375rem]"
                style={{ color: "var(--color-text)" }}
              >
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
