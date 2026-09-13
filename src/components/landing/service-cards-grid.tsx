import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/landing/service-card";
import { PRACTICE_AREAS, SERVICE_CARDS } from "@/lib/practice-areas";

type Props = {
  translationNamespace?: "ServicesSection" | "ServiciosPage";
  layout?: "scroll" | "grid";
};

export async function ServiceCardsGrid({
  translationNamespace = "ServicesSection",
  layout = "scroll",
}: Props) {
  const t = await getTranslations(translationNamespace);

  const cards = SERVICE_CARDS.map(({ key, areaId, icon }) => (
    <ServiceCard
      key={key}
      title={t(`items.${key}.title`)}
      description={t(`items.${key}.description`)}
      cta={t("cta")}
      href={PRACTICE_AREAS[areaId].href}
      icon={icon}
      className={
        layout === "scroll"
          ? "flex h-full w-[280px] shrink-0 flex-col gap-7 rounded-[var(--radius-card)] bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] md:w-[293px]"
          : "flex h-full flex-col gap-7 rounded-[var(--radius-card)] bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
      }
    />
  ));

  if (layout === "grid") {
    return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>;
  }

  return (
    <div className="-mx-2 flex items-stretch gap-6 overflow-x-auto px-2 pb-4 pt-2 [scrollbar-width:thin]">
      {cards}
    </div>
  );
}
