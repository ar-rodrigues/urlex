import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/page-metadata";

export const CONTENT_PAGE_NAMESPACES = {
  instalaciones: "Instalaciones",
  trayectoria: "Trayectoria",
  nosotros: "Nosotros",
  contacto: "ContactoPage",
  avisoPrivacidad: "AvisoPrivacidad",
} as const;

export type ContentPageId = keyof typeof CONTENT_PAGE_NAMESPACES;

export async function generateContentMetadata(
  locale: string,
  pageId: ContentPageId,
): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: CONTENT_PAGE_NAMESPACES[pageId],
  });

  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}
