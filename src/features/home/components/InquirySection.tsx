import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

import { InquiryForm } from "./InquiryForm";

export function InquirySection() {
  return (
    <section
      className="bg-navy-primary py-22 text-white sm:py-28 lg:py-32"
      id="contact"
      aria-labelledby="inquiry-title"
    >
      <div
        className={`${contentShell} grid gap-18 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-20`}
      >
        <div>
          <Reveal>
            <p className={eyebrow}>START A PROJECT</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-9 mb-0 text-[38px] leading-[1.08] font-bold break-keep sm:text-[46px] lg:text-[54px]"
              id="inquiry-title"
            >
              필요한 시스템을,
              <br />
              함께 정의합시다.
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-12 grid gap-6.5 border-t border-white/35 pt-4.5">
            <p className="m-0 max-w-117.5 text-[16px] leading-[1.55] break-keep text-white/70">
              현재 상황과 필요한 범위를 알려주시면 기술 검토 후 일정과 견적을 함께 정리하겠습니다.
            </p>
            <a
              className="w-fit border-b border-current text-[18px] font-bold"
              href={`mailto:${brand.contactEmail}`}
            >
              {brand.contactEmail}
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
