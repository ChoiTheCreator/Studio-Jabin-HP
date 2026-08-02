import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, pageShell } from "@/components/ui/tailwind";
import { capabilities } from "../home.content";

export function CapabilitiesSection() {
  return (
    <section className="bg-ink py-[88px] text-white sm:py-28 lg:py-36" id="services" aria-labelledby="capabilities-title">
      <div className={`${pageShell} grid gap-[72px] lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-28`}>
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Reveal>
            <p className={eyebrow}>CAPABILITIES</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-8 mb-6 max-w-[640px] text-[42px] leading-none font-bold [word-break:keep-all] sm:text-[62px] lg:text-[68px]" id="capabilities-title">
              하나의 관점으로 처음부터 끝까지.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="m-0 max-w-[550px] text-[17px] leading-[1.62] text-white/60 [word-break:keep-all]">
              전략에서 시작한 의도가 화면과 코드에서 흐려지지 않도록, 필요한 역량을
              프로젝트 안에서 긴밀하게 연결합니다.
            </p>
          </Reveal>
        </div>

        <ul className="m-0 list-none border-t border-white/25 p-0">
          {capabilities.map((capability, index) => (
            <Reveal
              as="li"
              className="grid min-h-[124px] grid-cols-[42px_1fr] items-start gap-2 border-b border-white/25 py-[22px] sm:min-h-[100px] sm:grid-cols-[48px_0.75fr_1fr] sm:items-center lg:min-h-[132px]"
              key={capability.number}
              delay={index * 80}
            >
              <span className="text-[11px] text-lime">{capability.number}</span>
              <h3 className="m-0 text-[28px] leading-none">{capability.title}</h3>
              <p className="col-start-2 mt-4 mb-0 text-[14px] leading-[1.5] text-white/60 sm:col-start-3 sm:m-0">
                {capability.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
