import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, pageShell } from "@/components/ui/tailwind";
import { projects } from "../home.content";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectsSection() {
  return (
    <section className="bg-paper py-[88px] sm:py-28 lg:py-36" id="work" aria-labelledby="projects-title">
      <div className={pageShell}>
        <Reveal className="grid grid-cols-[1fr_auto] items-end gap-y-[30px] border-b border-ink pb-7 lg:pb-9">
          <p className={`${eyebrow} col-span-full`}>SELECTED DIRECTIONS</p>
          <h2 className="m-0 text-[48px] leading-[0.95] sm:text-[72px] lg:text-[108px] min-[1440px]:!text-[118px]" id="projects-title">
            Ideas in motion.
          </h2>
          <span className="text-[11px] font-bold">03 CONCEPTS</span>
        </Reveal>

        <div className="mt-12 grid gap-24 lg:mt-[72px] lg:gap-[152px]">
          {projects.map((project, index) => (
            <Reveal
              className={`group/project grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(340px,5fr)] lg:gap-12 ${
                index % 2 === 1 ? "lg:grid-cols-[minmax(340px,5fr)_minmax(0,7fr)]" : ""
              }`}
              key={project.number}
            >
              <ProjectVisual
                variant={project.visual}
                title={project.title}
                className={index % 2 === 1 ? "lg:col-start-2" : ""}
              />
              <div
                className={`flex min-h-[320px] flex-col border-t border-ink pt-3.5 lg:min-h-0 ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div className="flex justify-between text-[11px] font-bold">
                  <span>{project.number}</span>
                  <span>{project.status}</span>
                </div>
                <div className="my-auto py-11">
                  <h3 className="m-0 text-[34px] leading-none [overflow-wrap:anywhere] lg:text-[46px]">
                    {project.title}
                  </h3>
                  <p className="mt-[18px] mb-0 max-w-[440px] text-[16px] leading-[1.55] text-muted [word-break:keep-all] lg:text-[18px]">
                    {project.summary}
                  </p>
                </div>
                <div className="grid grid-cols-[1fr_auto_auto] items-end gap-3 border-t border-line pt-3.5 text-[11px]">
                  <p className="m-0">{project.services}</p>
                  <span>{project.year}</span>
                  <ArrowUpRightIcon className="size-[18px] transition-transform duration-300 [@media(hover:hover)]:group-hover/project:translate-x-[3px] [@media(hover:hover)]:group-hover/project:-translate-y-[3px]" aria-hidden="true" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
