"use client";

import { useEffect, useState, type CSSProperties } from "react";

import { contentShell } from "@/components/ui/tailwind";

const letters = ["J", "A", "B", "I", "N"] as const;

export function JabinIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const skipTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(skipTimer);
    }

    const timer = window.setTimeout(() => setVisible(false), 2_850);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="jabin-intro fixed inset-0 z-[200] cursor-pointer overflow-hidden bg-navy-night text-white"
      data-testid="jabin-intro"
      aria-hidden="true"
      onPointerDown={() => setVisible(false)}
    >
      <div className={`${contentShell} flex h-full min-h-[480px] flex-col py-6 sm:py-8 lg:py-10`}>
        <div className="jabin-intro__meta flex items-center justify-between border-b border-white/20 pb-4 text-[11px] font-bold text-white/60 sm:text-[12px]">
          <span>JABIN / DIGITAL BUILD STUDIO</span>
          <span>SEOUL · 2026</span>
        </div>

        <div className="my-auto">
          <div className="flex items-center justify-between" aria-label="JABIN">
            {letters.map((letter, index) => (
              <span className="overflow-hidden" key={letter}>
                <span
                  className="jabin-intro__letter block text-[64px] leading-[0.82] font-bold sm:text-[112px] lg:text-[164px]"
                  style={{ "--intro-delay": `${120 + index * 90}ms` } as CSSProperties}
                >
                  {letter}
                </span>
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-2 border-t border-white/28 pt-5 text-[28px] leading-none font-semibold sm:mt-10 sm:grid-cols-2 sm:text-[38px] lg:text-[48px]">
            <p className="jabin-intro__phrase m-0 [animation-delay:760ms]">Just Ask.</p>
            <p className="jabin-intro__phrase m-0 text-white/62 [animation-delay:1040ms] sm:text-right">
              Build It Now.
            </p>
          </div>
        </div>

        <div className="jabin-intro__footer grid grid-cols-[auto_1fr_auto] items-center gap-4 text-[11px] font-bold text-white/50">
          <span>01</span>
          <span className="h-px overflow-hidden bg-white/20">
            <i className="jabin-intro__progress block h-full origin-left bg-navy-signal not-italic" />
          </span>
          <span>ENTER</span>
        </div>
      </div>
    </div>
  );
}
