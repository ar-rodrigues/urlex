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
        className={`service-carousel-track flex w-max gap-6 py-2${paused ? " is-paused" : ""}`}
      >
        {loopedCards.map((card, index) => (
          <ServiceCard
            key={`${card.key}-${index}`}
            title={card.title}
            description={card.description}
            cta={t("cta")}
            href={card.href}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
}
