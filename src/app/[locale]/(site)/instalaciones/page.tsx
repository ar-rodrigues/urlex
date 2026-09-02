import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { InstalacionesContent } from "@/components/landing/instalaciones-content";
import { generateContentMetadata } from "@/lib/content-pages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateContentMetadata(locale, "instalaciones");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InstalacionesContent />;
}
