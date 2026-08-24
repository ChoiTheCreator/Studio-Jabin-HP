import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";

import { StudioPrinciples } from "./StudioPrinciples";
import { WhyJabinTeaser, WhyOurServiceCta } from "./WhyJabinTeaser";

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
            빨리 만드는 것보다, 제대로 다르게 만드는 것.
          </p>
          <p className="mt-7 mb-0 max-w-[680px] text-[16px] leading-[1.7] [word-break:keep-all] text-navy-muted sm:text-[17px]">
            <strong className="font-bold text-navy-deep">
              멋진 레퍼런스가 있다면, 당연히 봅니다.
            </strong>{" "}
            다만 그대로 따라 만들지는 않습니다. 고객이 무엇을 좋아하는지, 왜 그 디자인에 끌리는지
            함께 살펴보고, 그 감각을 프로젝트의 목적과 브랜드에 맞게 다시 풀어냅니다.
          </p>
        </Reveal>

        <WhyJabinTeaser />

        <div className="mt-20 lg:mt-28">
          <Reveal className="border-t-2 border-navy-deep pt-5">
            <p className={`${eyebrow} text-navy-primary`}>HOW WE BUILD</p>
          </Reveal>

          <StudioPrinciples />
          <WhyOurServiceCta />
          {/* <OwnershipStatement /> */}
        </div>

      </div>
    </section>
  );
}
