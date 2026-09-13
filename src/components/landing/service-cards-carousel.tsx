"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ServiceCard } from "@/components/landing/service-card";
import { PRACTICE_AREAS, SERVICE_CARDS } from "@/lib/practice-areas";

export function ServiceCardsCarousel() {
  const t = useTranslations("ServicesSection");
  const [paused, setPaused] = useState(false);

  const cards = SERVICE_CARDS.map(({ key, areaId, icon }) => ({
    key,
    icon,
    href: PRACTICE_AREAS[areaId].href,
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
  }));

  const loopedCards = [...cards, ...cards];

  return (
    <div
      className="overflow-hidden"
      aria-label={t("title")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div
        className={`service-carousel-track flex w-max items-stretch gap-6 py-2${paused ? " is-paused" : ""}`}
      >
        {loopedCards.map((card, index) => (
          <div
            key={`${card.key}-${index}`}
            className="flex w-[280px] shrink-0 md:w-[293px]"
          >
            <ServiceCard
              title={card.title}
              description={card.description}
              cta={t("cta")}
              href={card.href}
              icon={card.icon}
              className="flex h-full w-full flex-col gap-7 rounded-[var(--radius-card)] bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
