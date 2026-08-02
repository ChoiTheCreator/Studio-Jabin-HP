"use client";

import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { easeOut, pageShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      imageRef.current?.style.setProperty("--hero-x", `${x}px`);
      imageRef.current?.style.setProperty("--hero-y", `${y}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <section
      className="relative z-[1] isolate min-h-screen min-h-svh overflow-hidden bg-ink text-white"
      id="top"
      aria-labelledby="hero-title"
    >
      <div
        className={`absolute -inset-4 -z-[2] scale-[1.025] transition-transform duration-700 ${easeOut}`}
        ref={imageRef}
        style={{ transform: "translate3d(var(--hero-x, 0), var(--hero-y, 0), 0) scale(1.025)" }}
      >
        <Image
          src={brand.assets.hero}
          alt="디지털 인터페이스와 디자인 샘플이 놓인 Jabin 작업 공간"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[60%_center] lg:object-center"
        />
      </div>
      <div className="absolute inset-0 -z-[1] bg-black/45" aria-hidden="true" />

      <div
        className={`${pageShell} flex min-h-screen min-h-svh flex-col justify-end pt-[124px] pb-[84px] lg:pt-[150px] lg:pb-[72px]`}
      >
        <p className="animate-hero-enter mb-5 text-[11px] font-bold text-white/80 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 lg:mb-6">
          INDEPENDENT DIGITAL STUDIO · SEOUL
        </p>
        <h1
          className="animate-hero-enter m-0 max-w-[1080px] text-[52px] leading-[0.92] font-bold opacity-0 [animation-delay:180ms] [word-break:keep-all] motion-reduce:animate-none motion-reduce:opacity-100 sm:text-[82px] lg:text-[126px] min-[1440px]:!text-[148px]"
          id="hero-title"
        >
          생각을
          <br />
          <span className="block text-lime">작동하게</span>
          만듭니다.
        </h1>
        <div className="animate-hero-enter mt-7 flex flex-col gap-4 border-t border-white/50 pt-4 text-[13px] opacity-0 [animation-delay:340ms] motion-reduce:animate-none motion-reduce:opacity-100 sm:flex-row sm:items-center sm:justify-between lg:mt-[34px] lg:text-[14px]">
          <p className="m-0">Strategy · Identity · Experience · Engineering</p>
          <a className="inline-flex min-h-11 w-fit items-center gap-2 font-bold" href="#work">
            작업 보기
            <ArrowDownIcon className="size-[15px] animate-scroll-nudge motion-reduce:animate-none" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        className="absolute right-[18px] bottom-[72px] hidden items-center gap-3 text-[10px] text-white/70 lg:flex [writing-mode:vertical-rl]"
        aria-hidden="true"
      >
        <span>SCROLL</span>
        <span className="h-[52px] w-px bg-white/50" />
        <span>01</span>
      </div>
    </section>
  );
}
