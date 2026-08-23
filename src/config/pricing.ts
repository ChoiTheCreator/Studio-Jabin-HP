import type { InquiryType } from "./inquiry";

export type InquiryPricingItem = {
  label: string;
  value: string;
  detail?: string;
};

export type InquiryPricing = {
  headline: InquiryPricingItem;
  detail?: string;
  items?: readonly InquiryPricingItem[];
  disclaimer?: string;
};

const standardPricing: InquiryPricing = {
  headline: { label: "제작", value: "₩440,000부터" },
  detail: "상담을 통해 와이어프레임 시안과 예상 기획안, 예상 개발 소요일까지 무료로 받아보세요.",
  items: [
    { label: "범위", value: "기획·디자인·개발·출시" },
    { label: "기간", value: "상담 시 산정" },
    { label: "서버비용", value: "₩0부터", detail: "사용한 만큼 지불" },
    { label: "보증", value: "완료 후 6개월 무상" },
    { label: "", value: "소스코드 제공" },
  ],
  disclaimer: "관리비, 서버비는 별도입니다.",
};

const consultationOnlyPricing: InquiryPricing = {
  headline: { label: "상담", value: "무료 안내" },
  detail:
    "현재 서비스 상태와 개선 범위에 따라 견적이 달라져 정확한 금액은 상담에서 확인해 드립니다.",
};

/**
 * 문의 시나리오별 가격 안내.
 * concept, continuation은 동일한 정찰 가격을 보여주고,
 * improvement(운영 서비스 개선)는 범위가 케이스마다 달라 상담 유도형 문구만 노출한다.
 */
export const inquiryPricingByScenario: Record<InquiryType, InquiryPricing> = {
  concept: standardPricing,
  continuation: standardPricing,
  improvement: consultationOnlyPricing,
};
