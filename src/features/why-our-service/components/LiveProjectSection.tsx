import { ArrowUpRightIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell } from "@/components/ui/tailwind";

const liveProject = {
  name: "이터널마케팅",
  url: "https://eternalmarketing.co.kr/",
  domain: "eternalmarketing.co.kr",
} as const;

export function LiveProjectSection() {
  return (
    <section
      className="border-t border-navy-line bg-navy-paper pt-24 pb-32 sm:pt-32 lg:pt-40 lg:pb-40"
      id="why-conclusion"
      aria-labelledby="live-project-title"
    >
      <div className={contentShell}>
        <Reveal className="text-center">
          <h2
            className="m-0 text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[56px] lg:text-[68px]"
            id="live-project-title"
          >
            직접 확인해보세요.
          </h2>
          <p className="mt-6 mb-0 text-[17px] leading-[1.6] text-navy-muted sm:text-[20px]">
            Jabin Studio는 이렇게 만듭니다.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 w-full max-w-[820px] sm:mt-14 lg:mt-16" delay={120}>
          <a
            className="group/live-project block w-full rounded-lg border border-navy-line bg-navy-surface p-6 text-left text-navy-ink transition-[border-color,transform] duration-300 ease-out focus-visible:border-navy-primary motion-reduce:transition-none sm:p-10 lg:p-12 [@media(hover:hover)]:hover:border-navy-primary motion-safe:[@media(hover:hover)]:hover:-translate-y-1"
            href={liveProject.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${liveProject.name} 실제 웹사이트 새 탭에서 열기`}
          >
            <span className="block text-[12px] leading-[1.2] font-bold tracking-[0.04em] text-navy-primary">
              LIVE PROJECT
            </span>
            <span className="mt-6 block text-[34px] leading-[1.05] font-bold break-keep sm:text-[44px] lg:text-[52px]">
              {liveProject.name}
            </span>

            <span className="mt-8 flex min-h-13 min-w-0 items-center gap-3 rounded-lg border border-navy-line bg-navy-paper px-4 transition-[background-color,border-color] duration-300 motion-reduce:transition-none sm:px-5 [@media(hover:hover)]:group-hover/live-project:border-navy-primary/35 [@media(hover:hover)]:group-hover/live-project:bg-white">
              <GlobeAltIcon
                className="size-5 shrink-0 text-navy-primary"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-[16px] font-bold sm:text-[18px]">
                {liveProject.domain}
              </span>
              <ArrowUpRightIcon
                className="size-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none motion-safe:[@media(hover:hover)]:group-hover/live-project:translate-x-[3px] motion-safe:[@media(hover:hover)]:group-hover/live-project:-translate-y-[3px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>

            <span className="mt-6 flex items-center justify-end gap-2 text-[13px] font-bold sm:mt-8 sm:text-[14px]">
              <span>View Live</span>
              <ArrowUpRightIcon
                className="size-4 transition-transform duration-300 motion-reduce:transition-none motion-safe:[@media(hover:hover)]:group-hover/live-project:translate-x-[3px] motion-safe:[@media(hover:hover)]:group-hover/live-project:-translate-y-[3px]"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
