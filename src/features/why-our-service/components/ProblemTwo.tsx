import { contentShell } from "@/components/ui/tailwind";

import { BusinessCompressionStage } from "./BusinessCompressionStage";

const businesses = [
  {
    id: "reservation",
    name: "소수 예약제 식당",
    asset: "/images/why-our-service/예약 식당 카드.svg",
    background: "#E3E8EE",
    position: "left" as const,
  },
  {
    id: "single-menu",
    name: "단일 메뉴 전문 식당",
    asset: "/images/why-our-service/전문 식당 카드.svg",
    background: "#EFE5D6",
    position: "right" as const,
  },
  {
    id: "seasonal",
    name: "제철 식재료 중심 식당",
    asset: "/images/why-our-service/제철 식당 카드.svg",
    background: "#E5EBDD",
    position: "bottom" as const,
  },
] as const;

function ProblemTwoIntro() {
  return (
    <div className={`${contentShell} pt-28 pb-2 sm:pt-40 sm:pb-3 lg:pt-48 lg:pb-4`}>
      <p className="mb-7 text-[18px] font-bold text-navy-primary sm:mb-9 sm:text-[20px]">02</p>
      <h2
        className="max-w-[900px] text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[56px] lg:text-[68px]"
        id="problem-two-title"
      >
        같은 업종이라고,
        <br />
        같은 비즈니스는 아닙니다.
      </h2>
      <p className="mt-8 max-w-[590px] text-[17px] leading-[1.65] text-navy-muted sm:mt-10 sm:text-[20px]">
        같은 ‘레스토랑’이라는 이름 아래에도
        <br />
        전혀 다른 운영 방식과 가치가 존재합니다.
      </p>
    </div>
  );
}

export function ProblemTwo() {
  return (
    <section
      className="border-t border-navy-line bg-navy-paper"
      id="why-problem-2"
      aria-labelledby="problem-two-title"
    >
      <ProblemTwoIntro />
      <BusinessCompressionStage
        businesses={businesses}
        genericAsset="/images/why-our-service/전형적인 식당 카드.svg"
      />
    </section>
  );
}
