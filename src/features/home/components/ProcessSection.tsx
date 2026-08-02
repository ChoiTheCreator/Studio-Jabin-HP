import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "../home.content";

export function ProcessSection() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="page-shell">
        <Reveal className="process__heading">
          <p className="eyebrow">PROCESS</p>
          <h2 id="process-title">
            명확하게 듣고,
            <br />
            빠르게 구체화합니다.
          </h2>
        </Reveal>

        <ol className="process-list">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 90}>
              <div className="process-list__number">
                <span>{step.number}</span>
                <i aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <small>{step.output}</small>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
