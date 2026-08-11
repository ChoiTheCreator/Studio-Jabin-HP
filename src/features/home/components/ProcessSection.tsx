import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { processSteps } from "../home.content";

export function ProcessSection() {
  return (
    <section
      className="bg-white py-[88px] text-navy-ink sm:py-28 lg:py-32"
      id="process"
      aria-labelledby="process-title"
    >
      <div className={contentShell}>
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <p className={`${eyebrow} text-navy-primary`}>PROCESS</p>
          <h2
            className="m-0 text-[38px] leading-[1.08] font-bold [word-break:keep-all] sm:text-[46px] lg:text-[54px]"
            id="process-title"
          >
            진단부터 운영까지,
            <br />
            같은 기준으로 이어갑니다.
          </h2>
        </Reveal>

        <ol className="mt-[72px] grid list-none border-t border-navy-line p-0 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              className={`grid grid-cols-[42px_1fr] gap-y-3 border-b border-navy-line py-6 lg:col-span-1 lg:flex lg:min-h-[340px] lg:flex-col lg:border-r lg:px-[22px] lg:pt-6 lg:pb-[30px] lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 ${
                index === processSteps.length - 1
                  ? "sm:col-span-2 sm:border-r-0 sm:px-0 lg:col-span-1"
                  : index % 2 === 0
                    ? "sm:border-r sm:pr-6"
                    : "sm:pl-6"
              }`}
              key={step.number}
              delay={index * 90}
            >
              <div className="row-span-3 flex items-start gap-3 pt-1 text-[12px] font-bold text-navy-primary lg:row-auto lg:items-center lg:pt-0">
                <span>{step.number}</span>
                <i className="size-[7px] rounded-full bg-current" aria-hidden="true" />
              </div>
              <h3 className="m-0 text-[27px] lg:mt-[54px] lg:mb-[18px] lg:text-[32px]">
                {step.title}
              </h3>
              <p className="col-start-2 m-0 max-w-[370px] text-[14px] leading-[1.65] [word-break:keep-all] text-navy-muted lg:col-auto lg:text-[15px]">
                {step.description}
              </p>
              <small className="col-start-2 mt-2 text-[12px] font-bold lg:col-auto lg:mt-auto lg:pt-7">
                {step.output}
              </small>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
