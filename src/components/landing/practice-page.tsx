import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LandingNav } from "@/components/landing/landing-nav";
import { PracticeCta } from "@/components/landing/practice-cta";
import { PracticeHero } from "@/components/landing/practice-hero";
import { PracticeServices } from "@/components/landing/practice-services";
import { SiteFooter } from "@/components/landing/site-footer";
import type { PracticeAreaId } from "@/lib/practice-areas";

type Props = {
  params: Promise<{ locale: string }>;
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

export async function PracticePage({ params, areaId }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LandingNav />
      <main className="flex-1">
        <PracticeHero areaId={areaId} />
        <PracticeServices areaId={areaId} />
        <PracticeCta areaId={areaId} />
      </main>
      <SiteFooter />
    </>
  );
}
