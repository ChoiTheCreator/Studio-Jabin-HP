"use client";

import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell } from "@/components/ui/tailwind";

const projects = [
  {
    name: "이터널마케팅",
    url: "https://eternalmarketing.co.kr/",
    domain: "eternalmarketing.co.kr",
  },
  {
    name: "띵고 Thingo",
    url: "https://thingo.kr",
    domain: "thingo.kr",
  },
] as const;

const AUTO_PLAY_DELAY = 6_000;
const SLIDE_DURATION = 0.4;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%" }),
};

export function LiveProjectSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timerReset, setTimerReset] = useState(0);

  const activeProject = projects[activeIndex];

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = window.setTimeout(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length);
    }, AUTO_PLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, shouldReduceMotion, timerReset]);

  const selectProject = (nextIndex: number, nextDirection: number) => {
    setTimerReset((current) => current + 1);

    if (nextIndex === activeIndex) return;

    setDirection(nextDirection);
    setActiveIndex(nextIndex);
  };

  const showPrevious = () => {
    selectProject((activeIndex - 1 + projects.length) % projects.length, -1);
  };

  const showNext = () => {
    selectProject((activeIndex + 1) % projects.length, 1);
  };

  return (
    <section
      className="border-t border-navy-line bg-navy-paper pt-24 pb-32 sm:pt-32 lg:pt-40 lg:pb-40"
      id="why-conclusion"
      aria-labelledby="live-project-title"
    >
      <div className={contentShell}>
        <Reveal className="text-center">
          <h2
            className="m-0 text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[56px] lg:text-[68px]"
            id="live-project-title"
          >
            직접 확인해보세요.
          </h2>
          <p className="mt-6 mb-0 text-[17px] leading-[1.6] text-navy-muted sm:text-[20px]">
            Jabin Studio는 이렇게 만듭니다.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 w-full max-w-[820px] sm:mt-14 lg:mt-16" delay={120}>
          <a
            className="group/live-project block w-full rounded-lg border border-navy-line bg-navy-surface p-6 text-left text-navy-ink transition-[border-color,transform] duration-300 ease-out focus-visible:border-navy-primary motion-reduce:transition-none sm:p-10 lg:p-12 [@media(hover:hover)]:hover:border-navy-primary motion-safe:[@media(hover:hover)]:hover:-translate-y-1"
            href={activeProject.url}
            data-analytics-event="project_view"
            data-project-name="eternal_marketing"
            data-project-category="website"
            data-project-position="1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${activeProject.name} 실제 웹사이트 새 탭에서 열기`}
          >
            <div
              className="grid overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.article
                  key={activeProject.url}
                  className="col-start-1 row-start-1 flex min-h-[300px] w-full flex-col rounded-lg border border-navy-line bg-navy-surface p-6 text-left text-navy-ink sm:min-h-[340px] sm:p-10 lg:min-h-[366px] lg:p-12"
                  custom={direction}
                  variants={slideVariants}
                  initial={shouldReduceMotion ? false : "enter"}
                  animate="center"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  transition={{
                    duration: shouldReduceMotion ? 0 : SLIDE_DURATION,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${activeIndex + 1} / ${projects.length}`}
                >
                  <span className="block text-[12px] leading-[1.2] font-bold tracking-[0.04em] text-navy-primary">
                    LIVE PROJECT
                  </span>
                  <h3 className="mt-6 text-[34px] leading-[1.05] font-bold break-keep sm:text-[44px] lg:text-[52px]">
                    {activeProject.name}
                  </h3>

                  <a
                    className="group/project-link mt-auto block pt-8 text-navy-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy-primary"
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activeProject.name} 실제 웹사이트 새 탭에서 열기`}
                  >
                    <span className="flex min-h-13 min-w-0 items-center gap-3 rounded-lg border border-navy-line bg-navy-paper px-4 transition-[transform,background-color,border-color,color] duration-[220ms] ease-out group-focus-visible/project-link:border-navy-primary group-focus-visible/project-link:bg-navy-deep group-focus-visible/project-link:text-white motion-reduce:transform-none motion-reduce:transition-colors sm:px-5 [@media(hover:hover)]:group-hover/project-link:-translate-y-[3px] [@media(hover:hover)]:group-hover/project-link:border-navy-deep [@media(hover:hover)]:group-hover/project-link:bg-navy-deep [@media(hover:hover)]:group-hover/project-link:text-white">
                      <GlobeAltIcon
                        className="size-5 shrink-0 text-navy-primary transition-colors duration-[220ms] group-focus-visible/project-link:text-white [@media(hover:hover)]:group-hover/project-link:text-white"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 truncate text-[16px] font-bold sm:text-[18px]">
                        {activeProject.domain}
                      </span>
                      <ArrowUpRightIcon
                        className="size-5 shrink-0 transition-transform duration-[220ms] ease-out group-focus-visible/project-link:translate-x-[3px] group-focus-visible/project-link:-translate-y-[3px] motion-reduce:transform-none motion-reduce:transition-none motion-safe:[@media(hover:hover)]:group-hover/project-link:translate-x-[3px] motion-safe:[@media(hover:hover)]:group-hover/project-link:-translate-y-[3px]"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="mt-6 flex items-center justify-end gap-2 text-[13px] font-bold transition-colors duration-[220ms] group-focus-visible/project-link:text-navy-primary sm:mt-8 sm:text-[14px] [@media(hover:hover)]:group-hover/project-link:text-navy-primary">
                      <span>View Live</span>
                      <ArrowUpRightIcon
                        className="size-4 transition-transform duration-[220ms] ease-out group-focus-visible/project-link:translate-x-[3px] group-focus-visible/project-link:-translate-y-[3px] motion-reduce:transform-none motion-reduce:transition-none motion-safe:[@media(hover:hover)]:group-hover/project-link:translate-x-[3px] motion-safe:[@media(hover:hover)]:group-hover/project-link:-translate-y-[3px]"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </motion.article>
              </AnimatePresence>
            </div>

            <button
              className="group/previous absolute top-1/2 left-0 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-navy-line bg-navy-paper text-navy-ink transition-colors duration-200 ease-out hover:bg-navy-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy-primary lg:-left-16"
              type="button"
              onClick={showPrevious}
              aria-label="이전 프로젝트 보기"
            >
              <ChevronLeftIcon
                className="size-5 transition-transform duration-200 ease-out motion-safe:group-hover/previous:-translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>

            <button
              className="group/next absolute top-1/2 right-0 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-navy-line bg-navy-paper text-navy-ink transition-colors duration-200 ease-out hover:bg-navy-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy-primary lg:-right-16"
              type="button"
              onClick={showNext}
              aria-label="다음 프로젝트 보기"
            >
              <ChevronRightIcon
                className="size-5 transition-transform duration-200 ease-out motion-safe:group-hover/next:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>
          </a>

          <div className="mt-6 flex justify-center" aria-label="프로젝트 선택">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={project.url}
                  className="group/dot grid size-11 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-primary"
                  type="button"
                  onClick={() => selectProject(index, index > activeIndex ? 1 : -1)}
                  aria-label={`${project.name} 보기`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={`size-2 rounded-full transition-colors duration-200 ${
                      isActive ? "bg-navy-primary" : "bg-navy-line group-hover/dot:bg-navy-muted"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
