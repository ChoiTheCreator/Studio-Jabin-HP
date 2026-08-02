import { Reveal } from "@/components/motion/Reveal";
import { capabilities } from "../home.content";

export function CapabilitiesSection() {
  return (
    <section className="capabilities" id="services" aria-labelledby="capabilities-title">
      <div className="page-shell capabilities__grid">
        <div className="capabilities__intro">
          <Reveal>
            <p className="eyebrow">CAPABILITIES</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="capabilities-title">하나의 관점으로 처음부터 끝까지.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p>
              전략에서 시작한 의도가 화면과 코드에서 흐려지지 않도록, 필요한 역량을
              프로젝트 안에서 긴밀하게 연결합니다.
            </p>
          </Reveal>
        </div>

        <ul className="capability-list">
          {capabilities.map((capability, index) => (
            <Reveal as="li" key={capability.number} delay={index * 80}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
