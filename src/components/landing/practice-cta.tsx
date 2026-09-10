import { getTranslations } from "next-intl/server";
import { PageCtaBanner } from "@/components/landing/page-cta-banner";
import type { PracticeAreaId } from "@/lib/practice-areas";

type Props = {
  areaId: PracticeAreaId;
};

export async function PracticeCta({ areaId }: Props) {
  const t = await getTranslations(`Practice.${areaId}`);

  return (
    <PageCtaBanner
      title={t("ctaTitle")}
      subtitle={t("ctaSubtitle")}
      buttonLabel={t("ctaButton")}
    />
  );
}
