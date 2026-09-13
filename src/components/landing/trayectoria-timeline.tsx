"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type TimelineItem = {
  year: string;
  body: string;
};

type Props = {
  title: string;
  items: TimelineItem[];
};

/** Higher = closer to 1:1 with finger scroll (less “stuck” lag). */
const SMOOTHING = 0.55;
/** Page-scroll distance ≈ content scroll × this (1 = same velocity). */
const SCROLL_RATIO = 1.1;

export function TrayectoriaTimeline({ title, items }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(motionQuery.matches);
    sync();
    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  if (reducedMotion) {
    return <StaticTimeline title={title} items={items} />;
  }

  return <ScrubTimeline title={title} items={items} />;
}

function StaticTimeline({ title, items }: Props) {
  return (
    <section className="landing-section w-full" style={{ background: "var(--color-bg)" }}>
      <div className="landing-container flex flex-col gap-10 md:gap-14">
        <h2
          className="text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
          style={{ color: "var(--color-primary)" }}
        >
          {title}
        </h2>
        <MobileList items={items} activeIndex={items.length - 1} progress={1} />
      </div>
    </section>
  );
}

function ScrubTimeline({ title, items }: Props) {
  const trackRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const maxScrollRef = useRef(0);
  const rafRef = useRef(0);
  const progressRaf = useRef(0);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const scrollable = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      maxScrollRef.current = scrollable;
      setMaxScroll(scrollable);
    };

    measure();
    const raf = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const viewport = viewportRef.current;
    if (!track || !sticky || !viewport) return;

    let running = false;

    const readTarget = () => {
      const trackRect = track.getBoundingClientRect();
      const stickyTop = Number.parseFloat(getComputedStyle(sticky).top) || 0;
      // Start when the sticky panel (title + timeline) locks under the fixed nav.
      const scrolled = stickyTop - trackRect.top;
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetScroll.current = 0;
        return;
      }
      // Finish scrub as the track ends — keep only a tiny buffer so the last card clears.
      const scrubRange = Math.max(1, scrollable - window.innerHeight * 0.02);
      const ratio = Math.min(1, Math.max(0, scrolled / scrubRange));
      targetScroll.current = ratio * maxScrollRef.current;
    };

    const tick = () => {
      const delta = targetScroll.current - currentScroll.current;
      if (Math.abs(delta) < 0.35) {
        currentScroll.current = targetScroll.current;
        running = false;
      } else {
        currentScroll.current += delta * SMOOTHING;
        running = true;
      }

      viewport.scrollTop = currentScroll.current;

      const nextProgress =
        maxScrollRef.current > 0 ? currentScroll.current / maxScrollRef.current : 0;
      cancelAnimationFrame(progressRaf.current);
      progressRaf.current = requestAnimationFrame(() => setProgress(nextProgress));

      if (running) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      readTarget();
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(tick);
    };

    // Initial sync + scroll-driven updates (avoids perpetual rAF lag on mobile).
    // Capture on document so we still receive events if a nested scrollport
    // (e.g. body) is the one that actually scrolls.
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(progressRaf.current);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [maxScroll]);

  const activeIndex = Math.min(
    items.length - 1,
    Math.round(progress * Math.max(items.length - 1, 0)),
  );

  // Track length ≈ viewport + content overflow → finger scroll ≈ timeline scroll.
  const trackHeightPx =
    typeof window === "undefined"
      ? undefined
      : Math.round(window.innerHeight + maxScroll * SCROLL_RATIO + window.innerHeight * 0.04);

  return (
    <section
      ref={trackRef}
      className="relative w-full"
      style={{
        background: "var(--color-bg)",
        height:
          maxScroll > 0 && trackHeightPx
            ? `${trackHeightPx}px`
            : `${Math.max(items.length, 2) * 70}dvh`,
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-[5rem] flex flex-col overflow-hidden md:top-[7rem] xl:top-[8rem]"
      >
        <div className="landing-container flex flex-col gap-5 pb-4 pt-5 md:gap-8 md:pb-6 md:pt-8">
          <h2
            className="shrink-0 text-center font-display text-[1.75rem] font-bold md:text-[2.25rem]"
            style={{ color: "var(--color-primary)" }}
          >
            {title}
          </h2>

          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden h-[min(420px,calc(100dvh-5rem-8rem))] md:h-[min(520px,calc(100dvh-7rem-10rem))] xl:h-[min(560px,calc(100dvh-8rem-10rem))]"
          >
            <div className="pb-4 md:pb-6">
              <div className="md:hidden">
                <MobileList
                  items={items}
                  activeIndex={activeIndex}
                  progress={progress}
                />
              </div>
              <div className="hidden md:block">
                <DesktopList
                  items={items}
                  activeIndex={activeIndex}
                  progress={progress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileList({
  items,
  activeIndex,
  progress,
}: {
  items: TimelineItem[];
  activeIndex: number;
  progress: number;
}) {
  return (
    <ol className="relative mx-auto flex w-full max-w-xl flex-col gap-8 pt-16 md:pt-20">
      <TimelineRail progress={progress} side="right" />
      {items.map((item, index) => (
        <li
          key={item.year}
          style={{ opacity: index === activeIndex ? 1 : 0.35 }}
          className="relative flex items-start gap-4 pr-10 transition-opacity duration-300"
        >
          <TimelineCard {...item} />
          <TimelineNode
            active={index <= activeIndex}
            className="absolute top-8 right-[5px]"
          />
        </li>
      ))}
    </ol>
  );
}

function DesktopList({
  items,
  activeIndex,
  progress,
}: {
  items: TimelineItem[];
  activeIndex: number;
  progress: number;
}) {
  return (
    <ol className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 pt-16 md:pt-24">
      <TimelineRail progress={progress} side="center" />
      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isActive = index === activeIndex;

        return (
          <li
            key={item.year}
            className={`relative flex items-center transition-opacity duration-300 ${
              isLeft ? "justify-start" : "justify-end"
            }`}
            style={{ opacity: isActive ? 1 : 0.4 }}
          >
            <div
              className={`flex w-[calc(50%-2rem)] ${
                isLeft ? "justify-end" : "justify-start"
              }`}
            >
              <TimelineCard {...item} />
            </div>
            <span
              aria-hidden
              className={`absolute top-1/2 h-px w-8 -translate-y-1/2 ${
                isLeft ? "left-1/2 -translate-x-full" : "left-1/2"
              }`}
              style={{
                background:
                  index <= activeIndex ? "var(--color-primary)" : "var(--color-border)",
              }}
            />
            <TimelineNode
              active={index <= activeIndex}
              className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            />
          </li>
        );
      })}
    </ol>
  );
}

function TimelineRail({
  progress,
  side,
}: {
  progress: number;
  side: "right" | "center";
}) {
  const isCenter = side === "center";

  return (
    <>
      <span
        aria-hidden
        className={
          isCenter
            ? "absolute top-0 bottom-6 left-1/2 w-px -translate-x-1/2"
            : "absolute top-0 bottom-3 right-[11px] w-px"
        }
        style={{ background: "var(--color-border)" }}
      />
      <span
        aria-hidden
        className={
          isCenter
            ? "absolute top-0 left-1/2 w-px origin-top -translate-x-1/2"
            : "absolute top-0 right-[11px] w-px origin-top"
        }
        style={{
          background: "var(--color-primary)",
          height: `calc(${progress * 100}% - ${isCenter ? "1.5rem" : "0.75rem"})`,
        }}
      />
    </>
  );
}

function TimelineNode({
  active,
  className,
}: {
  active: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`h-3.5 w-3.5 rounded-full border-2 transition-[border-color,background-color] duration-500 ${className ?? ""}`}
      style={{
        borderColor: active ? "var(--color-primary)" : "var(--color-border)",
        background: active ? "var(--color-primary)" : "var(--color-bg)",
      }}
    />
  );
}

function TimelineCard({ year, body }: TimelineItem) {
  return (
    <article
      className="w-full max-w-md rounded-2xl border bg-white p-5 shadow-sm md:p-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
          style={{ background: "var(--color-primary)" }}
        >
          <Image
            src="/images/landing/icon-trayectoria.svg"
            alt=""
            width={22}
            height={20}
            className="h-5 w-5"
          />
        </span>
        <p className="text-xl font-semibold" style={{ color: "var(--color-primary)" }}>
          {year}
        </p>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {body}
      </p>
    </article>
  );
}
