import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";

import { StudioPrinciples } from "./StudioPrinciples";

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

        <Reveal className="pt-20 sm:pt-24 lg:pt-28" delay={100}>
          <div
            id="jabin-system"
            className="grid gap-10 border-t-2 border-navy-deep pt-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16"
          >
            <p className={`${eyebrow} text-navy-primary`}>THE JABIN SYSTEM</p>
            <div>
              <h3 className="m-0 max-w-[880px] text-[36px] leading-[1.14] font-bold [word-break:keep-all] sm:text-[48px] lg:text-[58px]">
                첫 번째 결과물에서
                <br />
                멈추지 않는 제작 방식.
              </h3>
              <p className="mt-8 mb-0 max-w-[620px] text-[16px] leading-[1.72] [word-break:keep-all] text-navy-muted sm:text-[17px]">
                디자인부터 개발, 배포와 운영까지 Jabin이 프로젝트를 만드는 방식을 하나의 시스템으로
                연결했습니다.
              </p>
              <a
                className="mt-9 inline-flex min-h-12 items-center border-b border-navy-deep text-[14px] font-bold transition-colors duration-200 hover:border-navy-primary hover:text-navy-primary"
                href="#engineering"
              >
                Explore the Jabin System →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
