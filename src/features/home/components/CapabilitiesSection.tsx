import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { capabilities } from "../home.content";

export function CapabilitiesSection() {
  return (
    <section
      className="bg-white py-22 text-navy-ink sm:py-28 lg:py-32"
      id="services"
      aria-labelledby="capabilities-title"
    >
      <div
        className={`${contentShell} grid gap-18 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-24`}
      >
        <div className="lg:sticky lg:top-30 lg:self-start">
          <Reveal>
            <p className={`${eyebrow} text-navy-primary`}>CAPABILITIES</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-8 mb-6 max-w-160 text-[36px] leading-[1.08] font-bold break-keep sm:text-[44px] lg:text-[52px]"
              id="capabilities-title"
            >
              하나의 관점으로 처음부터 끝까지.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="m-0 max-w-137.5 text-[16px] leading-[1.68] break-keep text-navy-muted">
              기획 의도가 디자인과 개발 과정을 거치며 흐려지지 않도록, 처음부터 끝까지 하나의 팀이
              책임집니다.
            </p>
          </Reveal>
        </div>

        <ul className="m-0 list-none border-t border-navy-line p-0">
          {capabilities.map((capability, index) => (
            <Reveal
              as="li"
              className="grid min-h-31 grid-cols-[42px_1fr] items-start gap-2 border-b border-navy-line py-5.5 sm:min-h-25 sm:grid-cols-[48px_0.75fr_1fr] sm:items-center lg:min-h-33"
              key={capability.number}
              delay={index * 80}
            >
              <span className="text-[12px] font-bold text-navy-primary">{capability.number}</span>
              <h3 className="m-0 text-[28px] leading-none">{capability.title}</h3>
              <p className="col-start-2 mt-4 mb-0 text-[14px] leading-[1.6] text-navy-muted sm:col-start-3 sm:m-0">
                {capability.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
