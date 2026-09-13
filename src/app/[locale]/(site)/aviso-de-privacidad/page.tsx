import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AvisoPrivacidadContent } from "@/components/landing/aviso-privacidad-content";
import { generateContentMetadata } from "@/lib/content-pages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateContentMetadata(locale, "avisoPrivacidad");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AvisoPrivacidadContent />;
}
