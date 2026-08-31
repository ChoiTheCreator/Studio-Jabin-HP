"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { eyebrow } from "@/components/ui/tailwind";

const sceneDuration = 2800;

const scenes = [
  {
    label: "BRAND, NOT TEMPLATE",
    title: "다른 브랜드가, 같은 구조를 가질 이유는 없습니다.",
    visual: <StructurePreview />,
  },
  {
    label: "BUSINESS, NOT CATEGORY",
    title: "같은 업종이, 같은 비즈니스를 의미하지 않습니다.",
    visual: <BusinessPreview />,
  },
  // {
  //   label: "USED, NOT DISPLAYED",
  //   title: "화면은 실제 사용되는 순간에 완성됩니다.",
  //   visual: <ResponsivePreview />,
  // },
] as const;

export function WhyJabinTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || activeScene === scenes.length - 1) return;

    const timer = window.setTimeout(() => setActiveScene((scene) => scene + 1), sceneDuration);
    return () => window.clearTimeout(timer);
  }, [activeScene, started]);

  return (
    <div
      className={`why-jabin scroll-mt-28 border-t-2 border-navy-deep pt-6 ${started ? "why-jabin--started" : ""}`}
      id="jabin-system"
      ref={sectionRef}
    >
      <p className={`${eyebrow} text-navy-primary`}>WHY JABIN?</p>

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.48fr)] lg:items-end lg:gap-16">
        <h3 className="m-0 max-w-[820px] overflow-hidden text-[42px] leading-[1.04] font-bold [word-break:keep-all] sm:text-[58px] lg:text-[72px]">
          <span className="why-jabin__headline-line block">왜 다른지,</span>
          <span className="why-jabin__headline-line block">직접 보여드리겠습니다.</span>
        </h3>
        <p className="m-0 max-w-[420px] text-[16px] leading-[1.65] [word-break:keep-all] text-navy-muted sm:text-[18px]">
          비슷해 보이는 결과물도
          <br />
          만드는 방식에 따라 달라집니다.
        </p>
      </div>

      {/* <div
        className="relative min-h-[430px] overflow-hidden border-b border-navy-line bg-navy-surface sm:min-h-[460px] lg:min-h-[400px]"
        aria-label="Jabin이 다르게 만드는 두 가지 관점"
        data-testid="why-jabin-stage"
        data-scene={activeScene}
      >
        <ol className="sr-only">
          {scenes.map((scene) => (
            <li key={scene.label}>{scene.title}</li>
          ))}
        </ol>

        {scenes.map((scene, index) => (
          <div
            aria-hidden="true"
            className={`why-jabin-scene absolute inset-0 grid content-start gap-8 p-6 sm:p-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:p-12 ${
              activeScene === index ? "why-jabin-scene--active" : ""
            }`}
            key={scene.label}
          >
            <div className="self-start lg:self-center">
              <p className={`${eyebrow} text-navy-primary`}>{scene.label}</p>
              <p className="mt-5 max-w-[420px] text-[28px] leading-[1.12] font-bold [word-break:keep-all] sm:text-[36px] lg:text-[42px]">
                {scene.title}
              </p>
            </div>
            <div className="min-w-0 self-end lg:self-center">{scene.visual}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export function WhyOurServiceCta() {
  return (
    <Link
      className="group mt-20 block border-y border-navy-deep text-navy-ink transition-colors duration-300 hover:bg-navy-primary hover:text-white focus-visible:bg-navy-primary focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-primary"
      href="/why-our-service"
      id="why-our-service-cta"
      data-analytics-event="cta_click"
      data-cta-name="view_service"
      data-section-name="why_jabin"
      data-destination="/why-our-service"
    >
      <span className="block border-b border-navy-line px-0 py-5 transition-[padding,border-color] duration-300 group-hover:border-white/40 group-hover:px-6 group-focus-visible:border-white/40 group-focus-visible:px-6">
        <span className={`${eyebrow} text-navy-primary transition-colors group-hover:text-white group-focus-visible:text-white`}>
          WHY JABIN SYSTEM?
        </span>
      </span>

      <span className="grid min-h-[176px] px-0 py-8 transition-[padding] duration-300 group-hover:px-6 group-focus-visible:px-6 sm:min-h-[200px] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:py-10">
        <span className="max-w-[920px] text-[28px] leading-[1.15] font-bold [word-break:keep-all] sm:text-[36px] lg:text-[44px]">
          세 가지 원칙이 실제 결과로 이어지는 방식을 확인해보세요.
        </span>
        <span
          aria-hidden="true"
          className="mt-8 text-[36px] leading-none transition-transform duration-300 group-hover:translate-x-3 group-focus-visible:translate-x-3 sm:mt-0 sm:text-[48px]"
        >
          →
        </span>
      </span>
    </Link>
  );
}

function StructurePreview() {
  return (
    <div className="grid grid-cols-3 border-y border-navy-line bg-white">
      {["HOTEL", "CAFE", "WORKSPACE"].map((label, index) => (
        <div className="border-r border-navy-line p-3 last:border-r-0 sm:p-5" key={label}>
          <p className="text-[9px] font-bold text-navy-primary sm:text-[11px]">{label}</p>
          <div className="mt-6 space-y-3 sm:mt-8">
            <span className="block h-2 w-2/3 bg-navy-deep" />
            <span className="block h-px w-full bg-navy-line" />
            <span
              className={`block h-16 bg-navy-tint sm:h-24 ${index === 1 ? "translate-y-2" : ""}`}
            />
            <span className="block h-px w-4/5 bg-navy-line" />
            <span className="block h-px w-1/2 bg-navy-line" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BusinessPreview() {
  return (
    <div className="grid border-y border-navy-line bg-white sm:grid-cols-[1fr_1.1fr]">
      <div className="divide-y divide-navy-line border-b border-navy-line sm:border-r sm:border-b-0">
        {["예약 중심", "단일 메뉴", "제철 중심"].map((item) => (
          <p
            className="m-0 px-4 py-4 text-[15px] font-bold sm:px-6 sm:py-5 sm:text-[17px]"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-[10px] font-bold text-navy-muted">GENERIC RESTAURANT UI</p>
        <div className="mt-5 grid grid-cols-[1fr_0.65fr] gap-3">
          <span className="h-24 bg-navy-tint sm:h-32" />
          <span className="h-24 border border-navy-line sm:h-32" />
        </div>
      </div>
    </div>
  );
}

export function ResponsivePreview() {
  return (
    <div className="flex min-h-[240px] items-center justify-center border-y border-navy-line bg-white px-4 sm:min-h-[280px]">
      <div className="why-jabin-viewport border border-navy-deep bg-white p-3 sm:p-4">
        <div className="flex items-center justify-between border-b border-navy-line pb-3">
          <span className="h-2 w-16 bg-navy-deep" />
          <span className="text-[9px] font-bold text-navy-primary">1440 → 390</span>
        </div>
        <div className="mt-4 grid grid-cols-[1.2fr_0.8fr] gap-3">
          <span className="h-28 bg-navy-tint sm:h-32" />
          <span className="h-28 border border-navy-line sm:h-32" />
        </div>
      </div>
    </div>
  );
}

export function OwnershipStatement() {
  return (
    <div
      className="mt-20 grid gap-10 border-y border-navy-line bg-navy-surface px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-12 lg:py-20"
      id="ownership"
    >
      <div>
        <p className={`${eyebrow} text-navy-primary`}>OWNERSHIP, NOT HANDOFF</p>
        <h3 className="mt-6 max-w-[560px] text-[36px] leading-[1.1] font-bold [word-break:keep-all] sm:text-[46px] lg:text-[54px]">
          출시 뒤 생기는 문제도
          <br />
          함께 봅니다.
        </h3>
      </div>
      <div className="border-y border-navy-line bg-white px-5 py-9 sm:px-8 sm:py-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-5 text-[14px] font-bold sm:gap-x-4 sm:text-[17px]">
          {["MONITOR", "MAINTAIN", "IMPROVE"].map((item, index) => (
            <div className="flex items-center gap-3 sm:gap-4" key={item}>
              <span className={index === 0 ? "text-navy-deep" : "text-navy-primary"}>{item}</span>
              {index < 2 && <span className="text-navy-muted">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-10 h-px bg-navy-line">
          <span className="why-jabin-operation-line block h-px origin-left bg-navy-primary" />
        </div>
        <p className="mt-5 text-[11px] font-bold text-navy-primary sm:text-[12px]">
          LAUNCH IS NOT A HANDOFF
        </p>
      </div>
    </div>
  );
}
