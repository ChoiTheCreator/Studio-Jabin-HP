import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, pageShell } from "@/components/ui/tailwind";
import { processSteps } from "../home.content";

export function ProcessSection() {
  return (
    <section className="bg-white py-[88px] sm:py-28 lg:py-36" id="process" aria-labelledby="process-title">
      <div className={pageShell}>
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <p className={eyebrow}>PROCESS</p>
          <h2 className="m-0 text-[46px] leading-[0.98] font-bold [word-break:keep-all] sm:text-[62px] lg:text-[78px]" id="process-title">
            명확하게 듣고,
            <br />
            빠르게 구체화합니다.
          </h2>
        </Reveal>

        <ol className="mt-[72px] grid list-none border-t border-ink p-0 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              className="flex min-h-[300px] flex-col border-b border-ink py-[22px] pb-7 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:min-h-[420px] lg:border-r lg:px-[26px] lg:pt-6 lg:pb-[30px] lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              key={step.number}
              delay={index * 90}
            >
              <div className="flex items-center gap-3 text-[12px] font-bold text-red">
                <span>{step.number}</span>
                <i className="size-[7px] rounded-full bg-current" aria-hidden="true" />
              </div>
              <h3 className="mt-[54px] mb-[18px] text-[32px]">{step.title}</h3>
              <p className="m-0 max-w-[370px] text-[15px] leading-[1.6] text-muted [word-break:keep-all]">
                {step.description}
              </p>
              <small className="mt-auto pt-7 text-[11px] font-bold">{step.output}</small>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
