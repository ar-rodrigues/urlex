"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const SLIDES = [
  {
    src: "/images/instalaciones/carrusel/oficina-1.webp",
    altKey: "slides.oficina1",
  },
  {
    src: "/images/instalaciones/carrusel/oficina-2.webp",
    altKey: "slides.oficina2",
  },
  {
    src: "/images/instalaciones/carrusel/oficina-3.webp",
    altKey: "slides.oficina3",
  },
  {
    src: "/images/instalaciones/carrusel/sala-espera.webp",
    altKey: "slides.salaEspera",
  },
  {
    src: "/images/instalaciones/carrusel/sala-reuniones.webp",
    altKey: "slides.salaReuniones",
  },
  {
    src: "/images/instalaciones/carrusel/sala-reuniones-2.webp",
    altKey: "slides.salaReuniones2",
  },
  {
    src: "/images/instalaciones/carrusel/sala-reuniones-3.webp",
    altKey: "slides.salaReuniones3",
  },
] as const;

const AUTOPLAY_MS = 6000;

const navButtonClassName =
  "group absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--color-text-on-primary)] bg-[var(--color-primary)] shadow-[0_2px_10px_rgba(3,3,4,0.2)] outline-none transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:scale-[1.15] hover:border-[var(--color-text-on-primary)] hover:bg-[rgba(255,255,255,0.45)] hover:shadow-[0_4px_16px_rgba(3,3,4,0.25)] active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] lg:flex";

const indicatorClassName =
  "h-3 cursor-pointer rounded-full outline-none transition-[width,background-color,opacity,transform,filter] duration-300 ease-out hover:scale-125 hover:brightness-110 active:scale-90 active:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";
export function InstalacionesCarousel() {
  const t = useTranslations("Instalaciones.Carousel");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const goTo = (next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  };

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setIndex((current) => (current + 1) % SLIDES.length);
    }
  });

  useEffect(() => {
    const node = regionRef.current;
    if (!node) return;

    const handleKeyDown = (event: KeyboardEvent) => onKeyDown(event);
    node.addEventListener("keydown", handleKeyDown);
    return () => node.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      ref={regionRef}
      className="relative h-[430px] overflow-hidden rounded-lg md:h-[590px]"
      style={{ background: "var(--color-bg-muted)" }}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("label")}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="pointer-events-none relative h-full w-full" aria-hidden={false}>
        {SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{
              opacity: slideIndex === index ? 1 : 0,
            }}
            aria-hidden={slideIndex !== index}
          >
            <Image
              src={slide.src}
              alt={t(slide.altKey)}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={slideIndex === 0}
            />
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {t("status", { current: index + 1, total: SLIDES.length })}
      </p>

      <button
        type="button"
        className={`${navButtonClassName} left-3 md:left-5`}
        aria-label={t("prev")}
        onClick={goPrev}
      >
        <Chevron direction="left" />
      </button>

      <button
        type="button"
        className={`${navButtonClassName} right-3 md:right-5`}
        aria-label={t("next")}
        onClick={goNext}
      >
        <Chevron direction="right" />
      </button>

      <div
        className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center"
        role="tablist"
        aria-label={t("indicators")}
      >
        <div className="flex items-center gap-2.5 rounded-full bg-[rgba(3,3,4,0.45)] px-3 py-2 backdrop-blur-[2px]">
          {SLIDES.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={t("goTo", { index: slideIndex + 1 })}
                className={`${indicatorClassName} ${
                  active
                    ? "w-7 bg-[var(--color-accent)] opacity-100"
                    : "w-3 bg-[var(--color-text-on-primary)] opacity-70 hover:bg-[var(--color-accent)] hover:opacity-100"
                }`}
                onClick={() => goTo(slideIndex)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M12.5 4.5 7 10l5.5 5.5"
            : "M7.5 4.5 13 10l-5.5 5.5"
        }
        className="stroke-[var(--color-text-on-primary)] transition-[stroke] duration-300 ease-out group-hover:stroke-[var(--color-primary)]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
