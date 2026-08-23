"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type Website = {
  readonly name: string;
  readonly original: string;
  readonly bone: string;
  readonly width: number;
  readonly height: number;
};

type WebsiteComparisonStageProps = {
  websites: readonly Website[];
};

type WebsiteViewportProps = {
  website: Website;
  progress: MotionValue<number>;
};

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => setSize({ width: element.clientWidth, height: element.clientHeight });
    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

function WebsiteViewport({ website, progress }: WebsiteViewportProps) {
  const { ref, size } = useElementSize<HTMLDivElement>();
  const renderedImageHeight = size.width * (website.height / website.width);
  const maxTravel = Math.max(0, renderedImageHeight - size.height);
  const summaryScale = renderedImageHeight > 0 ? Math.min(1, size.height / renderedImageHeight) : 1;

  const y = useTransform(progress, [0, 0.1, 0.78, 1], [0, 0, -maxTravel, 0]);
  const scale = useTransform(progress, [0, 0.78, 1], [1, 1, summaryScale]);
  const originalOpacity = useTransform(progress, [0, 0.35, 0.58, 1], [1, 1, 0, 0]);
  const boneOpacity = useTransform(progress, [0, 0.35, 0.58, 1], [0, 0, 1, 1]);

  return (
    <article
      className="w-[84vw] shrink-0 snap-center sm:w-auto sm:min-w-0"
      data-testid={`website-${website.name}`}
    >
      <h3 className="mb-2 text-[12px] font-bold text-navy-ink sm:text-[13px]">{website.name}</h3>
      <div className="overflow-hidden rounded-[14px] border border-navy-line bg-white">
        <div className="flex h-9 items-center border-b border-navy-line px-3" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-navy-line" />
          <span className="ml-1.5 size-1.5 rounded-full bg-navy-line" />
          <span className="ml-1.5 size-1.5 rounded-full bg-navy-line" />
        </div>
        <div
          ref={ref}
          className="relative h-[min(460px,56dvh)] overflow-hidden bg-navy-surface sm:h-[500px] lg:h-[min(620px,66dvh)]"
        >
          <motion.div
            className="absolute top-0 left-0 w-full origin-top will-change-transform motion-reduce:hidden"
            style={{ y, scale }}
          >
            <motion.div
              data-testid={`original-${website.name}`}
              style={{ opacity: originalOpacity }}
            >
              <Image
                className="block h-auto w-full"
                src={website.original}
                alt={`${website.name} 홈페이지 원본 전체 화면`}
                width={website.width}
                height={website.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 31vw, 88vw"
                loading="eager"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              data-testid={`bone-${website.name}`}
              style={{ opacity: boneOpacity }}
            >
              <Image
                className="block h-auto w-full"
                src={website.bone}
                alt={`${website.name} 홈페이지 전체 구조 보기`}
                width={website.width}
                height={website.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 31vw, 88vw"
              />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 hidden items-start justify-center motion-reduce:flex">
            <Image
              className="h-full w-full object-contain object-top"
              src={website.bone}
              alt={`${website.name} 홈페이지 전체 구조 정적 비교`}
              width={website.width}
              height={website.height}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 31vw, 88vw"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function WebsiteComparisonStage({ websites }: WebsiteComparisonStageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const resettingRef = useRef(false);
  const [completed, setCompleted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const storyProgress = useTransform(scrollYProgress, [0, 0.62], [0, 1], { clamp: true });
  const completedProgress = useMotionValue(1);
  const displayProgress = completed ? completedProgress : storyProgress;

  useMotionValueEvent(storyProgress, "change", (latest) => {
    if (resettingRef.current) {
      if (latest <= 0.02) resettingRef.current = false;
      return;
    }

    if (latest >= 0.995) setCompleted(true);
  });

  const stageBackground = useTransform(
    displayProgress,
    [0, 0.68, 1],
    ["rgba(246,246,246,0)", "rgba(246,246,246,0)", "rgba(246,246,246,1)"],
  );
  const conclusionOpacity = useTransform(displayProgress, [0, 0.84, 0.96], [0, 0, 1]);
  const conclusionY = useTransform(displayProgress, [0, 0.84, 0.96], [18, 18, 0]);

  const restartComparison = () => {
    resettingRef.current = true;
    setCompleted(false);
    sectionRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative h-[300dvh] motion-reduce:h-auto"
      data-testid="comparison-stage"
    >
      <motion.div
        className="sticky top-0 flex min-h-[100dvh] items-start overflow-hidden pt-8 pb-12 motion-reduce:relative motion-reduce:min-h-0 motion-reduce:bg-navy-surface motion-reduce:py-8 sm:pt-10 lg:pt-12"
        style={{ backgroundColor: stageBackground }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6">
            {websites.map((website) => (
              <WebsiteViewport key={website.name} website={website} progress={displayProgress} />
            ))}
          </div>
          <p className="mt-3 text-center text-[12px] leading-[1.45] text-navy-muted sm:hidden">
            세 화면은 같은 진행률로 움직입니다.
          </p>
          <motion.div
            className="mt-5 grid gap-4 text-center opacity-0 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 sm:mt-6 sm:grid-cols-2 sm:items-end sm:text-left lg:mt-7"
            style={{ opacity: conclusionOpacity, y: conclusionY }}
          >
            <p className="text-[16px] leading-[1.35] font-bold text-navy-muted sm:text-[18px] lg:text-[20px]">
              색과 콘텐츠를 걷어내면,
              <br />
              익숙한 구조가 남습니다.
            </p>
            <div className="sm:text-right">
              <p className="text-[24px] leading-[1.08] font-bold text-navy-ink sm:text-[28px] lg:text-[34px]">
                템플릿이 아니라,
                <br />
                브랜드에서부터 시작합니다.
              </p>
              <button
                className={`mt-3 min-h-10 rounded-full border border-navy-ink px-5 text-[12px] font-bold text-navy-ink transition-[background-color,color,transform] duration-200 hover:bg-navy-ink hover:text-white active:scale-[0.98] motion-reduce:hidden ${completed ? "visible opacity-100" : "invisible opacity-0"}`}
                type="button"
                onClick={restartComparison}
              >
                원본 다시 보기
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
