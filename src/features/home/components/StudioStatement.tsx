import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, pageShell } from "@/components/ui/tailwind";

export function StudioStatement() {
  return (
    <section className="relative z-[2] overflow-hidden bg-lime" aria-labelledby="statement-title">
      <div className="overflow-hidden border-b border-ink" aria-hidden="true">
        <div className="flex w-max animate-marquee items-center gap-6 py-3 text-[14px] font-bold whitespace-nowrap motion-reduce:animate-none">
          <span>STRATEGY INTO FORM</span>
          <i className="text-[8px] not-italic text-red">●</i>
          <span>FORM INTO FUNCTION</span>
          <i className="text-[8px] not-italic text-red">●</i>
          <span>STRATEGY INTO FORM</span>
          <i className="text-[8px] not-italic text-red">●</i>
          <span>FORM INTO FUNCTION</span>
          <i className="text-[8px] not-italic text-red">●</i>
        </div>
      </div>
      <div className={`${pageShell} py-[88px] sm:py-28 lg:py-36`}>
        <Reveal>
          <p className={eyebrow}>WHAT WE BELIEVE</p>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="mt-[54px] mb-0 max-w-[1250px] text-[38px] leading-[1.06] font-bold [word-break:keep-all] sm:text-[54px] lg:mt-[72px] lg:text-[74px] min-[1440px]:!text-[82px]"
            id="statement-title"
          >
            좋은 아이디어는 보기 좋은 화면에 머물지 않습니다. 브랜드의 언어가 되고,
            사용자의 행동이 되고, 오래 운영할 수 있는 제품이 되어야 합니다.
          </h2>
        </Reveal>
        <Reveal
          className="mt-[72px] grid gap-7 border-t border-ink pt-[18px] sm:grid-cols-[1fr_2fr] lg:mt-28 lg:grid-cols-2"
          delay={180}
        >
          <span className="text-[11px] font-bold">(01 — APPROACH)</span>
          <p className="m-0 max-w-[600px] text-[17px] leading-[1.6] [word-break:keep-all] lg:justify-self-end">
            Jabin은 전략부터 디자인과 개발까지 한 팀으로 움직입니다. 의도를 잃지 않고
            실제 작동하는 결과물까지 연결합니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
