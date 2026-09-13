import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { Reveal, REVEAL_STEP, REVEAL_IMAGE_DELAY } from "@/components/ui/reveal";

type Props = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export async function PageCtaBanner({ title, subtitle, buttonLabel }: Props) {
  const t = await getTranslations("PageCtaBanner");

  return (
    <section
      className="relative w-full overflow-hidden lg:h-[271px]"
      style={{ background: "var(--color-accent)" }}
      aria-label={title}
    >
      <div className="landing-container relative z-10 flex h-full flex-col items-start justify-center gap-4 py-8 md:gap-5 md:py-10 lg:max-w-none lg:py-0 lg:pr-[42%]">
        <div className="flex w-full max-w-xl flex-col items-start gap-2.5 md:gap-3 lg:max-w-2xl">
          <div className="flex flex-col gap-0.5 md:gap-1">
            <Reveal>
              <h2
                className="font-display text-[1.375rem] font-bold leading-[1.2] tracking-tight md:text-[1.75rem] lg:text-[2rem]"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-family-display)",
                }}
              >
                {title}
              </h2>
            </Reveal>
            <Reveal delay={REVEAL_STEP}>
              <p
                className="text-base font-medium leading-[1.35] md:text-lg lg:text-xl"
                style={{ color: "var(--color-primary)" }}
              >
                {subtitle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={REVEAL_STEP * 2}>
            <Link href="/contacto">
              <Button
                variant="onAccent"
                style={{
                  boxShadow: "0 8px 20px rgba(3, 3, 4, 0.22)",
                }}
              >
                {buttonLabel}
              </Button>
            </Link>
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={REVEAL_IMAGE_DELAY}
        scale
        from="right"
        className="pointer-events-none absolute bottom-0 hidden translate-y-[45%] lg:block"
        style={{
          right: "max(0px, calc((100% - var(--max-width-container)) / 2))",
        }}
      >
        <Image
          src="/images/shared/banner-libreta.webp"
          alt={t("imageAlt")}
          width={900}
          height={699}
          sizes="42vw"
          className="block h-[420px] w-auto max-w-none object-contain object-bottom lg:h-[452px]"
          priority={false}
        />
      </Reveal>
    </section>
  );
}
