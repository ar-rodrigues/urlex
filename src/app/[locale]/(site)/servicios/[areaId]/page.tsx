import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  generatePracticeMetadata,
  PracticePage,
} from "@/components/landing/practice-page";
import { isPracticeAreaId, PRACTICE_AREA_IDS } from "@/lib/practice-areas";

type Props = {
  params: Promise<{ locale: string; areaId: string }>;
};

export function generateStaticParams() {
  return PRACTICE_AREA_IDS.map((areaId) => ({ areaId }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, areaId } = await params;

  if (!isPracticeAreaId(areaId)) {
    return {};
  }

  return generatePracticeMetadata(locale, areaId);
}

export default async function Page({ params }: Props) {
  const { locale, areaId } = await params;
  setRequestLocale(locale);

  if (!isPracticeAreaId(areaId)) {
    notFound();
  }

  return <PracticePage areaId={areaId} />;
}
