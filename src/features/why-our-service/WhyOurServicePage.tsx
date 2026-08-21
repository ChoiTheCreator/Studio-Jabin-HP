import { contentShell } from "@/components/ui/tailwind";

import { WebsiteComparisonStage } from "./components/WebsiteComparisonStage";
import { ProblemTwo } from "./components/ProblemTwo";
import { ProblemThree } from "./components/ProblemThree";
import { OurDifferenceSection } from "./components/OurDifferenceSection";
import { SectionIndexIndicator } from "./components/SectionIndexIndicator";

const websites = [
  {
    name: "호텔",
    original: "/images/why-our-service/hotel_full.png",
    bone: "/images/why-our-service/hotel_bone.png",
    width: 2880,
    height: 8110,
  },
  {
    name: "카페",
    original: "/images/why-our-service/cafe_full.png",
    bone: "/images/why-our-service/cafe_bone.png",
    width: 2880,
    height: 8132,
  },
  {
    name: "업무 도구",
    original: "/images/why-our-service/saas_full.png",
    bone: "/images/why-our-service/saas_bone.png",
    width: 2880,
    height: 6100,
  },
] as const;

function WhyHero() {
  return (
    <section
      className="flex min-h-[52dvh] items-center bg-navy-paper py-14 sm:min-h-[56dvh] sm:py-16"
      aria-labelledby="why-hero-title"
    >
      <div className={`${contentShell} text-center`}>
        <p className="mb-7 text-[30px] leading-none font-bold text-navy-primary sm:mb-9 sm:text-[38px] lg:text-[44px]">
          WHY OUR SERVICE?
        </p>
        <h1
          className="mx-auto max-w-[920px] text-[38px] leading-[1.04] font-bold text-navy-ink sm:text-[54px] lg:text-[68px]"
          id="why-hero-title"
        >
          <span className="block">JB Studio의 웹사이트는</span>
          <span className="block">양산형 사이트들과 다릅니다.</span>
        </h1>
      </div>
    </section>
  );
}

function ProblemIntro() {
  return (
    <div className={`${contentShell} pt-24 pb-8 sm:pt-32 sm:pb-10 lg:pt-40 lg:pb-12`}>
      <p className="mb-7 text-[18px] font-bold text-navy-primary sm:mb-9 sm:text-[20px]">01</p>
      <h2 className="max-w-[850px] text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[56px] lg:text-[68px]">
        서로 다른 비즈니스,
        <br />
        익숙한 구조.
      </h2>
      <p className="mt-8 max-w-[560px] text-[17px] leading-[1.65] text-navy-muted sm:mt-10 sm:text-[20px]">
        호텔, 카페, 업무 도구.
        <br />
        업종도 브랜드도 다르지만,
        <br />
        표현 방식은 비슷한 구조로 수렴합니다.
      </p>
    </div>
  );
}

function ProblemFraming() {
  return (
    <section className="bg-navy-deep py-12 sm:py-16" aria-label="양산형 웹사이트의 문제">
      <div className={contentShell}>
        <p className="text-[22px] leading-[1.25] font-bold text-white sm:text-[28px] lg:text-[34px]">
          <span className="text-white/55">아래 세 가지는,</span>
          <br className="sm:hidden" /> 양산형 웹사이트에서 반복되는 문제입니다.
        </p>
      </div>
    </section>
  );
}

export function WhyOurServicePage() {
  return (
    <main className="bg-navy-paper">
      <SectionIndexIndicator />
      <WhyHero />
      <ProblemFraming />
      <section
        className="border-t border-navy-line"
        id="why-problem-1"
        aria-labelledby="problem-one-title"
      >
        <ProblemIntro />
        <h2 className="sr-only" id="problem-one-title">
          서로 다른 비즈니스의 홈페이지 구조 비교
        </h2>
        <WebsiteComparisonStage websites={websites} />
      </section>
      <ProblemTwo />
      <ProblemThree />
      <OurDifferenceSection />
    </main>
  );
}
