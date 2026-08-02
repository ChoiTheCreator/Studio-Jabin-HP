import { Reveal } from "@/components/motion/Reveal";

export function StudioStatement() {
  return (
    <section className="statement" aria-labelledby="statement-title">
      <div className="statement__marquee" aria-hidden="true">
        <div>
          <span>STRATEGY INTO FORM</span>
          <i>●</i>
          <span>FORM INTO FUNCTION</span>
          <i>●</i>
          <span>STRATEGY INTO FORM</span>
          <i>●</i>
          <span>FORM INTO FUNCTION</span>
          <i>●</i>
        </div>
      </div>
      <div className="page-shell statement__inner">
        <Reveal>
          <p className="eyebrow">WHAT WE BELIEVE</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="statement-title">
            좋은 아이디어는 보기 좋은 화면에 머물지 않습니다. 브랜드의 언어가 되고,
            사용자의 행동이 되고, 오래 운영할 수 있는 제품이 되어야 합니다.
          </h2>
        </Reveal>
        <Reveal className="statement__foot" delay={180}>
          <span>(01 — APPROACH)</span>
          <p>
            JABO는 전략부터 디자인과 개발까지 한 팀으로 움직입니다. 의도를 잃지 않고
            실제 작동하는 결과물까지 연결합니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
