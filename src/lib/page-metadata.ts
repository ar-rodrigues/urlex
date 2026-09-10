import type { Metadata } from "next";

/** Shared social preview image (WhatsApp, Facebook, X). Lives in /public. */
export const SOCIAL_SHARE_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "URLEX — Bufete jurídico en Puebla",
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  siteName?: string;
  locale?: string;
};

/** Builds page metadata so document title uses the root template and social cards keep the brand. */
export function buildPageMetadata({
  title,
  description,
  siteName = "URLEX",
  locale = "es_MX",
}: PageMetaInput): Metadata {
  const brandedTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale,
      siteName,
      title: brandedTitle,
      description,
      images: [SOCIAL_SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [SOCIAL_SHARE_IMAGE.url],
    },
  };
}
