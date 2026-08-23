import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import type { PracticeAreaId } from "@/lib/practice-areas";

type Props = {
  areaId: PracticeAreaId;
};

export async function PracticeCta({ areaId }: Props) {
  const t = await getTranslations(`Practice.${areaId}`);

  return (
    <section
      className="w-full py-9 md:py-12"
      style={{ background: "var(--color-accent)" }}
    >
      <div className="landing-container flex flex-col items-center gap-6 text-center">
        <div
          className="flex h-[60px] w-16 items-center justify-center overflow-hidden rounded-md border bg-white"
          style={{ borderColor: "var(--color-accent)" }}
        >
          <Image
            src="/images/shared/icon-question.svg"
            alt=""
            width={45}
            height={45}
          />
        </div>

        <div className="flex max-w-4xl flex-col gap-1">
          <h2
            className="font-display text-[1.5rem] font-semibold leading-normal md:text-[1.75rem]"
            style={{ color: "var(--color-bg-muted)" }}
          >
            {t("ctaTitle")}
          </h2>
          <p
            className="text-lg font-semibold leading-[1.15] tracking-tight md:text-2xl"
            style={{ color: "var(--color-bg-muted)" }}
          >
            {t("ctaSubtitle")}
          </p>
        </div>

        <Link href="/contacto">
          <Button variant="onAccent">{t("ctaButton")}</Button>
        </Link>
      </div>
    </section>
  );
}
