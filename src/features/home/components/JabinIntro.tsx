"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { brand } from "@/config/brand";

const letters = ["J", "A", "B", "I", "N"] as const;

export function JabinIntro() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [targetProgress, setTargetProgress] = useState(15);
  const [progress, setProgress] = useState(0);
  const finishRef = useRef<(skip?: boolean) => void>(() => undefined);

  useEffect(() => {
    if (progress >= targetProgress) return;

    const timer = window.setTimeout(() => {
      setProgress((current) => {
        const distance = targetProgress - current;
        return Math.min(targetProgress, current + Math.max(1, Math.ceil(distance * 0.16)));
      });
    }, 34);

    return () => window.clearTimeout(timer);
  }, [progress, targetProgress]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fontReady = false;
    let heroReady = document.documentElement.dataset.heroReady === "true";
    let minimumComplete = false;
    let finished = false;
    const timers: number[] = [];

    const later = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const finish = (skip = false) => {
      if (finished) return;
      finished = true;

      if (skip) {
        setTargetProgress(100);
        setProgress(100);
        setExiting(true);
        later(() => setVisible(false), reducedMotion ? 120 : 420);
        return;
      }

      setTargetProgress(96);
      later(() => setTargetProgress(98), 70);
      later(() => setTargetProgress(100), 140);
      later(() => setExiting(true), reducedMotion ? 100 : 260);
      later(() => setVisible(false), reducedMotion ? 320 : 900);
    };

    finishRef.current = finish;

    const completeWhenReady = () => {
      if (fontReady && heroReady && minimumComplete) finish();
    };

    void document.fonts.ready.then(() => {
      fontReady = true;
      setTargetProgress((current) => Math.max(current, 30));
      completeWhenReady();
    });

    const onHeroReady = () => {
      heroReady = true;
      setTargetProgress((current) => Math.max(current, 72));
      completeWhenReady();
    };

    window.addEventListener("jabin:hero-ready", onHeroReady);
    if (heroReady) onHeroReady();

    later(() => setTargetProgress((current) => Math.max(current, 85)), reducedMotion ? 180 : 1_150);
    later(
      () => {
        minimumComplete = true;
        setTargetProgress((current) => Math.max(current, 92));
        completeWhenReady();
      },
      reducedMotion ? 420 : 1_500,
    );
    later(() => finish(), reducedMotion ? 720 : 3_000);

    const skip = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        finish(true);
      }
    };

    window.addEventListener("keydown", skip);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("jabin:hero-ready", onHeroReady);
      window.removeEventListener("keydown", skip);
    };
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
      className={`jabin-intro fixed inset-0 z-[200] cursor-pointer overflow-hidden text-white ${exiting ? "jabin-intro--exiting" : ""}`}
      data-testid="jabin-intro"
      data-progress={progress}
      onPointerDown={() => finishRef.current(true)}
    >
      <div className="jabin-intro__curtain absolute inset-0 grid grid-cols-5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="jabin-intro__curtain-panel" key={index} />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid h-full min-h-[540px] w-full max-w-[1600px] grid-rows-[auto_1fr_auto] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <div className="jabin-intro__meta flex items-center justify-between border-b border-white/15 pb-4 text-[10px] font-semibold text-white/45 sm:text-[11px]">
          <span className="max-[480px]:hidden">FULL-CYCLE SI STUDIO</span>
          <span className="flex items-center gap-2 sm:gap-3">
            <span>SEOUL / STUDIO</span>
            <span aria-hidden="true">·</span>
            <span>GWANGJU / SERVER</span>
          </span>
        </div>

        <div className="relative grid place-items-center">
          <div className="jabin-intro__word" aria-label="JABIN">
            {letters.map((letter) => (
              <span
                className={`jabin-intro__letter jabin-intro__letter--${letter.toLowerCase()}`}
                key={letter}
              >
                {letter}
              </span>
            ))}
          </div>

          <div className="jabin-intro__slogans" aria-hidden="true">
            <span>Just Ask.</span>
            <span>Build It Now.</span>
          </div>
        </div>

        <div className="jabin-intro__timeline grid grid-cols-[1fr_auto] items-end gap-4 sm:gap-6">
          <div className="relative h-14 sm:h-16">
            <span className="jabin-intro__track absolute right-0 bottom-2 left-0 h-px bg-white/15">
              <i
                className="jabin-intro__progress block h-full origin-left bg-white not-italic"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </span>
          </div>

          <button
            className="jabin-intro__enter mb-1 flex items-center gap-2 text-[10px] font-semibold text-white/45 transition-colors hover:text-white sm:text-[11px]"
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => finishRef.current(true)}
          >
            <Image
              className="h-auto w-[38px] brightness-0 invert sm:w-[44px]"
              src={brand.assets.logoWord}
              alt=""
              width={446}
              height={233}
              priority
              aria-hidden="true"
            />
            <output className="tabular-nums" aria-label={`준비 ${progress}%`}>
              {progress.toString().padStart(2, "0")}%
            </output>
          </button>
        </div>
      </div>
    </div>
  );
}
