"use client";

import { useEffect, useRef, useState } from "react";

const GRAPH_ALT = "JB Studio 연간 예상 컴퓨팅 비용 15~30만원과 AWS/GCP 120만원 비교 그래프";
const BAR_DURATION = 900;
const PRICE_DURATION = 240;
const GRAPH_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

type GraphParts = {
  root: SVGSVGElement;
  bars: SVGGraphicsElement[];
  prices: SVGGraphicsElement[];
};

function getGraphParts(frame: HTMLIFrameElement): GraphParts | null {
  const root = frame.contentDocument?.documentElement as unknown as SVGSVGElement | null;
  const plot = root?.querySelector<SVGGElement>("g[clip-path]");
  if (!root || !plot) return null;

  root.style.width = "100%";
  root.style.height = "100%";
  root.style.display = "block";
  root.style.overflow = "hidden";

  const children = Array.from(plot.children);
  const bars = children.filter((element): element is SVGGraphicsElement => {
    return element.tagName.toLowerCase() === "rect" && Number(element.getAttribute("height")) > 0;
  });
  const axis = children.find((element) => element.tagName.toLowerCase() === "line");
  const axisY = Number(axis?.getAttribute("y1"));
  const prices = children.filter((element): element is SVGGraphicsElement => {
    if (element.tagName.toLowerCase() !== "path") return false;

    return (element as SVGGraphicsElement).getBBox().y < axisY;
  });

  return bars.length === 2 && prices.length === 2 ? { root, bars, prices } : null;
}

function prepareGraph(parts: GraphParts) {
  parts.root.dataset.animationState = "idle";

  parts.bars.forEach((bar) => {
    bar.style.setProperty("transform-box", "fill-box");
    bar.style.setProperty("transform-origin", "center bottom");
    bar.style.transform = "scaleY(0)";
  });
  parts.prices.forEach((price) => {
    price.style.opacity = "0";
  });
}

function completeGraph(parts: GraphParts) {
  parts.root.dataset.animationState = "complete";

  parts.bars.forEach((bar) => {
    bar.style.setProperty("transform-box", "fill-box");
    bar.style.setProperty("transform-origin", "center bottom");
    bar.style.transform = "scaleY(1)";
  });
  parts.prices.forEach((price) => {
    price.style.opacity = "1";
  });
}

function runGraphAnimation(parts: GraphParts) {
  let active = true;
  const animations: Animation[] = [];

  parts.root.dataset.animationState = "bars";
  const barAnimations = parts.bars.map((bar) => {
    const animation = bar.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
      duration: BAR_DURATION,
      easing: GRAPH_EASING,
      fill: "forwards",
    });
    animations.push(animation);
    return animation;
  });

  void Promise.all(barAnimations.map((animation) => animation.finished))
    .then(() => {
      if (!active) return [];

      parts.root.dataset.animationState = "prices";
      return parts.prices.map((price) => {
        const animation = price.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: PRICE_DURATION,
          easing: GRAPH_EASING,
          fill: "forwards",
        });
        animations.push(animation);
        return animation.finished;
      });
    })
    .then((priceAnimations) => Promise.all(priceAnimations))
    .then(() => {
      if (!active) return;
      completeGraph(parts);
    })
    .catch(() => {
      // Animation cancellation is expected during unmount or a motion preference change.
    });

  return () => {
    active = false;
    animations.forEach((animation) => animation.cancel());
  };
}

type MobileCostGraphProps = {
  animateBars: boolean;
  showPrices: boolean;
};

function MobileInfrastructureCostGraph({ animateBars, showPrices }: MobileCostGraphProps) {
  const barClassName = `block w-[42px] origin-bottom transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
    animateBars ? "scale-y-100" : "scale-y-0"
  }`;
  const priceClassName = `mb-2 text-[14px] font-bold text-[#303641] transition-opacity duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
    showPrices ? "opacity-100" : "opacity-0"
  }`;

  return (
    <figure
      className="rounded-[8px] border border-[#e7e9ed] bg-white px-5 py-6 sm:hidden"
      data-testid="infrastructure-cost-graph-mobile"
    >
      <figcaption>
        <p className="text-[18px] leading-[1.3] font-bold text-[#252a31]">
          연간 예상 컴퓨팅 비용 비교
        </p>
        <p className="mt-1 text-[13px] text-[#626b76]">동일·유사 사양 기준</p>
      </figcaption>

      <div className="mt-8 grid h-[168px] grid-cols-2 items-end border-b border-[#dde2e8]">
        <div className="flex h-full flex-col items-center justify-end">
          <span className={priceClassName} data-testid="infrastructure-price-jabin">
            15~30만원
          </span>
          <span
            className={`${barClassName} h-[22px] bg-[#142b4a]`}
            data-testid="infrastructure-bar-jabin"
            aria-hidden="true"
          />
        </div>
        <div className="flex h-full flex-col items-center justify-end">
          <span className={priceClassName} data-testid="infrastructure-price-cloud">
            120만원
          </span>
          <span
            className={`${barClassName} h-[120px] bg-[#ff9900]`}
            data-testid="infrastructure-bar-cloud"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 pt-4 text-center text-[13px] text-[#626b76]">
        <span>JB Studio</span>
        <span>AWS/GCP</span>
      </div>
    </figure>
  );
}

export function AnimatedInfrastructureCostGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const frameAnimationStarted = useRef(false);
  const [entered, setEntered] = useState(false);
  const [showMobilePrices, setShowMobilePrices] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [frameVersion, setFrameVersion] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let loadedDocument: Document | null = null;
    const handleFrameLoad = () => {
      const currentDocument = frame.contentDocument;
      if (!currentDocument || currentDocument === loadedDocument) return;

      loadedDocument = currentDocument;
      frameAnimationStarted.current = false;
      setFrameVersion((version) => version + 1);
    };

    frame.addEventListener("load", handleFrameLoad);
    const readyCheck = window.setTimeout(handleFrameLoad, 0);

    return () => {
      window.clearTimeout(readyCheck);
      frame.removeEventListener("load", handleFrameLoad);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!entered) return;

    if (reduceMotion) return;

    const timer = window.setTimeout(() => setShowMobilePrices(true), BAR_DURATION);
    return () => window.clearTimeout(timer);
  }, [entered, reduceMotion]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || frameVersion === 0) return;

    const parts = getGraphParts(frame);
    if (!parts) return;

    if (reduceMotion) {
      frameAnimationStarted.current = true;
      completeGraph(parts);
      return;
    }

    if (!entered) {
      prepareGraph(parts);
      return;
    }

    if (frameAnimationStarted.current) return;

    frameAnimationStarted.current = true;
    prepareGraph(parts);
    return runGraphAnimation(parts);
  }, [entered, frameVersion, reduceMotion]);

  return (
    <div
      ref={containerRef}
      data-animation-runs={entered && !reduceMotion ? "1" : "0"}
      data-animation-state={
        reduceMotion || showMobilePrices ? "complete" : entered ? "bars" : "idle"
      }
      data-testid="infrastructure-cost-graph"
    >
      <MobileInfrastructureCostGraph
        animateBars={entered || reduceMotion}
        showPrices={showMobilePrices || reduceMotion}
      />
      <iframe
        ref={frameRef}
        className="pointer-events-none hidden aspect-[408/428] h-auto w-full overflow-hidden border-0 sm:block"
        src="/images/why-our-service/graph_comparison.svg"
        data-testid="infrastructure-cost-graph-svg"
        role="img"
        aria-label={GRAPH_ALT}
        title={GRAPH_ALT}
        tabIndex={-1}
        scrolling="no"
      />
    </div>
  );
}
