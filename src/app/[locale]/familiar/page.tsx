import type { Metadata } from "next";
import {
  generatePracticeMetadata,
  PracticePage,
} from "@/components/landing/practice-page";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePracticeMetadata(locale, "familiar");
}

export default async function Page({ params }: Props) {
  return <PracticePage params={params} areaId="familiar" />;
}
