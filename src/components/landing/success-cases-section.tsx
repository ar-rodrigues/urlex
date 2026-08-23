import { getTranslations } from "next-intl/server";

export async function SuccessCasesSection() {
  const t = await getTranslations("SuccessCasesSection");

  return (
    <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container flex flex-col items-center gap-10 md:gap-12">
        <h2
          className="font-display max-w-4xl text-center text-[1.75rem] font-bold leading-[1.1] tracking-[0.03em] md:text-[2.25rem]"
          style={{ color: "var(--color-text)" }}
        >
          {t("title")}
        </h2>
        <div
          className="h-[120px] w-full max-w-[1108px] md:h-[188px]"
          style={{ background: "var(--color-primary)" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
