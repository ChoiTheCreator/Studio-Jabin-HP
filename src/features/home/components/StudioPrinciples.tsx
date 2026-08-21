"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { easeOut, eyebrow } from "@/components/ui/tailwind";

const principles = [
  {
    label: "HOW WE DESIGN",
    title: "비슷한 디자인을 만들지 않습니다.",
    description: "고객의 브랜드와 서비스를 먼저 이해합니다.",
    statement: "먼저 보여드리고, 의견을 듣고, 계속 다듬습니다.",
    detailTitle: "처음 나온 화면을\n정답이라고 생각하지 않습니다.",
    detailIntro: "고객이 원하는 것을 마지막에 확인하지 않고, 만드는 과정 안에 고객을 참여시킵니다.",
    flow: [
      ["UNDERSTAND", "서비스, 브랜드, 사용자와 현재 상황을 먼저 파악합니다."],
      ["EXPLORE", "AI와 내부 제작 도구를 활용해 여러 방향을 빠르게 탐색합니다."],
      ["SHOW EARLY", "완성될 때까지 숨기지 않고 방향을 판단할 수 있는 단계부터 보여드립니다."],
      ["LISTEN", "고객의 의견을 수정 요청이 아니라 제품을 만드는 정보로 사용합니다."],
      ["REFINE", "더 좋은 방법이 있다면 이유와 대안을 함께 제안하며 다듬습니다."],
    ],
    closing: "먼저 묻고.\n빠르게 보여주고.\n함께 결정합니다.",
    metadata: "FIRST DIRECTION → CLIENT FEEDBACK → REFINED DIRECTION",
  },
  {
    label: "HOW WE BUILD",
    title: "보여주기 좋은 화면에서 끝내지 않습니다.",
    description: "기능과 데이터, 보안, 테스트와 배포까지 연결합니다.",
    statement: "실제로 사용할 수 있는 상태로 만듭니다.",
    detailTitle: "화면이 완성됐다고\n서비스가 완성된 것은 아닙니다.",
    detailIntro: "예쁜 화면 이후에 필요한 기능과 구조를 실제 사용자의 흐름으로 연결합니다.",
    flow: [
      ["INTERFACE", "사용자가 실제로 사용하는 화면"],
      ["LOGIC", "서비스가 실제로 동작하는 기능"],
      ["DATA", "데이터가 저장되고 연결되는 구조"],
      ["ACCESS", "로그인, 인증, 권한과 중요한 정보의 보호"],
      ["VERIFY", "테스트와 QA"],
      ["DEPLOY", "실제 사용자가 접속할 수 있는 환경으로 배포"],
    ],
    closing: "데모를 만드는 것과\n서비스를 운영하는 것은 다릅니다.",
    metadata: "FRONTEND / BACKEND / DATA / AUTH / SECURITY / QA / DEPLOYMENT",
  },
  {
    label: "HOW WE OPERATE",
    title: "운영할 곳까지 준비합니다.",
    description: "서울과 광주의 자체 인프라와 외부 클라우드를 서비스에 맞게 조합합니다.",
    statement: "안정성, 보안, 운영 비용을 같이 봅니다.",
    detailTitle: "만드는 것뿐 아니라\n어디에서 돌아갈지도 생각합니다.",
    detailIntro:
      "무조건 자체 서버나 외부 클라우드를 선택하지 않습니다. 서비스의 요구사항에 맞는 방법을 결정합니다.",
    flow: [
      ["SERVICE", "운영할 제품과 사용자"],
      ["REQUIREMENTS", "트래픽 / 데이터 / 보안 / 운영 방식 / 비용"],
      ["INFRASTRUCTURE DECISION", "Jabin Infrastructure / External Cloud / Hybrid"],
      ["OPERATION", "실제 서비스 운영"],
    ],
    closing:
      "안정적으로 돌아가는가.\n중요한 정보를 어떻게 보호할 것인가.\n계속 감당할 수 있는 비용인가.",
    metadata: "SEOUL ↔ GWANGJU / JABIN INFRASTRUCTURE / EXTERNAL CLOUD",
  },
] as const;

const subscribe = () => () => {};

export function StudioPrinciples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const detail = principles[activeIndex];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openDetail = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
    setOpen(true);
  };

  const closeDetail = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <div className="mt-8 border-t border-navy-line">
        {principles.map((principle, index) => (
          <Reveal delay={index * 70} key={principle.label}>
            <button
              className="group grid w-full cursor-pointer gap-5 border-b border-navy-line py-9 text-left transition-colors duration-300 hover:border-navy-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-primary motion-reduce:transition-none sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-7 sm:py-11 lg:grid-cols-[80px_minmax(300px,0.9fr)_minmax(240px,0.6fr)_minmax(280px,0.8fr)] lg:items-baseline lg:gap-9 lg:py-12"
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => openDetail(index, event.currentTarget)}
            >
              <span className="text-[12px] font-bold text-navy-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="text-[27px] leading-[1.2] font-bold [word-break:keep-all] transition-colors duration-300 group-hover:text-navy-primary sm:text-[32px] lg:text-[36px]"
                role="heading"
                aria-level={3}
              >
                {principle.title}
              </span>
              <span className="text-[15px] leading-[1.65] [word-break:keep-all] text-navy-muted sm:col-start-2 sm:text-[16px] lg:col-start-auto">
                {principle.description}
              </span>
              <span className="grid gap-5 sm:col-start-2 lg:col-start-auto">
                <strong className="border-l-2 border-navy-primary pl-5 text-[15px] leading-[1.55] [word-break:keep-all] text-navy-deep sm:text-[16px]">
                  {principle.statement}
                </strong>
                <span className="text-[11px] font-bold text-navy-muted transition-colors duration-300 group-hover:text-navy-primary">
                  {principle.label} <span aria-hidden="true">↗</span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[180] transition-[visibility] duration-300 ${open ? "visible" : "invisible"}`}
              aria-hidden={!open}
            >
              <button
                className={`absolute inset-0 cursor-default bg-navy-night/55 transition-opacity duration-300 motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`}
                type="button"
                tabIndex={-1}
                aria-label="상세 내용 닫기"
                onClick={closeDetail}
              />
              <section
                ref={panelRef}
                className={`absolute inset-y-0 right-0 flex w-full flex-col bg-white text-navy-ink transition-transform duration-[450ms] motion-reduce:transition-none lg:w-[min(76vw,1040px)] ${easeOut} ${open ? "translate-x-0" : "translate-x-full"}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
              >
                <header className="flex shrink-0 items-center justify-between border-b border-navy-line px-5 py-4 sm:px-8 lg:px-12">
                  <p className="m-0 text-[12px] font-bold text-navy-primary">
                    {String(activeIndex + 1).padStart(2, "0")} / {detail.label}
                  </p>
                  <button
                    ref={closeButtonRef}
                    className="grid size-11 cursor-pointer place-items-center border border-navy-line transition-colors hover:border-navy-primary hover:text-navy-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-primary"
                    type="button"
                    aria-label="상세 내용 닫기"
                    onClick={closeDetail}
                  >
                    <XMarkIcon className="size-5" aria-hidden="true" />
                  </button>
                </header>

                <div className="flex-1 overflow-y-auto px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                  <h2
                    className="m-0 max-w-[820px] text-[38px] leading-[1.08] font-bold [word-break:keep-all] whitespace-pre-line sm:text-[52px] lg:text-[64px]"
                    id={titleId}
                  >
                    {detail.detailTitle}
                  </h2>
                  <p className="mt-8 mb-0 max-w-[640px] text-[16px] leading-[1.72] font-medium [word-break:keep-all] text-navy-muted sm:text-[18px]">
                    {detail.detailIntro}
                  </p>

                  <ol className="mt-14 list-none border-t border-navy-line p-0 sm:mt-20">
                    {detail.flow.map(([label, description], index) => (
                      <li
                        className="grid gap-3 border-b border-navy-line py-6 sm:grid-cols-[52px_190px_minmax(0,1fr)] sm:items-baseline sm:gap-6 lg:py-7"
                        key={label}
                      >
                        <span className="text-[11px] font-bold text-navy-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <strong className="text-[13px] text-navy-deep sm:text-[14px]">
                          {label}
                        </strong>
                        <span className="text-[14px] leading-[1.65] [word-break:keep-all] text-navy-muted sm:text-[15px]">
                          {description}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <p className="mt-14 mb-0 border-l-2 border-navy-primary pl-6 text-[26px] leading-[1.35] font-bold [word-break:keep-all] whitespace-pre-line text-navy-deep sm:mt-20 sm:text-[34px]">
                    {detail.closing}
                  </p>
                  <p className="mt-10 mb-0 max-w-[720px] text-[11px] leading-[1.7] font-bold text-navy-muted">
                    {detail.metadata}
                  </p>

                  <div className="mt-16 border-t border-navy-line pt-6 sm:mt-24">
                    <p className={`${eyebrow} text-navy-primary`}>PART OF THE JABIN SYSTEM</p>
                    <a
                      className="mt-6 inline-flex min-h-12 items-center border-b border-navy-deep text-[14px] font-bold transition-colors duration-200 hover:border-navy-primary hover:text-navy-primary"
                      href="#jabin-system"
                      onClick={() => setOpen(false)}
                    >
                      Explore the Jabin System →
                    </a>
                  </div>
                </div>
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
