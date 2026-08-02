import Image from "next/image";

import { brand } from "@/config/brand";

type ProjectVisualProps = {
  variant: "studio" | "archive" | "common";
  title: string;
  className?: string;
};

const visualBase = "relative isolate aspect-[4/3] overflow-hidden rounded-[6px]";

export function ProjectVisual({ variant, title, className = "" }: ProjectVisualProps) {
  if (variant === "studio") {
    return (
      <div className={`${visualBase} ${className}`}>
        <Image
          src={brand.assets.hero}
          alt={`${title} 콘셉트 이미지`}
          fill
          loading="eager"
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover/project:scale-[1.035]"
        />
        <span className="absolute right-3.5 bottom-3.5 bg-lime px-2.5 py-2 text-[10px] font-bold">
          JABIN / 01
        </span>
      </div>
    );
  }

  if (variant === "archive") {
    return (
      <div
        className={`${visualBase} grid grid-cols-[0.9fr_1.1fr] gap-4 bg-[#d7d2c7] p-6 sm:gap-7 sm:p-[42px] ${className}`}
        aria-label={`${title} 인터페이스 콘셉트`}
      >
        <div className="flex flex-col bg-blue px-3.5 py-5 text-white sm:px-[22px] sm:py-7">
          <p className="m-0 text-[11px] font-bold">ORBITAL</p>
          <span className="mt-1 text-[11px]">ARCHIVE</span>
          <b className="mt-auto text-[54px] leading-[0.8] sm:text-[86px]">O/A</b>
        </div>
        <div className="self-center rotate-3 bg-white p-4 shadow-[0_18px_38px_rgba(17,17,15,0.15)] sm:p-[22px]">
          <span className="mb-3 block text-[7px]">INDEX / 024</span>
          <div className="aspect-[4/3] border-[10px] border-[#e7e4de] bg-ink" />
          <p className="mt-[11px] mb-0 text-[8px] leading-[1.4]">
            Objects, records and conversations in perpetual motion.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${visualBase} bg-red p-[22px] text-ink ${className}`}
      aria-label={`${title} 모바일 인터페이스 콘셉트`}
    >
      <div className="absolute top-6 left-5 text-[34px] leading-[0.82] font-bold text-lime sm:top-[42px] sm:left-10 sm:text-[60px]">
        COMMON<br />GROUND
      </div>
      <div className="absolute top-[10%] right-[10%] aspect-[9/17] w-[46%] rotate-[7deg] rounded-[22px] border-[5px] border-ink bg-paper p-3 shadow-[12px_16px_0_var(--color-ink)] sm:right-[14%] sm:w-[38%] sm:p-[18px]">
        <div className="flex justify-between text-[7px] font-bold"><span>CG</span><span>MENU</span></div>
        <div className="mt-3 h-[42%] rounded-[2px] bg-blue" />
        <p className="my-3.5 text-[11px] font-bold">오늘의 동네 이야기</p>
        <div className="mb-1.5 h-[5px] w-full bg-ink/20" />
        <div className="mb-1.5 h-[5px] w-[58%] bg-ink/20" />
      </div>
      <span className="absolute bottom-[18px] left-5 text-[12px] font-bold sm:bottom-8 sm:left-10">C/G</span>
    </div>
  );
}
