import Image from "next/image";
import { PageBreadcrumb } from "@/components/landing/page-breadcrumb";

type Props = {
  breadcrumbCurrent: string;
  variant?: "below" | "overlay" | "breadcrumb-only";
  imageSrc?: string;
  imageAlt?: string;
  imageHeights?: string;
  title?: string;
  body?: string;
  tagline?: string;
};

export function ContentPageHero({
  breadcrumbCurrent,
  variant = "below",
  imageSrc,
  imageAlt,
  imageHeights = "h-[220px] sm:h-[300px] lg:h-[420px]",
  title,
  body,
  tagline,
}: Props) {
  return (
    <section className="w-full" style={{ background: "var(--color-primary)" }}>
      <PageBreadcrumb current={breadcrumbCurrent} />

      {variant !== "breadcrumb-only" && imageSrc && imageAlt && (
        <div className="landing-container pb-0">
          <div className={`relative w-full overflow-hidden ${imageHeights}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {variant === "overlay" && title && (
              <div
                className="absolute inset-x-0 bottom-0 px-6 py-6 md:px-10 md:py-8"
                style={{ background: "var(--color-primary)" }}
              >
                <h1
                  className="font-display text-[1.5rem] font-bold leading-[1.2] tracking-[0.03em] md:text-[2.25rem]"
                  style={{ color: "var(--color-text-on-primary)" }}
                >
                  {title}
                </h1>
              </div>
            )}
          </div>
        </div>
      )}

      {variant === "below" && (title || body || tagline) && (
        <div className="landing-container flex flex-col gap-6 py-10 md:py-12">
          {title && (
            <h1
              className="font-display text-[1.75rem] font-bold leading-[1.23] tracking-[0.03em] md:text-[2.5rem]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              {title}
            </h1>
          )}
          {body && (
            <p
              className="max-w-4xl text-base font-medium leading-[1.4] md:text-[1.375rem]"
              style={{ color: "var(--color-text-on-primary)" }}
            >
              {body}
            </p>
          )}
          {tagline && (
            <p className="text-base" style={{ color: "var(--color-accent)" }}>
              {tagline}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
