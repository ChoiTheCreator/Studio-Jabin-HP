import {
  ArrowRightIcon,
  ChartBarSquareIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  UserGroupIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { engineeringFlow, operationCapabilities } from "../home.content";

type FlowIcon = ComponentType<SVGProps<SVGSVGElement>>;

const flowIcons: Record<(typeof engineeringFlow)[number]["icon"], FlowIcon> = {
  users: UserGroupIcon,
  window: WindowIcon,
  code: CodeBracketIcon,
  database: CircleStackIcon,
  cloud: CloudIcon,
  chart: ChartBarSquareIcon,
};

export function EngineeringSection() {
  return (
    <section
      className="overflow-hidden bg-navy-night py-[88px] text-white sm:py-28 lg:py-32"
      id="engineering"
      aria-labelledby="engineering-title"
    >
      <div className={contentShell}>
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,2.2fr)] lg:gap-16">
          <div>
            <p className={eyebrow}>ENGINEERING &amp; OPERATIONS</p>
            <div className="mt-7 flex items-center gap-2 text-[12px] font-bold text-white/65">
              <span className="size-2 rounded-full bg-navy-signal" aria-hidden="true" />
              SYSTEM LANDSCAPE
            </div>
          </div>
          <div>
            <h2
              className="m-0 max-w-[860px] text-[38px] leading-[1.08] font-bold [word-break:keep-all] sm:text-[46px] lg:text-[54px]"
              id="engineering-title"
            >
              출시가 끝이 되지 않도록,
              <br />
              운영까지 설계합니다.
            </h2>
            <p className="mt-7 mb-0 max-w-[670px] text-[16px] leading-[1.65] text-white/70 [word-break:keep-all] sm:text-[18px]">
              사용자 화면부터 API, 데이터와 배포 환경까지 하나의 시스템으로 바라봅니다.
              운영자가 상태를 확인하고 문제에 대응할 수 있는 기준도 함께 만듭니다.
            </p>
          </div>
        </Reveal>

        <ol className="mt-[72px] grid grid-cols-2 list-none border-t border-b border-white/25 p-0 lg:mt-24 lg:grid-cols-6">
          {engineeringFlow.map((node, index) => {
            const Icon = flowIcons[node.icon];

            return (
              <Reveal
                as="li"
                className="relative flex min-h-[150px] flex-col items-start justify-between gap-5 border-r border-b border-white/20 px-4 py-6 even:border-r-0 nth-[n+5]:border-b-0 lg:min-h-[184px] lg:border-b-0 lg:border-r lg:px-5 lg:py-7 lg:even:border-r lg:last:border-r-0"
                key={node.number}
                delay={index * 90}
              >
                <div className="flex items-center gap-4 lg:w-full lg:justify-between">
                  <span className="text-[12px] font-bold text-navy-signal">{node.number}</span>
                  <Icon className="size-6 text-white/80" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="m-0 text-[21px] leading-none font-bold sm:text-[23px]">{node.title}</h3>
                  <p className="mt-2 mb-0 text-[12px] font-medium text-white/55">{node.detail}</p>
                </div>
                {index < engineeringFlow.length - 1 ? (
                  <>
                    <ArrowRightIcon
                      className="absolute top-1/2 right-[-12px] z-10 hidden size-6 -translate-y-1/2 bg-navy-night p-1 text-navy-signal lg:block"
                      aria-hidden="true"
                    />
                  </>
                ) : null}
              </Reveal>
            );
          })}
        </ol>

        <ol className="mt-[72px] grid grid-cols-2 list-none border-t border-white/25 p-0 lg:mt-24 lg:grid-cols-4">
          {operationCapabilities.map((capability, index) => (
            <Reveal
              as="li"
              className="flex min-h-[310px] flex-col border-b border-white/25 px-4 py-6 odd:border-r lg:min-h-[312px] lg:border-r lg:px-7 lg:py-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              key={capability.number}
              delay={index * 90}
            >
              <span className="text-[12px] font-bold text-navy-signal">{capability.number}</span>
              <h3 className="mt-12 mb-5 text-[28px] leading-none font-bold sm:text-[30px]">
                {capability.title}
              </h3>
              <p className="m-0 text-[14px] leading-[1.65] text-white/70 [word-break:keep-all]">
                {capability.description}
              </p>
              <p className="mt-auto mb-0 pt-8 text-[12px] leading-[1.7] font-medium text-white/55">
                {capability.practices.join(" · ")}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
