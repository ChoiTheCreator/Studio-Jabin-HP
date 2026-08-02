import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import { Reveal } from "@/components/motion/Reveal";
import { projects } from "../home.content";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectsSection() {
  return (
    <section className="projects" id="work" aria-labelledby="projects-title">
      <div className="page-shell">
        <Reveal className="section-heading">
          <p className="eyebrow">SELECTED DIRECTIONS</p>
          <h2 id="projects-title">Ideas in motion.</h2>
          <span>03 CONCEPTS</span>
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal
              className={`project-item ${index % 2 === 1 ? "project-item--reverse" : ""}`}
              key={project.number}
            >
              <ProjectVisual variant={project.visual} title={project.title} />
              <div className="project-item__copy">
                <div className="project-item__topline">
                  <span>{project.number}</span>
                  <span>{project.status}</span>
                </div>
                <div>
                  <h3>{project.title}</h3>
                  <p className="project-item__summary">{project.summary}</p>
                </div>
                <div className="project-item__meta">
                  <p>{project.services}</p>
                  <span>{project.year}</span>
                  <ArrowUpRightIcon aria-hidden="true" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
