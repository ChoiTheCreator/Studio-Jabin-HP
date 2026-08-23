import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";

import { StudioPrinciples } from "./StudioPrinciples";
import { WhyJabinTeaser } from "./WhyJabinTeaser";

export function StudioStatement() {
  return (
    <section className="bg-white text-navy-ink" id="approach" aria-labelledby="statement-title">
      <div className={`${contentShell} py-[88px] sm:py-28 lg:py-32`}>
        <Reveal>
          <p className={`${eyebrow} text-navy-primary`}>WHAT WE BELIEVE</p>
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" delay={60}>
          <h2
            className="m-0 max-w-[1080px] text-[40px] leading-[1.08] font-bold [word-break:keep-all] sm:text-[56px] lg:text-[72px]"
            id="statement-title"
          >
            당신의 웹사이트도,
            <br />
            어딘가에서 본 것 같지 않나요?
          </h2>
        </Reveal>

        <Reveal className="mt-10 max-w-[700px] sm:mt-12 lg:ml-auto lg:w-[58%]" delay={120}>
          <p className="m-0 text-[22px] leading-[1.45] font-bold [word-break:keep-all] text-navy-deep sm:text-[28px]">
            빠르게 만드는 건 어렵지 않습니다. 비슷하게 만들지 않는 게 더 어렵습니다.
          </p>
          <p className="mt-7 mb-0 max-w-[680px] text-[16px] leading-[1.7] [word-break:keep-all] text-navy-muted sm:text-[17px]">
            Jabin은 AI를 적극적으로 사용하지만 나온 결과를 그대로 내놓지 않습니다. 고객의 이야기를
            듣고 필요한 것을 함께 정한 뒤, 실제로 사용할 수 있는 서비스로 완성합니다.
          </p>
        </Reveal>

        <div className="mt-20 lg:mt-28">
          <Reveal className="border-t-2 border-navy-deep pt-5">
            <p className={`${eyebrow} text-navy-primary`}>HOW WE BUILD</p>
          </Reveal>

          <StudioPrinciples />
        </div>

        <WhyJabinTeaser />
      </div>
    </section>
  );
}
