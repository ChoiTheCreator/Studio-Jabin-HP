import { contentShell } from "@/components/ui/tailwind";

import { ResponsivePlayground } from "./ResponsivePlayground";

export function ProblemThree() {
  return (
    <section
      className="border-t border-navy-line bg-navy-paper"
      id="why-problem-3"
      aria-labelledby="problem-three-title"
    >
      <div className={`${contentShell} pt-28 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24`}>
        <p className="mb-7 text-[18px] font-bold text-navy-primary sm:mb-9 sm:text-[20px]">03</p>
        <h2
          className="max-w-[900px] text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[56px] lg:text-[68px]"
          id="problem-three-title"
        >
          처음에는 완성돼 보이지만,
          <br />
          직접 써보면 불편함이 드러납니다.
        </h2>
      </div>

      <ResponsivePlayground />

      <div
        className={`${contentShell} flex justify-center pt-16 pb-32 text-center sm:justify-end sm:pt-20 sm:pb-40 sm:text-right lg:pt-24 lg:pb-48`}
      >
        <p className="text-[24px] leading-[1.08] font-bold text-navy-ink sm:text-right sm:text-[28px] lg:text-[34px]">
          우리는 각 화면에서의 경험까지
          <br />
          설계합니다.
        </p>
      </div>
    </section>
  );
}
