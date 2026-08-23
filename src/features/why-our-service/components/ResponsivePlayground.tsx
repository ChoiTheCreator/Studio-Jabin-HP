"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const MIN_VIEWPORT = 390;
const MAX_VIEWPORT = 1440;
const SIMULATED_HEIGHT = 760;
const MAX_DISPLAY_SCALE = 0.8;
const CALLOUT_THRESHOLD = 1024;
const PRESETS = [390, 768, 1024, 1200, 1440] as const;

function ResponsiveIssueCallout({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`rounded-[14px] border border-navy-line bg-white px-5 py-4 text-left shadow-[0_14px_36px_rgba(7,39,108,0.1)] ${className}`}
      aria-live="polite"
    >
      <p className="text-[16px] leading-[1.3] font-bold text-navy-ink sm:text-[18px]">
        레이아웃은 무너지고,
        <br />
        글자는 겹칩니다.
      </p>
    </aside>
  );
}

export function ResponsivePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(MAX_VIEWPORT);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setAvailableWidth(container.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const displayScale = useMemo(
    () => Math.min(MAX_DISPLAY_SCALE, availableWidth / MAX_VIEWPORT),
    [availableWidth],
  );
  const renderedWidth = viewportWidth * displayScale;
  const renderedHeight = SIMULATED_HEIGHT * displayScale;
  const showIssueCallout = viewportWidth <= CALLOUT_THRESHOLD;
  const nearestPreset = PRESETS.reduce((nearest, preset) =>
    Math.abs(preset - viewportWidth) < Math.abs(nearest - viewportWidth) ? preset : nearest,
  );

  return (
    <div className="mx-auto w-full max-w-[1260px] px-5 sm:px-8 lg:px-12">
      <div ref={containerRef} className="w-full" data-testid="responsive-playground">
        <div className="relative">
          <div
            className="relative mx-auto overflow-hidden rounded-[14px] border border-navy-line bg-white shadow-[0_18px_50px_rgba(7,39,108,0.08)] transition-[width,height] duration-150 motion-reduce:transition-none"
            data-testid="taskwise-browser-frame"
            style={{ width: renderedWidth, height: renderedHeight + 42 }}
          >
            <div className="flex h-[42px] items-center border-b border-navy-line bg-navy-surface px-3 sm:px-4">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-full bg-[#c7c7c7]" />
                <span className="size-2 rounded-full bg-[#b9b9b9]" />
                <span className="size-2 rounded-full bg-[#ababab]" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-[11px] font-bold text-navy-muted sm:text-[12px]">
                Taskwise AI
              </span>
              <span className="ml-auto font-mono text-[10px] text-navy-muted sm:text-[11px]">
                {viewportWidth}px
              </span>
            </div>
            <div className="relative" style={{ width: renderedWidth, height: renderedHeight }}>
              <iframe
                key="taskwise-demo"
                className="absolute top-0 left-0 border-0 bg-white"
                data-testid="taskwise-iframe"
                src="/examples/taskwise"
                title="Taskwise 반응형 웹사이트 미리보기"
                style={{
                  width: viewportWidth,
                  height: SIMULATED_HEIGHT,
                  transform: `scale(${displayScale})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          </div>

          <div
            className={`absolute top-1/2 hidden w-[220px] -translate-y-1/2 transition-[opacity,transform] duration-200 motion-reduce:transition-none lg:block ${
              showIssueCallout
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-2 opacity-0"
            }`}
            data-testid="responsive-issue-callout"
            style={{
              left: showIssueCallout ? `calc(50% + ${renderedWidth / 2 + 28}px)` : "50%",
            }}
            aria-hidden={!showIssueCallout}
          >
            <span
              className="absolute top-1/2 -left-2 size-4 -translate-y-1/2 rotate-45 border-b border-l border-navy-line bg-white"
              aria-hidden="true"
            />
            <ResponsiveIssueCallout />
          </div>
        </div>

        {showIssueCallout && (
          <ResponsiveIssueCallout className="mx-auto mt-5 w-full max-w-[280px] lg:hidden" />
        )}

        <div className="mx-auto mt-10 max-w-[760px] sm:mt-12">
          <output
            className="block text-center font-mono text-[18px] font-bold text-navy-ink sm:text-[20px]"
            htmlFor="viewport-width"
            aria-live="polite"
          >
            {viewportWidth}px
          </output>
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] text-navy-muted sm:gap-5 sm:text-[11px]">
            <span aria-hidden="true">390px</span>
            <input
              id="viewport-width"
              className="h-8 min-w-0 flex-1 cursor-ew-resize accent-navy-primary"
              type="range"
              min={MIN_VIEWPORT}
              max={MAX_VIEWPORT}
              step={1}
              value={viewportWidth}
              aria-label="미리보기 화면 너비"
              aria-valuetext={`${viewportWidth}픽셀`}
              onChange={(event) => setViewportWidth(Number(event.target.value))}
            />
            <span aria-hidden="true">1440px</span>
          </div>
          <div className="mt-3 flex justify-between gap-1" aria-label="화면 너비 프리셋">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                className={`min-h-11 min-w-11 px-1 font-mono text-[11px] transition-colors active:translate-y-px sm:px-3 sm:text-[12px] ${
                  nearestPreset === preset
                    ? "font-bold text-navy-primary"
                    : "text-navy-muted hover:text-navy-ink"
                }`}
                type="button"
                aria-pressed={viewportWidth === preset}
                onClick={() => setViewportWidth(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
          <p className="mt-8 text-center text-[16px] font-bold text-navy-ink sm:text-[18px]">
            화면 크기를 직접 바꿔보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
