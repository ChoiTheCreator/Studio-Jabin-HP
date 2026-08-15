import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

import { InquiryForm } from "./InquiryForm";

export function InquirySection() {
  return (
    <section
      className="bg-navy-night py-22 text-white sm:py-28 lg:py-32"
      id="contact"
      aria-labelledby="inquiry-title"
    >
      <div className={contentShell}>
        <div className="grid gap-10 border-b border-white/35 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.72fr)] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <Reveal>
              <p className={eyebrow}>START A PROJECT</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="mt-9 mb-0 text-[38px] leading-[1.08] font-bold break-keep sm:text-[46px] lg:text-[54px]"
                id="inquiry-title"
              >
                지금 가진 것부터,
                <br />
                함께 시작합니다.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150} className="grid gap-6.5 lg:pb-1">
            <p className="m-0 max-w-117.5 text-[16px] leading-[1.55] break-keep text-white/70">
              정리된 기획이 없어도, 진행 중인 작업이나 운영 중인 서비스가 있어도 괜찮습니다. 현재
              상태를 확인하고 필요한 다음 단계를 함께 정리합니다.
            </p>
            <a
              className="w-fit border-b border-current text-[18px] font-bold"
              href={`mailto:${brand.contactEmail}`}
            >
              {brand.contactEmail}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14 sm:mt-18 lg:mt-22">
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
