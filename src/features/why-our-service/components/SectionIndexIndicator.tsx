"use client";

import { useEffect, useState } from "react";

const sectionIndex = [
  { number: 1, targetId: "why-problem-1", label: "PROBLEM 1" },
  { number: 2, targetId: "why-problem-2", label: "PROBLEM 2" },
  { number: 3, targetId: "why-problem-3", label: "PROBLEM 3" },
  { number: 4, targetId: "why-infrastructure", label: "INFRASTRUCTURE" },
  { number: 5, targetId: "why-conclusion", label: "CONCLUSION" },
] as const;

type ActiveIndex = (typeof sectionIndex)[number]["number"];

const observedSections = sectionIndex;

export function SectionIndexIndicator() {
  const [activeIndex, setActiveIndex] = useState<ActiveIndex>(1);

  useEffect(() => {
    const targets = observedSections.flatMap((section) => {
      const element = document.getElementById(section.targetId);
      return element ? [{ element, section }] : [];
    });

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - window.innerHeight * 0.32) -
              Math.abs(second.boundingClientRect.top - window.innerHeight * 0.32),
          )[0];

        if (!current) return;

        const activeSection = targets.find(({ element }) => element === current.target)?.section;
        if (activeSection) setActiveIndex(activeSection.number);
      },
      { rootMargin: "-24% 0px -64% 0px", threshold: 0 },
    );

    targets.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const activeSection = sectionIndex.find((section) => section.number === activeIndex)!;
  const accessibleLabel = activeSection.label
    ? `현재 콘텐츠 ${activeIndex}번, ${activeSection.label}`
    : `현재 콘텐츠 ${activeIndex}번`;

  return (
    <aside
      className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
      aria-label="Why Our Service 콘텐츠 인덱스"
      data-testid="section-index"
    >
      <div className="group relative flex items-center justify-end">
        {activeSection.label ? (
          <span
            className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 max-w-[calc(100vw-40px)] -translate-x-1/2 translate-y-1 rounded-[4px] bg-navy-night px-3 py-2 text-[12px] leading-none font-bold whitespace-nowrap text-white opacity-0 shadow-[0_12px_32px_rgba(7,39,108,0.16)] transition-[opacity,transform] duration-180 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
            data-testid="section-index-label"
          >
            {activeSection.label}
          </span>
        ) : null}

        <div
          className="flex size-14 items-center justify-center rounded-full border border-white/60 bg-navy-deep text-[18px] leading-none font-bold text-white shadow-[0_16px_48px_rgba(7,39,108,0.2)] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-primary"
          aria-label={accessibleLabel}
          data-active-index={activeIndex}
          data-testid="section-index-value"
          role="status"
          tabIndex={0}
        >
          {activeIndex}
        </div>
      </div>
    </aside>
  );
}
