"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

import type { InquiryType } from "@/config/inquiry";

const inquiryScenarios = [
  {
    id: "concept",
    number: "01",
    title: "아이디어를 구체화하고 싶으신가요?",
    description: "기획부터 디자인, 개발과 배포까지 함께합니다.",
    orderClass: "[order:10]",
  },
  {
    id: "continuation",
    number: "02",
    title: "진행 중인 프로젝트가 있으신가요?",
    description: "기획서, 디자인과 코드부터 이어서 진행합니다.",
    orderClass: "[order:30]",
  },
  {
    id: "improvement",
    number: "03",
    title: "운영 중인 서비스를 개선하고 싶으신가요?",
    description: "기능, 성능, 인프라와 운영 문제를 해결합니다.",
    orderClass: "[order:50]",
  },
] as const;

type InquiryScenarioSelectorProps = {
  error?: string;
  selectedScenario: InquiryType | "";
  onChange: (scenario: InquiryType | "") => void;
};

export function InquiryScenarioSelector({
  error,
  selectedScenario,
  onChange,
}: InquiryScenarioSelectorProps) {
  return (
    <>
      {inquiryScenarios.map((item) => {
        const selected = selectedScenario === item.id;

        return (
          <button
            className={`group relative grid min-h-34 w-full cursor-pointer grid-cols-[30px_minmax(0,1fr)_30px] items-start gap-x-3 border-t border-white/25 py-7 text-left transition-[border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none sm:min-h-42 sm:grid-cols-[44px_minmax(0,1fr)_44px] sm:gap-x-5 sm:py-9 lg:min-h-48 lg:grid-cols-[54px_minmax(0,1fr)_64px] lg:py-10 ${item.orderClass} ${selected ? "border-b border-navy-signal" : ""} ${item.id === "improvement" ? "border-b" : ""}`}
            type="button"
            key={item.id}
            aria-expanded={selected}
            aria-controls={selected ? "inquiry-details" : undefined}
            onClick={() => onChange(selected ? "" : item.id)}
          >
            <span
              className={`pt-1 text-[11px] font-bold transition-colors duration-300 motion-reduce:transition-none sm:pt-2 sm:text-[12px] ${selected ? "text-navy-signal" : "text-white/55"}`}
            >
              {item.number}
            </span>
            <span
              className={`text-[28px] leading-[1.1] font-bold break-keep transition-colors duration-300 group-hover:text-white/80 motion-reduce:transition-none sm:text-[40px] lg:text-[52px] ${selected ? "text-white" : "text-white/55"}`}
            >
              {item.title}
            </span>
            <ArrowRightIcon
              className={`mt-0.5 size-7 text-white transition-[opacity,transform] duration-300 group-hover:opacity-70 motion-reduce:transition-none sm:mt-1 sm:size-10 lg:size-12 ${selected ? "rotate-90 opacity-100" : "opacity-30 group-hover:translate-x-1"}`}
              aria-hidden="true"
            />
            <span
              className={`col-start-2 mt-3 max-w-150 text-[13px] leading-[1.55] break-keep transition-colors duration-300 group-hover:text-white/80 motion-reduce:transition-none sm:mt-4 sm:text-[15px] ${selected ? "text-white/80" : "text-white/65"}`}
            >
              {item.description}
            </span>
          </button>
        );
      })}
      {error ? (
        <span className="[order:70] mt-0.5 mb-2.5 block text-[12px] text-red-300">{error}</span>
      ) : null}
    </>
  );
}
