"use client";

import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { contentShell, easeOut } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      imageRef.current?.style.setProperty("--hero-x", `${x}px`);
      imageRef.current?.style.setProperty("--hero-y", `${y}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <section
      className="relative z-[1] isolate h-[calc(100svh-28px)] min-h-[540px] max-h-[940px] overflow-hidden bg-navy-night text-white"
      id="top"
      aria-labelledby="hero-title"
    >
      <div
        className={`absolute -inset-3 -z-[2] transition-[opacity,transform] duration-[1200ms] ${easeOut} ${
          imageReady ? "opacity-100" : "opacity-0"
        } motion-reduce:opacity-100 motion-reduce:transition-none`}
        ref={imageRef}
        style={
          {
            "--hero-scale": imageReady ? 1.02 : 1.07,
            transform:
              "translate3d(var(--hero-x, 0), var(--hero-y, 0), 0) scale(var(--hero-scale))",
          } as CSSProperties
        }
      >
        <Image
          src={brand.assets.hero}
          alt="서비스 설계 화면과 제작 자료가 놓인 Jabin 작업 공간"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
          onLoad={() => setImageReady(true)}
        />
      </div>
      <div className="absolute inset-0 -z-[1] bg-navy-night/70" aria-hidden="true" />

      <div className={`${contentShell} flex h-full flex-col justify-end pt-28 pb-8 sm:pb-11 lg:pb-12`}>
        <div className="animate-hero-enter mb-auto flex items-center justify-between border-b border-white/25 pb-4 text-[12px] font-bold text-white/75 opacity-0 [animation-delay:120ms] motion-reduce:animate-none motion-reduce:opacity-100">
          <span>FULL-CYCLE SI STUDIO</span>
          <span className="hidden items-center gap-2 sm:flex">
            <i className="size-2 rounded-full bg-navy-signal not-italic" aria-hidden="true" />
            SEOUL · AVAILABLE
          </span>
        </div>

        <h1
          className="m-0 text-[72px] leading-[0.9] font-bold sm:text-[96px] lg:text-[118px]"
          id="hero-title"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="animate-hero-line block opacity-0 [animation-delay:240ms] motion-reduce:translate-y-0 motion-reduce:animate-none motion-reduce:opacity-100">
              JABIN
            </span>
          </span>
        </h1>

        <div className="animate-hero-enter mt-5 grid gap-6 border-t border-white/35 pt-5 opacity-0 [animation-delay:520ms] motion-reduce:animate-none motion-reduce:opacity-100 sm:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] sm:items-end lg:mt-7 lg:pt-6">
          <p className="m-0 max-w-[760px] text-[30px] leading-[1.04] font-semibold sm:text-[38px] lg:text-[48px]">
            <span className="block">Just Ask.</span>
            <span className="mt-1 block text-white/62">Build It Now.</span>
          </p>
          <div className="flex items-end justify-between gap-6 sm:block">
            <p className="m-0 max-w-[390px] text-[14px] leading-[1.6] text-white/72 [word-break:keep-all] sm:text-[15px]">
              복잡한 요구를 작동하는 시스템으로. 기획, UX/UI, 프론트엔드와 백엔드,
              배포와 운영까지 한 팀이 연결합니다.
            </p>
            <a
              className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-white/70 text-[13px] font-bold transition-colors hover:border-navy-signal hover:text-navy-signal"
              href="#work"
            >
              프로젝트 보기
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a
        className="absolute right-5 bottom-8 hidden min-h-11 items-center gap-3 text-[11px] text-white/70 lg:flex"
        href="#approach"
      >
        SCROLL
        <ArrowDownIcon className="size-4 animate-scroll-nudge motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  );
}
