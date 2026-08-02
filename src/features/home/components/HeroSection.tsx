"use client";

import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { brand } from "@/config/brand";

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      imageRef.current?.style.setProperty("--hero-x", `${x}px`);
      imageRef.current?.style.setProperty("--hero-y", `${y}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media" ref={imageRef}>
        <Image
          src={brand.assets.hero}
          alt="디지털 인터페이스와 디자인 샘플이 놓인 Jabin 작업 공간"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="page-shell hero__content">
        <p className="hero__eyebrow hero-enter">INDEPENDENT DIGITAL STUDIO · SEOUL</p>
        <h1 className="hero__title hero-enter" id="hero-title">
          생각을
          <br />
          <span>작동하게</span> 만듭니다.
        </h1>
        <div className="hero__meta hero-enter">
          <p>Strategy · Identity · Experience · Engineering</p>
          <a href="#work">
            작업 보기
            <ArrowDownIcon aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero__index" aria-hidden="true">
        <span>SCROLL</span>
        <span className="hero__index-line" />
        <span>01</span>
      </div>
    </section>
  );
}
