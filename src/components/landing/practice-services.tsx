import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import type { PracticeAreaId } from "@/lib/practice-areas";
import { PRACTICE_AREAS, TRUST_KEYS } from "@/lib/practice-areas";

type Props = {
  areaId: PracticeAreaId;
};

export async function PracticeServices({ areaId }: Props) {
  const area = PRACTICE_AREAS[areaId];
  const t = await getTranslations(`Practice.${areaId}`);
  const tShared = await getTranslations("PracticeShared");

  return (
    <section className="w-full" style={{ background: "var(--color-bg-muted)" }}>
      <div className="mx-auto grid max-w-[var(--max-width-container)] grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)]">
        <div className="flex flex-col gap-8 px-[var(--spacing-container)] py-[var(--spacing-section)] md:gap-12 lg:pr-8">
          <div className="flex max-w-3xl flex-col gap-4">
            <h2
              className="font-display text-[1.75rem] leading-[1.15] tracking-tight md:leading-[33px]"
              style={{ color: "var(--color-primary)" }}
            >
              {tShared("howTitle")}
            </h2>
            <p
              className="text-base font-medium leading-[1.4] md:text-[1.375rem]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("subtitle")}
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {area.itemKeys.map((key) => (
              <li
                key={key}
                className="flex min-w-0 gap-3 rounded-lg border bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.04)] sm:gap-4"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="flex h-[49px] w-[49px] shrink-0 items-center justify-center overflow-hidden rounded-md border"
                  style={{ borderColor: "var(--color-accent)" }}
                >
                  <Image
                    src="/images/shared/icon-check.svg"
                    alt=""
                    width={39}
                    height={39}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3
                    className="text-lg font-medium leading-[1.4] tracking-tight md:text-[1.375rem]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {t(`items.${key}.title`)}
                  </h3>
                  <p
                    className="text-base font-semibold leading-normal md:text-lg"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-8 px-[var(--spacing-container)] py-[var(--spacing-section)] lg:bg-white lg:pl-8 lg:pr-[var(--spacing-container)]">
          <div
            className="flex flex-col items-center gap-4 rounded-lg p-4 text-center"
            style={{ background: "var(--color-primary)" }}
          >
            <p
              className="text-lg font-medium leading-[1.4] tracking-tight md:text-[1.375rem]"
              style={{ color: "var(--color-border)" }}
            >
              {tShared("sidebarCta")}
            </p>
            <Link href="/contacto">
              <Button variant="muted">{tShared("sidebarCtaButton")}</Button>
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <h3
              className="text-xl font-semibold leading-[1.15] tracking-tight md:text-2xl"
              style={{ color: "var(--color-primary)" }}
            >
              {tShared("otherAreasTitle")}
            </h3>
            <ul className="flex flex-col">
              {area.otherAreaIds.map((id) => (
                <li key={id}>
                  <Link
                    href={PRACTICE_AREAS[id].href}
                    className="flex items-center justify-between gap-3 border-b py-4 transition-opacity hover:opacity-80"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="text-lg font-medium leading-[1.4] tracking-tight md:text-[1.375rem]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {tShared(`areas.${id}`)}
                    </span>
                    <Image
                      src="/images/shared/icon-arrow.svg"
                      alt=""
                      width={30}
                      height={14}
                      className="shrink-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3
              className="text-xl font-semibold leading-[1.15] tracking-tight md:text-2xl"
              style={{ color: "var(--color-primary)" }}
            >
              {tShared("trustTitle")}
            </h3>
            <ul className="flex flex-col gap-2">
              {TRUST_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-base"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                    aria-hidden
                  />
                  {tShared(`trust.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
