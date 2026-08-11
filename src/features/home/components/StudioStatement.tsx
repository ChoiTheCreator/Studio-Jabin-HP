import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";

const studioFacts = [
  { value: "03", label: "Core team" },
  { value: "05", label: "Delivery phases" },
  { value: "01", label: "Integrated partner" },
] as const;

export function StudioStatement() {
  return (
    <section className="bg-white text-navy-ink" id="approach" aria-labelledby="statement-title">
      <div className={`${contentShell} py-[88px] sm:py-28 lg:py-32`}>
        <Reveal className="grid gap-9 lg:grid-cols-[0.75fr_2.25fr] lg:gap-16">
          <p className="m-0 text-[12px] font-bold text-navy-primary">WHAT WE BELIEVE</p>
          <div>
            <h2
              className="m-0 max-w-[880px] text-[34px] leading-[1.18] font-bold [word-break:keep-all] sm:text-[44px] lg:text-[52px]"
              id="statement-title"
            >
              좋은 서비스는 보기 좋은 화면을 넘어, 실제 업무와 운영 안에서 오래 작동해야 합니다.
            </h2>
            <p className="mt-7 mb-0 max-w-[680px] text-[16px] leading-[1.7] [word-break:keep-all] text-navy-muted sm:text-[17px]">
              Jabin은 전략, 디자인, 개발을 따로 넘기지 않습니다. 고객의 목표를 구조로 바꾸고, 같은
              판단 기준으로 구축과 운영까지 이어갑니다.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16 grid grid-cols-3 border-t border-navy-line lg:mt-24" delay={120}>
          {studioFacts.map((fact, index) => (
            <div
              className={`flex min-h-[132px] flex-col items-start justify-between border-r border-b border-navy-line px-3 py-5 last:border-r-0 sm:min-h-[164px] sm:px-6 sm:first:pl-0 ${
                index === studioFacts.length - 1 ? "sm:pr-0" : ""
              }`}
              key={fact.label}
            >
              <span className="text-[48px] leading-none font-bold text-navy-deep">
                {fact.value}
              </span>
              <span className={`${eyebrow} text-[11px] text-navy-muted sm:text-[12px]`}>
                {fact.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
