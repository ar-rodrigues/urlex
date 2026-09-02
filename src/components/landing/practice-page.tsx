import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrendamientoPage } from "@/components/landing/arrendamiento-page";
import { PracticeCta } from "@/components/landing/practice-cta";
import { PracticeHero } from "@/components/landing/practice-hero";
import { PracticeServices } from "@/components/landing/practice-services";
import type { PracticeAreaId } from "@/lib/practice-areas";
import { PRACTICE_AREAS } from "@/lib/practice-areas";

type Props = {
  areaId: PracticeAreaId;
};

export async function generatePracticeMetadata(
  locale: string,
  areaId: PracticeAreaId,
): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: `Practice.${areaId}`,
  });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export function PracticePage({ areaId }: Props) {
  const area = PRACTICE_AREAS[areaId];

  if (area.layoutVariant === "extended") {
    return <ArrendamientoPage />;
  }

  return (
    <>
      <PracticeHero areaId={areaId} />
      <PracticeServices areaId={areaId} />
      <PracticeCta areaId={areaId} />
    </>
  );
}
