"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ARRENDAMIENTO_FAQ_KEYS } from "@/lib/arrendamiento-plans";

export function ArrendamientoFaq() {
  const t = useTranslations("ArrendamientoPage.faq");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      className="relative z-10 w-full pt-[var(--spacing-section)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="landing-container flex flex-col items-center gap-8 pb-[var(--spacing-section)]">
        <h2
          className="font-display text-[1.75rem] font-bold md:text-[2.25rem]"
          style={{ color: "var(--color-primary)" }}
        >
          {t("title")}
        </h2>
        {/*
          min-height ≈ closed rows + gaps + one answer, so opening a question
          reuses reserved space instead of pushing the section below.
        */}
        <ul className="grid min-h-[26rem] w-full grid-cols-1 content-start items-start gap-4 md:min-h-[16rem] md:grid-cols-2">
          {ARRENDAMIENTO_FAQ_KEYS.map((key) => {
            const isOpen = open === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer flex-col rounded-lg border px-5 py-4 text-left transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--color-bg)",
                    borderColor: "var(--color-border)",
                  }}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                >
                  <span className="flex w-full items-center justify-between gap-4">
                    <span
                      className="text-base font-medium md:text-lg"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {t(`items.${key}.q`)}
                    </span>
                    <span
                      className="shrink-0 text-xl leading-none"
                      style={{ color: "var(--color-primary)" }}
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span
                        className="mt-3 block text-base"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {t(`items.${key}.a`)}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
