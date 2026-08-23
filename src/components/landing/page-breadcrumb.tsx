import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";

type Props = {
  current: string;
};

export async function PageBreadcrumb({ current }: Props) {
  const t = await getTranslations("PageHero");

  return (
    <div className="landing-container py-4 md:py-5">
      <nav
        aria-label="Miga de pan"
        className="flex flex-wrap gap-x-1 text-sm font-semibold md:text-base lg:text-lg"
      >
        <Link
          href="/#inicio"
          className="transition-opacity hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          {t("breadcrumbHome")}
        </Link>
        <span style={{ color: "var(--color-border)" }}>/</span>
        <span style={{ color: "var(--color-border)" }}>{current}</span>
      </nav>
    </div>
  );
}
