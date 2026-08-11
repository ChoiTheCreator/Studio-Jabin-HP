import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell } from "@/components/ui/tailwind";
import { projects } from "../home.content";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectsSection() {
  return (
    <section
      className="bg-navy-surface py-[76px] text-navy-ink sm:py-28 lg:py-32"
      id="work"
      aria-labelledby="projects-title"
    >
      <div className={contentShell}>
        <Reveal className="grid grid-cols-[1fr_auto] items-end gap-y-7 border-b border-navy-line pb-7 lg:pb-9">
          <p className="col-span-full m-0 text-[12px] font-bold text-navy-primary">
            SELECTED PROJECTS
          </p>
          <h2
            className="m-0 text-[38px] leading-[1.08] font-bold sm:text-[46px] lg:text-[54px]"
            id="projects-title"
          >
            문제에서 시작한 설계.
          </h2>
          <span className="text-[12px] font-bold text-navy-muted">
            {String(projects.length).padStart(2, "0")} CONCEPTS
          </span>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:gap-28">
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
                className={`flex flex-col border-t border-navy-deep pt-4 ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div className="flex justify-between text-[12px] font-bold">
                  <span className="text-navy-primary">{project.number}</span>
                  <span className="text-navy-muted">{project.status}</span>
                </div>
                <div className="py-7 lg:my-auto lg:py-11">
                  <p className="mb-3 text-[12px] font-bold text-navy-muted">{project.industry}</p>
                  <h3 className="m-0 text-[32px] leading-none [overflow-wrap:anywhere] lg:text-[42px]">
                    {project.title}
                  </h3>
                  <p className="mt-[18px] mb-0 max-w-[440px] text-[15px] leading-[1.65] [word-break:keep-all] text-navy-muted lg:text-[16px]">
                    {project.summary}
                  </p>
                </div>
                <div className="grid grid-cols-[1fr_auto_auto] items-end gap-3 border-t border-navy-line pt-4 text-[12px]">
                  <p className="m-0">{project.services}</p>
                  <span>{project.year}</span>
                  <ArrowUpRightIcon
                    className="size-[18px] transition-transform duration-300 [@media(hover:hover)]:group-hover/project:translate-x-[3px] [@media(hover:hover)]:group-hover/project:-translate-y-[3px]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
