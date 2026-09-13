"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const FAQ_KEYS = [
  "when",
  "policy",
  "trial",
  "docs",
  "location",
  "contract",
] as const;

export function NosotrosFaq() {
  const t = useTranslations("Nosotros");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      className="relative z-10 landing-section w-full"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="landing-container flex flex-col items-center gap-8">
        <h2
          className="font-display text-[1.75rem] font-bold md:text-[2.25rem]"
          style={{ color: "var(--color-primary)" }}
        >
          {t("faqTitle")}
        </h2>
        {/*
          min-height ≈ closed rows + gaps + one answer, so opening a question
          reuses reserved space instead of pushing the footer.
        */}
        <ul className="flex min-h-[34rem] w-full max-w-4xl flex-col gap-4 md:min-h-[32rem]">
          {FAQ_KEYS.map((key) => {
            const isOpen = open === key;

            return (
              <li key={key}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer flex-col rounded-lg px-5 py-4 text-left transition-opacity hover:opacity-90"
                  style={{ background: "var(--color-bg-muted)" }}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                >
                  <span className="flex w-full items-center justify-between gap-4">
                    <span
                      className="text-base font-medium md:text-lg"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {t(`faq.${key}.q`)}
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
                        {t(`faq.${key}.a`)}
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
