import Image from "next/image";

type ProjectVisualProps = {
  variant: "studio" | "archive" | "common";
  title: string;
};

export function ProjectVisual({ variant, title }: ProjectVisualProps) {
  if (variant === "studio") {
    return (
      <div className="project-visual project-visual--studio">
        <Image
          src="/images/jabo-studio-hero.png"
          alt={`${title} 콘셉트 이미지`}
          fill
          sizes="(min-width: 1024px) 62vw, 100vw"
        />
        <span className="project-visual__badge">JABO / 01</span>
      </div>
    );
  }

  if (variant === "archive") {
    return (
      <div className="project-visual project-visual--archive" aria-label={`${title} 인터페이스 콘셉트`}>
        <div className="archive-poster">
          <p>ORBITAL</p>
          <span>ARCHIVE</span>
          <b>O/A</b>
        </div>
        <div className="archive-ui">
          <span>INDEX / 024</span>
          <div className="archive-ui__image" />
          <p>Objects, records and conversations in perpetual motion.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--common" aria-label={`${title} 모바일 인터페이스 콘셉트`}>
      <div className="common-word">COMMON<br />GROUND</div>
      <div className="common-phone">
        <div className="common-phone__top"><span>CG</span><span>MENU</span></div>
        <div className="common-phone__photo" />
        <p>오늘의 동네 이야기</p>
        <div className="common-phone__line" />
        <div className="common-phone__line common-phone__line--short" />
      </div>
      <span className="common-mark">C/G</span>
    </div>
  );
}
