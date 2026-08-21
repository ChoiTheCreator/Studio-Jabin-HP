"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { contentShell } from "@/components/ui/tailwind";

const AUTOPLAY_DELAY = 4800;

const projectImages = [
  {
    id: "part-1",
    src: "/images/why-our-service/eternalmarketing_carousel_01.png",
    width: 960,
    height: 1280,
    alt: "실제 제작 웹사이트의 메인 화면",
  },
  {
    id: "part-2",
    src: "/images/why-our-service/eternalmarketing_carousel_02.png",
    width: 960,
    height: 1280,
    alt: "실제 제작 웹사이트의 데이터와 전문 인력 소개 화면",
  },
  {
    id: "part-3",
    src: "/images/why-our-service/eternalmarketing_carousel_03.png",
    width: 960,
    height: 1280,
    alt: "실제 제작 웹사이트의 마케팅 채널 소개 화면",
  },
  {
    id: "part-4",
    src: "/images/why-our-service/eternalmarketing_carousel_04.png",
    width: 960,
    height: 1280,
    alt: "실제 제작 웹사이트의 고객 후기 화면",
  },
  {
    id: "part-5",
    src: "/images/why-our-service/eternalmarketing_carousel_05.png",
    width: 960,
    height: 1280,
    alt: "실제 제작 웹사이트의 프로젝트 진행 방식 화면",
  },
  {
    id: "part-6",
    src: "/images/why-our-service/eternalmarketing_carousel_06.png",
    width: 960,
    height: 1280,
    alt: "실제 제작 웹사이트의 진단 안내 화면",
  },
] as const;

function circularDifference(index: number, activeIndex: number) {
  let difference = index - activeIndex;
  const midpoint = projectImages.length / 2;
  if (difference > midpoint) difference -= projectImages.length;
  if (difference < -midpoint) difference += projectImages.length;
  return difference;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeftIcon : ChevronRightIcon;
  const label = direction === "previous" ? "이전 이미지" : "다음 이미지";
  return (
    <button
      className="grid size-11 shrink-0 place-items-center rounded-full border border-navy-line bg-white text-navy-ink shadow-[0_8px_24px_rgba(7,39,108,0.08)] transition-[border-color,background-color,color,transform] hover:border-navy-ink hover:bg-navy-ink hover:text-white active:scale-[0.96]"
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

function ProjectImage({
  image,
  priority = false,
}: {
  image: (typeof projectImages)[number];
  priority?: boolean;
}) {
  return (
    <Image
      className="object-contain p-2 sm:p-3"
      src={image.src}
      alt={image.alt}
      fill
      unoptimized
      priority={priority}
      sizes="(min-width: 1024px) 420px, min(82vw, 340px)"
    />
  );
}

function DesktopCarousel({
  activeIndex,
  reduceMotion,
}: {
  activeIndex: number;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className="relative hidden h-[670px] overflow-hidden lg:block"
      data-testid="showcase-desktop-carousel"
    >
      {projectImages.map((image, index) => {
        const difference = circularDifference(index, activeIndex);
        const isVisible = Math.abs(difference) <= 1;
        const isCenter = difference === 0;
        const x = difference < -1 ? -720 : difference > 1 ? 720 : difference * 370;
        const y = isCenter ? 0 : difference < 0 ? 54 : 112;
        return (
          <motion.figure
            key={image.id}
            className="absolute top-0 left-1/2 h-[560px] w-[420px] -translate-x-1/2 overflow-hidden rounded-[20px] border border-navy-line bg-white shadow-[0_16px_44px_rgba(7,39,108,0.08)]"
            data-testid={`project-image-${image.id}`}
            data-active={isCenter ? "true" : "false"}
            animate={{
              x,
              y,
              scale: isCenter ? 1 : 0.78,
              opacity: isVisible ? 1 : 0,
              zIndex: isCenter ? 3 : isVisible ? 2 : 1,
            }}
            initial={false}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
            }
            aria-hidden={!isVisible}
          >
            <ProjectImage image={image} priority={index < 3} />
          </motion.figure>
        );
      })}
    </div>
  );
}

function MobileCarousel({
  activeIndex,
  reduceMotion,
}: {
  activeIndex: number;
  reduceMotion: boolean | null;
}) {
  const image = projectImages[activeIndex];
  return (
    <div className="relative h-[460px] min-w-0 flex-1 overflow-hidden rounded-[20px] border border-navy-line bg-white shadow-[0_16px_44px_rgba(7,39,108,0.08)] lg:hidden">
      <motion.figure
        key={image.id}
        className="relative size-full"
        data-testid={`mobile-project-image-${image.id}`}
        initial={reduceMotion ? false : { opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectImage image={image} priority={activeIndex < 2} />
      </motion.figure>
    </div>
  );
}

export function OurDifferenceSection() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const move = (direction: -1 | 1) =>
    setActiveIndex(
      (current) => (current + direction + projectImages.length) % projectImages.length,
    );

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(() => move(1), AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <section
      className="border-t border-navy-line bg-navy-paper pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48"
      aria-labelledby="our-difference-title"
    >
      <div className={`${contentShell} text-center`}>
        <h2
          className="text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[56px] lg:text-[68px]"
          id="our-difference-title"
        >
          우리는 다르게 만듭니다.
        </h2>
        <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.6] text-navy-muted sm:mt-9 sm:text-[20px]">
          템플릿에 브랜드를 맞추는 것이 아니라,
          <br />
          브랜드에 맞춰 웹사이트를 설계합니다.
        </p>
      </div>

      <div
        className="mx-auto mt-20 w-full max-w-[1260px] px-3 sm:mt-24 sm:px-8 lg:mt-28 lg:px-6"
        data-testid="project-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className="relative">
          <DesktopCarousel activeIndex={activeIndex} reduceMotion={reduceMotion} />
          <div className="pointer-events-none absolute top-[280px] right-0 left-0 z-20 hidden -translate-y-1/2 justify-between lg:flex">
            <div className="pointer-events-auto">
              <ArrowButton direction="previous" onClick={() => move(-1)} />
            </div>
            <div className="pointer-events-auto">
              <ArrowButton direction="next" onClick={() => move(1)} />
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <ArrowButton direction="previous" onClick={() => move(-1)} />
            <MobileCarousel activeIndex={activeIndex} reduceMotion={reduceMotion} />
            <ArrowButton direction="next" onClick={() => move(1)} />
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {projectImages.length}개 중 {activeIndex + 1}번째 이미지
        </p>
      </div>

      <div className={`${contentShell} mt-24 text-center sm:mt-32 lg:mt-32`}>
        <p className="text-[30px] leading-[1.08] font-bold text-navy-ink sm:text-[40px] lg:text-[50px]">
          하나의 웹사이트를,
          <br />
          하나의 브랜드를 위해.
        </p>
        <p className="mt-8 text-[16px] leading-[1.6] text-navy-muted sm:text-[19px]">
          기획부터 디자인, 개발까지
          <br />
          비즈니스의 목적에 맞춰 설계합니다.
        </p>
      </div>
    </section>
  );
}
