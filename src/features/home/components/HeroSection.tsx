"use client";

import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { contentShell, easeOut } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);

  const markHeroReady = () => {
    setImageReady(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.dataset.heroReady = "true";
        window.dispatchEvent(new Event("jabin:hero-ready"));
      });
    });
  };

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
      className="relative isolate z-[1] h-[calc(100svh-28px)] max-h-[940px] min-h-[540px] overflow-hidden bg-navy-night text-white"
      id="hero"
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
          onLoad={(event) => {
            const image = event.currentTarget;
            void image
              .decode()
              .catch(() => undefined)
              .then(() => {
                if (image.naturalWidth > 100 && image.naturalHeight > 100) markHeroReady();
              });
          }}
        />
      </div>
      <div className="absolute inset-0 -z-[1] bg-navy-night/70" aria-hidden="true" />

      <div
        className={`${contentShell} flex h-full flex-col justify-end pt-28 pb-8 sm:pb-11 lg:pb-12`}
      >
        <div className="mb-auto flex animate-hero-enter items-center justify-between gap-4 border-b border-white/25 pb-4 text-[10px] font-bold text-white/75 opacity-0 [animation-delay:120ms] motion-reduce:animate-none motion-reduce:opacity-100 sm:text-[12px]">
          <span className="max-[480px]:hidden">FULL-CYCLE SI STUDIO</span>
          <span className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span>SEOUL / STUDIO</span>
            <span aria-hidden="true">·</span>
            <span>GWANGJU / SERVER</span>
          </span>
        </div>

        <h1
          className="m-0 text-[72px] leading-[0.9] font-bold sm:text-[96px] lg:text-[118px]"
          id="hero-title"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block animate-hero-line opacity-0 [animation-delay:240ms] motion-reduce:translate-y-0 motion-reduce:animate-none motion-reduce:opacity-100">
              JABIN
            </span>
          </span>
        </h1>

        <div className="mt-5 grid animate-hero-enter gap-6 border-t border-white/35 pt-5 opacity-0 [animation-delay:520ms] motion-reduce:animate-none motion-reduce:opacity-100 sm:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] sm:items-end lg:mt-7 lg:pt-6">
          <p className="m-0 max-w-[760px] text-[30px] leading-[1.04] font-semibold sm:text-[38px] lg:text-[48px]">
            <span className="block">Just Ask.</span>
            <span className="mt-1 block text-white/62">Build It Now.</span>
          </p>

          <p className="m-0 max-w-[440px] justify-self-end text-[14px] leading-[1.6] [word-break:keep-all] text-white/72 sm:text-[15px]">
            복잡한 요구를 작동하는 시스템으로. 기획, UX/UI, 프론트엔드와 백엔드, 배포와 운영까지 한
            팀이 연결합니다.
          </p>
        </div>
      </div>

      <a
        className="absolute bottom-4 left-1/2 flex min-h-12 -translate-x-1/2 flex-col items-center justify-end gap-2 text-[11px] font-bold text-white/70 transition-colors hover:text-white focus-visible:text-white sm:bottom-8"
        href="#approach"
        aria-label="아래 섹션으로 이동"
      >
        <span className="hidden sm:block">SCROLL TO EXPLORE</span>
        <ArrowDownIcon
          className="size-5 animate-scroll-nudge motion-reduce:animate-none"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
