"use client";

import { PauseIcon, PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { easeOut } from "@/components/ui/tailwind";
import { trackEvent } from "@/lib/analytics";

const principles = [
  {
    label: "HOW WE DESIGN",
    title: "똑같은 디자인을 만들지 않습니다.",
    description:
      "좋은 레퍼런스는 넓게 봅니다. 하지만 그대로 가져오지 않고, 브랜드와 서비스에 어울리는 방향을 함께 다듬습니다.",
    statement: "레퍼런스는 넓게 보고, 답은 새롭게 만듭니다.",
    detailTitle: "좋은 디자인은\n갑자기 나오지 않습니다.",
    detailIntro:
      "좋은 것을 많이 보고, 서비스의 맥락을 이해하고, 방향을 비교한 뒤 고객과 함께 결정합니다.",
  },
  {
    label: "HOW WE BUILD",
    title: "어정쩡한 프로젝트를 만들지 않습니다.",
    description:
      "화면 구현에서 멈추지 않습니다. 기능과 데이터, 서버, 보안, 테스트와 배포까지 실제 서비스에 필요한 요소를 하나의 제품으로 연결합니다.",
    statement: "우리는 화면이 아니라 제품을 납품합니다.",
    detailTitle: "우리는 화면이 아니라\n제품을 납품합니다.",
    detailIntro:
      "Design부터 Frontend, Backend, Data, Security, Test와 Deploy까지 실제 사용자가 쓰는 하나의 제품으로 연결합니다.",
  },
  {
    label: "HOW WE OPERATE",
    title: "만들고, 운영까지 책임집니다.",
    description:
      "배포했다고 일이 끝나는 것이 아닙니다. 서비스에 맞는 인프라부터 안정성, 보안, 비용과 이후 운영까지 함께 설계합니다.",
    statement: "배포 이후까지가 우리의 일입니다.",
    detailTitle: "서비스마다 정답인\n인프라는 다릅니다.",
    detailIntro:
      "자체 인프라, Public Cloud와 외부 서비스를 서비스의 성격, 트래픽과 예산에 맞게 선택하고 조합합니다.",
  },
] as const;

const subscribe = () => () => {};
const subscribeReducedMotion = (callback: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const processInterval = 4000;

const designStages = [
  {
    label: "UNDERSTAND",
    title: "먼저 이해합니다.",
    description:
      "서비스가 누구를 위한 것인지, 무엇을 해결하는지, 브랜드가 어떤 인상을 가져야 하는지부터 이야기합니다.",
    closing: "방향은 화면보다 먼저 정합니다.",
  },
  {
    label: "EXPLORE",
    title: "좋은 건 전부 찾아봅니다.",
    description:
      "국내외 웹사이트, 제품, 스튜디오, 브랜드와 인터랙션까지 분야를 가리지 않고 좋은 사례를 적극적으로 탐색합니다.",
    closing: "좋은 건 배우고, 우리에게 맞게 다시 만듭니다.",
  },
  {
    label: "DIRECTION",
    title: "바로 만들기 전에 방향부터 맞춥니다.",
    description:
      "Typography, Color, Layout, Interaction, Reference와 Visual Language를 하나의 Design Direction으로 정리합니다.",
    closing: "느낌을 합의 가능한 기준으로 바꿉니다.",
  },
  {
    label: "REVIEW",
    title: "먼저 보여드리고, 같이 고칩니다.",
    description:
      "완성본을 갑자기 보여주지 않습니다. 방향을 먼저 공유하고 고객의 의견과 우리의 판단을 함께 반영합니다.",
    closing: "좋은 의견은 누구에게서 왔든 받아들입니다.",
  },
  {
    label: "SYSTEM",
    title: "마지막에는 시스템으로 남깁니다.",
    description:
      "페이지 몇 장이 아니라 Typography, Color, Component, Spacing과 Interaction Rule을 이후에도 확장할 수 있는 기준으로 정리합니다.",
    closing: "좋은 디자인은 혼자 완성한다고 생각하지 않습니다.",
  },
] as const;

const buildStages = [
  {
    label: "ARCHITECTURE",
    title: "만들기 전에 구조부터 잡습니다.",
    description:
      "서비스 규모와 요구사항에 맞춰 Frontend, Backend, Database, Infrastructure, Authentication과 External API 구조를 먼저 설계합니다.",
  },
  {
    label: "DEVELOPMENT",
    title: "보이는 것과 작동하는 것을 같이 만듭니다.",
    description:
      "디자인을 인터페이스로 구현하고 API, 데이터, 인증, 권한과 비즈니스 로직까지 하나의 사용자 흐름으로 연결합니다.",
  },
  {
    label: "QUALITY",
    title: "‘돌아갑니다’에서 끝내지 않습니다.",
    description:
      "반응형, 브라우저 호환성, 예외 처리, 성능과 실제 사용자 흐름을 기준으로 공개 전 품질을 확인합니다.",
  },
  {
    label: "SECURITY",
    title: "보안은 마지막에 붙이지 않습니다.",
    description:
      "Authentication, Authorization, Data Handling, Server Configuration과 Network의 기본 보안을 개발 단계부터 고려합니다.",
  },
  {
    label: "DEPLOY",
    title: "실제로 사용할 수 있는 상태로 넘깁니다.",
    description:
      "Domain, HTTPS, Server, Database, Production Environment와 Deployment까지 연결하고 실제 접속 상태를 확인합니다.",
  },
] as const;

const operateStages = [
  {
    label: "CHOOSE",
    title: "서비스에 맞는 인프라를 고릅니다.",
    description:
      "자체 인프라, Public Cloud와 외부 서비스를 비용, 규모와 요구사항에 맞게 선택하고 조합합니다.",
  },
  {
    label: "DEPLOY",
    title: "운영할 수 있는 환경을 만듭니다.",
    description:
      "Server, Database, Domain, SSL, Network와 Deployment Environment를 실제 운영 기준으로 구성합니다.",
  },
  {
    label: "MONITOR",
    title: "문제가 생길 때까지 기다리지 않습니다.",
    description:
      "서비스 상태와 로그를 확인하고, 문제가 발생했을 때 원인을 추적할 수 있는 운영 환경을 만듭니다.",
  },
  {
    label: "PROTECT",
    title: "데이터와 서비스를 보호합니다.",
    description:
      "Access Control, Backup, Network와 Security Configuration 등 운영에 필요한 기본 보호 체계를 구성합니다.",
  },
  {
    label: "OPTIMIZE",
    title: "비용도 운영의 일부입니다.",
    description:
      "무조건 비싼 클라우드나 과도한 사양을 권하지 않고 서비스 규모와 트래픽에 맞는 자원과 운영 비용을 함께 봅니다.",
  },
] as const;

function useProcessPlayback({
  activeStage,
  stageCount,
  onStageChange,
  playing,
}: {
  activeStage: number;
  stageCount: number;
  onStageChange: (stage: number) => void;
  playing: boolean;
}) {
  const [manualPaused, setManualPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const paused = manualPaused || hoverPaused || reducedMotion;

  useEffect(() => {
    if (!playing || paused) return;

    const timer = window.setTimeout(
      () => onStageChange((activeStage + 1) % stageCount),
      processInterval,
    );
    return () => window.clearTimeout(timer);
  }, [activeStage, onStageChange, paused, playing, stageCount]);

  return {
    manualPaused,
    paused,
    reducedMotion,
    setManualPaused,
    setHoverPaused,
  };
}

function ProcessStatusBand({
  activeStage,
  labels,
  manualPaused,
  paused,
  playing,
  processLabel,
  reducedMotion,
  onTogglePlayback,
}: {
  activeStage: number;
  labels: readonly string[];
  manualPaused: boolean;
  paused: boolean;
  playing: boolean;
  processLabel: string;
  reducedMotion: boolean;
  onTogglePlayback: () => void;
}) {
  return (
    <div className="mt-12 max-w-[820px] bg-navy-deep px-5 py-5 text-white sm:mt-16 sm:px-7 sm:py-6">
      <div className="flex items-center justify-between gap-5">
        <p className="m-0 text-[10px] font-bold text-white/60">{processLabel} / AUTO</p>
        {!reducedMotion ? (
          <button
            className="grid size-10 shrink-0 cursor-pointer place-items-center border border-white/30 text-white transition-colors hover:border-navy-signal hover:text-navy-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            type="button"
            aria-label={manualPaused ? "단계 자동 재생 시작" : "단계 자동 재생 멈춤"}
            title={manualPaused ? "자동 재생 시작" : "자동 재생 멈춤"}
            onClick={onTogglePlayback}
          >
            {manualPaused ? (
              <PlayIcon className="size-4" aria-hidden="true" />
            ) : (
              <PauseIcon className="size-4" aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-end">
        <p className="m-0 flex items-baseline gap-3">
          <strong className="text-[52px] leading-none text-navy-signal tabular-nums">
            {String(activeStage + 1).padStart(2, "0")}
          </strong>
          <span className="text-[10px] font-bold text-white/50">
            OF {String(labels.length).padStart(2, "0")}
          </span>
        </p>
        <div className="grid gap-2 sm:pb-1">
          <strong className="text-[22px] leading-none">{labels[activeStage]}</strong>
          <span className="text-[10px] font-bold text-white/55">
            NEXT / {labels[(activeStage + 1) % labels.length]}
          </span>
        </div>
      </div>

      <div
        className="mt-6 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {labels.map((label, index) => (
          <span className="relative h-1 overflow-hidden bg-white/20" key={label}>
            {activeStage === index && playing && !reducedMotion ? (
              <span
                className="design-stage-progress absolute inset-0 origin-left bg-navy-signal"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              />
            ) : index < activeStage ? (
              <span className="absolute inset-0 bg-white/55" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function DesignArtifact({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="border-y border-navy-line">
        <div className="grid border-b border-navy-line sm:grid-cols-3">
          {[
            "이건 좋은데 왜 좋은지는 모르겠어요.",
            "이런 느낌은 싫어요.",
            "좀 더 우리답게 하고 싶어요.",
          ].map((quote) => (
            <p
              className="m-0 border-b border-navy-line py-5 text-[13px] leading-[1.6] font-bold [word-break:keep-all] text-navy-muted last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              key={quote}
            >
              “{quote}”
            </p>
          ))}
        </div>
        <dl className="m-0 grid sm:grid-cols-2">
          {[
            ["WHAT", "어떤 서비스인가"],
            ["WHO", "누가 사용하는가"],
            ["FEEL", "어떤 인상을 남겨야 하는가"],
            ["NEVER", "절대 어떤 느낌이면 안 되는가"],
          ].map(([label, item], index) => (
            <div
              className="grid grid-cols-[36px_minmax(0,1fr)] border-b border-navy-line py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
              key={label}
            >
              <dt className="text-[10px] font-bold text-navy-primary">
                {String(index + 1).padStart(2, "0")}
              </dt>
              <dd className="m-0 text-[14px] font-bold text-navy-deep">{item}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="border-t border-navy-line">
        {[
          ["CLIENT PICK / 01", "“이 느낌이 좋아요.”", "TYPOGRAPHY + SCALE", "COLOR + NAVIGATION"],
          [
            "JABIN PICK / 02",
            "“이 흐름은 이 프로젝트에 잘 맞습니다.”",
            "CONTENT RHYTHM",
            "DECORATION",
          ],
          [
            "OUTSIDE WEB / 03",
            "“웹이 아니어도 좋은 답이면 봅니다.”",
            "WHITESPACE + COMPOSITION",
            "MEDIUM",
          ],
        ].map(([label, quote, keep, drop]) => (
          <div
            className="grid gap-4 border-b border-navy-line py-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-8"
            key={label}
          >
            <strong className="text-[10px] text-navy-primary">{label}</strong>
            <div>
              <p className="m-0 text-[15px] leading-[1.55] font-bold [word-break:keep-all] text-navy-deep">
                {quote}
              </p>
              <p className="mt-4 mb-0 grid gap-2 text-[10px] font-bold sm:grid-cols-2">
                <span className="text-navy-primary">KEEP / {keep}</span>
                <span className="text-navy-muted">DROP / {drop}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stage === 2) {
    return (
      <div className="bg-navy-night p-5 text-white sm:p-8">
        <div className="flex items-center justify-between border-b border-white/20 pb-4 text-[11px] font-bold">
          <span>design.md</span>
          <span className="text-white/50">v0.5 / LIVING STANDARD</span>
        </div>
        <pre className="mt-6 text-[11px] leading-[1.85] [overflow-wrap:anywhere] whitespace-pre-wrap text-white/75 sm:text-[12px]">
          {`# THIS SHOULD FEEL LIKE\nConfident / Clear / Calm / A little unexpected\n\n# NOT LIKE\nGeneric SaaS / Over-designed / Too playful / AI-looking\n\n# WE KEEP\nLarge type / Real product imagery / Editorial rhythm\n\n# WE AVOID\nUnnecessary cards / Random gradients / Decorative 3D\n\n# DECISIONS\n001  No meaningless 3D object in the hero\n002  Do not frame every project inside a card\n003  Motion only when it helps reading`}
        </pre>
        <div className="mt-7 grid grid-cols-4 border-t border-white/20 pt-4 text-[9px] font-bold text-white/45">
          <span>v0.2 / FIRST</span>
          <span>v0.3 / REVIEW</span>
          <span>v0.4 / FEEDBACK</span>
          <span className="text-navy-signal">v0.5 / REFINED</span>
        </div>
      </div>
    );
  }

  if (stage === 3) {
    return (
      <div className="border-y border-navy-line">
        <div className="grid sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
          <div className="py-6 sm:pr-7">
            <span className="text-[10px] font-bold text-navy-primary">DIRECTION / 01</span>
            <strong className="mt-5 block text-[18px] leading-[1.4] text-navy-deep">
              FIRST DIRECTION
            </strong>
            <span className="mt-3 block text-[13px] leading-[1.6] text-navy-muted">
              큰 타이포그래피와 절제된 움직임을 먼저 공유합니다.
            </span>
          </div>
          <span className="hidden w-px bg-navy-line sm:block" aria-hidden="true" />
          <div className="border-t border-navy-line py-6 sm:border-t-0 sm:pl-7">
            <span className="text-[10px] font-bold text-navy-primary">CLIENT REVIEW</span>
            <strong className="mt-5 block text-[18px] leading-[1.4] text-navy-deep">
              “방향은 맞지만 조금 더 우리답게.”
            </strong>
            <span className="mt-3 block text-[13px] leading-[1.6] text-navy-muted">
              의견을 수정 목록이 아니라 다음 판단의 근거로 사용합니다.
            </span>
          </div>
        </div>
        <div className="grid border-t border-navy-line sm:grid-cols-[1fr_1fr]">
          {[
            ["KEEP", "Typography / whitespace / content rhythm"],
            ["CHANGE", "Tone / section order / interaction weight"],
          ].map(([label, value], index) => (
            <div
              className={`py-5 ${index === 0 ? "sm:border-r sm:pr-7" : "border-t border-navy-line sm:border-t-0 sm:pl-7"}`}
              key={label}
            >
              <strong className="text-[10px] text-navy-primary">{label}</strong>
              <span className="mt-2 block text-[12px] font-bold text-navy-muted">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-navy-line">
      <div className="grid sm:grid-cols-5">
        {[
          ["TYPE", "Typography"],
          ["COLOR", "Color"],
          ["UI", "Component"],
          ["SPACE", "Spacing"],
          ["MOTION", "Interaction Rule"],
        ].map(([label, value], index) => (
          <div
            className="border-b border-navy-line py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            key={label}
          >
            <span className="text-[10px] font-bold text-navy-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="mt-7 block text-[11px] text-navy-muted">{label}</strong>
            <span className="mt-2 block text-[13px] font-bold text-navy-deep">{value}</span>
          </div>
        ))}
      </div>
      <p className="my-0 border-t border-navy-line py-5 text-[13px] font-bold text-navy-deep">
        PAGE OUTPUT → REUSABLE DESIGN SYSTEM
      </p>
    </div>
  );
}

function DesignDetail({
  activeStage,
  onStageChange,
  playing,
}: {
  activeStage: number;
  onStageChange: (stage: number) => void;
  playing: boolean;
}) {
  const stage = designStages[activeStage];
  const playback = useProcessPlayback({
    activeStage,
    stageCount: designStages.length,
    onStageChange,
    playing,
  });

  return (
    <div
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") playback.setHoverPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") playback.setHoverPaused(false);
      }}
    >
      <ProcessStatusBand
        activeStage={activeStage}
        labels={designStages.map((item) => item.label)}
        manualPaused={playback.manualPaused}
        paused={playback.paused}
        playing={playing}
        processLabel="DESIGN PROCESS"
        reducedMotion={playback.reducedMotion}
        onTogglePlayback={() => playback.setManualPaused((current) => !current)}
      />

      <div className="mt-10 grid border-t border-navy-line sm:mt-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-navy-line lg:border-r lg:border-b-0">
          <div
            className="grid grid-cols-5 lg:grid-cols-1"
            role="tablist"
            aria-label="디자인 제작 단계"
          >
            {designStages.map((item, index) => (
              <button
                className={`focus-visible:outline-inset relative flex min-h-20 cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden border-r border-navy-line px-2 text-left text-[9px] font-bold transition-colors last:border-r-0 hover:text-navy-primary focus-visible:outline-2 focus-visible:outline-navy-primary sm:px-3 sm:text-[10px] lg:grid lg:min-h-18 lg:grid-cols-[32px_1fr] lg:items-center lg:gap-0 lg:border-r-0 lg:border-b lg:px-4 lg:text-[11px] ${
                  activeStage === index
                    ? "bg-navy-primary text-white hover:text-white"
                    : "text-navy-muted"
                }`}
                id={`design-stage-${index}`}
                key={item.label}
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                aria-controls="design-stage-panel"
                onClick={() => onStageChange(index)}
              >
                <span>0{index + 1}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="px-0 py-8 sm:py-10 lg:px-12"
          id="design-stage-panel"
          role="tabpanel"
          aria-labelledby={`design-stage-${activeStage}`}
          data-testid="design-stage-panel"
        >
          <p className="m-0 text-[11px] font-bold text-navy-primary">
            {String(activeStage + 1).padStart(2, "0")} / {stage.label}
          </p>
          <h3 className="mt-6 mb-0 text-[28px] leading-[1.2] font-bold [word-break:keep-all] sm:text-[36px]">
            {stage.title}
          </h3>
          <p className="mt-5 mb-0 max-w-[620px] text-[15px] leading-[1.7] [word-break:keep-all] text-navy-muted sm:text-[16px]">
            {stage.description}
          </p>
          <div
            className="design-stage-enter mt-10"
            data-testid="design-stage-artifact"
            key={activeStage}
          >
            <DesignArtifact stage={activeStage} />
          </div>
          <p className="mt-8 mb-0 max-w-[620px] border-l-2 border-navy-primary pl-5 text-[17px] leading-[1.55] font-bold [word-break:keep-all] text-navy-deep">
            {stage.closing}
          </p>
        </div>
      </div>

      <p
        className="mt-10 mb-0 border-l-2 border-navy-primary pl-6 text-[26px] leading-[1.35] font-bold [word-break:keep-all] whitespace-pre-line text-navy-deep sm:mt-12 sm:text-[34px]"
        data-testid="design-closing"
      >
        {
          "좋은 것을 많이 보고.\n우리에게 맞게 다시 만들고.\n함께 결정하고.\n확장할 수 있는 기준으로 남깁니다."
        }
      </p>
      <p className="mt-5 mb-0 text-[10px] font-bold text-navy-primary">
        GOOD DESIGN IS NOT FINISHED ALONE.
      </p>
    </div>
  );
}

function BuildArtifact({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="border-y border-navy-line">
        <div className="flex items-center justify-between border-b border-navy-line py-4 text-[10px] font-bold">
          <span className="text-navy-primary">PRODUCT ARCHITECTURE</span>
          <span className="text-navy-muted">BEFORE DEVELOPMENT</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {[
            ["FRONTEND", "Interface"],
            ["BACKEND", "Business logic"],
            ["DATABASE", "Persistent data"],
            ["AUTH", "Identity & access"],
            ["EXTERNAL API", "Connected service"],
            ["INFRA", "Runtime"],
          ].map(([label, value], index) => (
            <div
              className="border-r border-b border-navy-line px-4 py-5 even:border-r-0 sm:even:border-r sm:[&:nth-child(3n)]:border-r-0"
              key={label}
            >
              <span className="text-[10px] font-bold text-navy-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong className="mt-6 block text-[12px] text-navy-deep">{label}</strong>
              <span className="mt-2 block text-[12px] text-navy-muted">{value}</span>
            </div>
          ))}
        </div>
        <p className="my-0 py-5 text-[13px] font-bold text-navy-deep">
          요구사항을 기능 목록이 아니라 하나의 작동 구조로 정리합니다.
        </p>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="border-y border-navy-line">
        <div className="grid sm:grid-cols-[1fr_1px_1fr]">
          <div className="py-6 sm:pr-8">
            <span className="text-[10px] font-bold text-navy-primary">VISIBLE</span>
            <strong className="mt-6 block text-[20px] text-navy-deep">INTERFACE</strong>
            <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-navy-muted">
              화면, 반응형, 입력과 사용자의 피드백
            </p>
          </div>
          <span className="hidden bg-navy-line sm:block" aria-hidden="true" />
          <div className="border-t border-navy-line py-6 sm:border-t-0 sm:pl-8">
            <span className="text-[10px] font-bold text-navy-primary">WORKING</span>
            <strong className="mt-6 block text-[20px] text-navy-deep">PRODUCT LOGIC</strong>
            <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-navy-muted">
              API, 데이터, 인증, 권한과 비즈니스 규칙
            </p>
          </div>
        </div>
        <p className="my-0 border-t border-navy-line py-5 text-[16px] font-bold text-navy-primary">
          버튼이 있는 것과, 버튼이 작동하는 것은 다릅니다.
        </p>
      </div>
    );
  }

  if (stage === 2) {
    return (
      <div className="border-t border-navy-line">
        {[
          ["RESPONSIVE", "모바일부터 넓은 화면까지"],
          ["BROWSER", "지원 환경의 호환성"],
          ["EXCEPTION", "오류와 빈 상태의 처리"],
          ["PERFORMANCE", "실제 로딩과 반응 속도"],
          ["USER FLOW", "시작부터 완료까지의 흐름"],
        ].map(([label, description], index) => (
          <div
            className="grid grid-cols-[36px_120px_minmax(0,1fr)] gap-4 border-b border-navy-line py-4 sm:grid-cols-[48px_170px_minmax(0,1fr)]"
            key={label}
          >
            <span className="text-[10px] font-bold text-navy-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-[11px] text-navy-deep">{label}</strong>
            <span className="text-[13px] text-navy-muted">{description}</span>
          </div>
        ))}
      </div>
    );
  }

  if (stage === 3) {
    return (
      <div className="border-y border-navy-line py-2">
        {[
          ["AUTHENTICATION", "사용자가 누구인지 확인"],
          ["AUTHORIZATION", "허용된 기능과 데이터 구분"],
          ["DATA HANDLING", "중요한 정보의 저장과 전달 기준"],
          ["SERVER CONFIG", "운영 환경과 비밀 정보 분리"],
          ["NETWORK", "필요한 연결만 허용하는 경계"],
        ].map(([label, description]) => (
          <div
            className="grid gap-2 border-b border-navy-line py-4 last:border-b-0 sm:grid-cols-[170px_minmax(0,1fr)]"
            key={label}
          >
            <strong className="text-[11px] text-navy-primary">{label}</strong>
            <span className="text-[13px] text-navy-muted">{description}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-navy-night px-5 py-7 text-white sm:px-8 sm:py-9">
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
        {[
          ["DOMAIN", "사용자가 접속하는 주소"],
          ["HTTPS", "암호화된 연결"],
          ["SERVER", "서비스 실행 환경"],
          ["DATABASE", "운영 데이터"],
          ["PRODUCTION", "실제 환경 설정"],
          ["CHECK", "배포 이후 확인"],
        ].map(([label, description], index) => (
          <div className="border-t border-white/25 pt-3" key={label}>
            <span className="text-[10px] font-bold text-navy-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="mt-5 block text-[12px]">{label}</strong>
            <span className="mt-2 block text-[11px] text-white/55">{description}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 mb-0 border-t border-white/20 pt-5 text-[11px] font-bold text-navy-signal">
        READY FOR PRODUCTION / READY FOR REAL USERS
      </p>
    </div>
  );
}

function BuildDetail({
  activeStage,
  onStageChange,
  playing,
}: {
  activeStage: number;
  onStageChange: (stage: number) => void;
  playing: boolean;
}) {
  const stage = buildStages[activeStage];
  const playback = useProcessPlayback({
    activeStage,
    stageCount: buildStages.length,
    onStageChange,
    playing,
  });

  return (
    <div
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") playback.setHoverPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") playback.setHoverPaused(false);
      }}
    >
      <ProcessStatusBand
        activeStage={activeStage}
        labels={buildStages.map((item) => item.label)}
        manualPaused={playback.manualPaused}
        paused={playback.paused}
        playing={playing}
        processLabel="PRODUCT BUILD"
        reducedMotion={playback.reducedMotion}
        onTogglePlayback={() => playback.setManualPaused((current) => !current)}
      />

      <div className="mt-10 grid border-t border-navy-line sm:mt-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-navy-line lg:border-r lg:border-b-0">
          <div
            className="grid grid-cols-5 lg:grid-cols-1"
            role="tablist"
            aria-label="제품 개발 단계"
          >
            {buildStages.map((item, index) => (
              <button
                className={`focus-visible:outline-inset flex min-h-18 cursor-pointer flex-col items-start justify-center gap-2 border-r border-b border-navy-line px-3 text-left text-[9px] font-bold transition-colors hover:text-navy-primary focus-visible:outline-2 focus-visible:outline-navy-primary sm:min-h-20 sm:border-b-0 sm:px-2 lg:grid lg:min-h-18 lg:grid-cols-[32px_1fr] lg:items-center lg:gap-0 lg:border-r-0 lg:border-b lg:px-4 lg:text-[11px] ${activeStage === index ? "bg-navy-primary text-white hover:text-white" : "text-navy-muted"}`}
                id={`build-stage-${index}`}
                key={item.label}
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                aria-controls="build-stage-panel"
                onClick={() => onStageChange(index)}
              >
                <span>0{index + 1}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="px-0 py-8 sm:py-10 lg:px-12"
          id="build-stage-panel"
          role="tabpanel"
          aria-labelledby={`build-stage-${activeStage}`}
        >
          <p className="m-0 text-[11px] font-bold text-navy-primary">
            {String(activeStage + 1).padStart(2, "0")} / {stage.label}
          </p>
          <h3 className="mt-6 mb-0 text-[28px] leading-[1.2] font-bold [word-break:keep-all] sm:text-[36px]">
            {stage.title}
          </h3>
          <p className="mt-5 mb-0 max-w-[620px] text-[15px] leading-[1.7] [word-break:keep-all] text-navy-muted sm:text-[16px]">
            {stage.description}
          </p>
          <div
            className="design-stage-enter mt-10"
            data-testid="build-stage-artifact"
            key={activeStage}
          >
            <BuildArtifact stage={activeStage} />
          </div>
        </div>
      </div>

      <p className="mt-10 mb-0 border-l-2 border-navy-primary pl-6 text-[26px] leading-[1.35] font-bold [word-break:keep-all] whitespace-pre-line text-navy-deep sm:mt-12 sm:text-[34px]">
        {
          "Figma가 끝이 아닙니다.\nlocalhost가 끝도 아닙니다.\n사용자가 실제로 쓰는 순간까지가 개발입니다."
        }
      </p>
    </div>
  );
}

function OperateArtifact({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="border-y border-navy-line" data-testid="operate-decision-artifact">
        <div className="flex items-center justify-between border-b border-navy-line py-4 text-[10px] font-bold">
          <span className="text-navy-primary">INFRASTRUCTURE OPTIONS</span>
          <span className="text-navy-muted">CHOOSE / 01</span>
        </div>
        <dl className="m-0 grid sm:grid-cols-3">
          {[
            {
              label: "OWNED",
              title: "Jabin Infrastructure",
              description: "상시 운영되는 핵심 워크로드를 직접 보유한 자원에 구성합니다.",
              meta: "SEOUL / GWANGJU",
            },
            {
              label: "PUBLIC",
              title: "Public Cloud",
              description: "빠른 확장과 관리형 서비스가 필요한 워크로드에 사용합니다.",
              meta: "ON DEMAND",
            },
            {
              label: "EXTERNAL",
              title: "External Service",
              description: "직접 구축할 필요가 없는 기능은 검증된 외부 서비스와 연결합니다.",
              meta: "CONNECTED",
            },
          ].map((option, index) => (
            <div
              className="border-b border-navy-line py-6 last:border-b-0 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              key={option.title}
            >
              <dt className="flex items-center justify-between gap-4 text-[10px] font-bold text-navy-primary">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{option.label}</span>
              </dt>
              <dd className="mt-8 ml-0">
                <strong className="block text-[20px] leading-tight text-navy-deep">
                  {option.title}
                </strong>
                <span className="mt-4 block text-[13px] leading-[1.65] [word-break:keep-all] text-navy-muted sm:min-h-16">
                  {option.description}
                </span>
                <span className="mt-7 block border-t border-navy-line pt-3 text-[10px] font-bold text-navy-deep">
                  {option.meta}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="my-0 border-t border-navy-line py-5 text-[14px] leading-[1.6] font-bold [word-break:keep-all] text-navy-deep">
          우리가 가진 서버를 파는 것이 아니라, 서비스에 맞는 서버를 고릅니다.
        </p>
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-navy-line py-7 sm:grid-cols-3">
        {[
          ["SERVER", "서비스 실행"],
          ["DATABASE", "운영 데이터"],
          ["DOMAIN", "접속 주소"],
          ["SSL", "암호화 연결"],
          ["NETWORK", "통신 경계"],
          ["ENVIRONMENT", "운영 설정"],
        ].map(([label, description], index) => (
          <div className="border-t border-navy-primary pt-3" key={label}>
            <span className="text-[10px] font-bold text-navy-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="mt-5 block text-[11px] text-navy-deep">{label}</strong>
            <span className="mt-2 block text-[12px] text-navy-muted">{description}</span>
          </div>
        ))}
      </div>
    );
  }

  if (stage === 2) {
    return (
      <div className="border-t border-navy-line">
        {[
          ["STATUS", "서비스가 정상적으로 응답하는지 확인"],
          ["LOG", "문제 전후에 무엇이 일어났는지 기록"],
          ["TRACE", "오류가 시작된 위치와 원인 추적"],
          ["RESPONSE", "확인된 원인에 맞춰 대응"],
        ].map(([label, description], index) => (
          <div
            className="grid gap-3 border-b border-navy-line py-5 sm:grid-cols-[48px_150px_minmax(0,1fr)]"
            key={label}
          >
            <span className="text-[10px] font-bold text-navy-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-[12px] text-navy-deep">{label}</strong>
            <span className="text-[13px] text-navy-muted">{description}</span>
          </div>
        ))}
      </div>
    );
  }

  if (stage === 3) {
    return (
      <div className="border-y border-navy-line py-2">
        {[
          ["ACCESS CONTROL", "운영 권한과 접근 범위"],
          ["BACKUP", "데이터 보호와 복구 기준"],
          ["NETWORK", "필요한 연결만 허용하는 경계"],
          ["SECURITY CONFIG", "환경과 비밀 정보의 분리"],
        ].map(([label, description]) => (
          <div
            className="grid gap-2 border-b border-navy-line py-4 last:border-b-0 sm:grid-cols-[180px_minmax(0,1fr)]"
            key={label}
          >
            <strong className="text-[11px] text-navy-primary">{label}</strong>
            <span className="text-[13px] text-navy-muted">{description}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-navy-night px-5 py-7 text-white sm:px-8 sm:py-9">
      <div className="grid gap-7 sm:grid-cols-3">
        {[
          ["BASELINE", "상시 사용량", "필요한 만큼 안정적으로"],
          ["PEAK", "증가 구간", "확장이 필요한 순간에만"],
          ["COST", "지속 비용", "계속 감당할 수 있는 구조로"],
        ].map(([label, title, description], index) => (
          <div className="border-t border-white/25 pt-3" key={label}>
            <span className="text-[10px] font-bold text-navy-signal">
              {String(index + 1).padStart(2, "0")} / {label}
            </span>
            <strong className="mt-6 block text-[16px]">{title}</strong>
            <span className="mt-3 block text-[12px] leading-[1.6] text-white/55">
              {description}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 mb-0 border-t border-white/20 pt-5 text-[11px] font-bold text-navy-signal">
        RIGHT-SIZED INFRASTRUCTURE / PREDICTABLE OPERATION
      </p>
    </div>
  );
}

function OperateDetail({
  activeStage,
  onStageChange,
  playing,
}: {
  activeStage: number;
  onStageChange: (stage: number) => void;
  playing: boolean;
}) {
  const stage = operateStages[activeStage];
  const playback = useProcessPlayback({
    activeStage,
    stageCount: operateStages.length,
    onStageChange,
    playing,
  });

  return (
    <div
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") playback.setHoverPaused(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") playback.setHoverPaused(false);
      }}
    >
      <ProcessStatusBand
        activeStage={activeStage}
        labels={operateStages.map((item) => item.label)}
        manualPaused={playback.manualPaused}
        paused={playback.paused}
        playing={playing}
        processLabel="SERVICE OPERATION"
        reducedMotion={playback.reducedMotion}
        onTogglePlayback={() => playback.setManualPaused((current) => !current)}
      />

      <div className="mt-10 grid border-t border-navy-line sm:mt-12 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="border-b border-navy-line lg:border-r lg:border-b-0">
          <div
            className="grid grid-cols-5 lg:grid-cols-1"
            role="tablist"
            aria-label="서비스 운영 단계"
          >
            {operateStages.map((item, index) => (
              <button
                className={`focus-visible:outline-inset flex min-h-18 cursor-pointer flex-col items-start justify-center gap-2 border-r border-b border-navy-line px-3 text-left text-[9px] font-bold transition-colors hover:text-navy-primary focus-visible:outline-2 focus-visible:outline-navy-primary sm:min-h-20 sm:border-b-0 sm:px-2 lg:grid lg:min-h-18 lg:grid-cols-[32px_1fr] lg:items-center lg:gap-0 lg:border-r-0 lg:border-b lg:px-4 lg:text-[11px] ${activeStage === index ? "bg-navy-primary text-white hover:text-white" : "text-navy-muted"}`}
                id={`operate-stage-${index}`}
                key={item.label}
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                aria-controls="operate-stage-panel"
                onClick={() => onStageChange(index)}
              >
                <span>0{index + 1}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="px-0 py-8 sm:py-10 lg:px-12"
          id="operate-stage-panel"
          role="tabpanel"
          aria-labelledby={`operate-stage-${activeStage}`}
        >
          <p className="m-0 text-[11px] font-bold text-navy-primary">
            {String(activeStage + 1).padStart(2, "0")} / {stage.label}
          </p>
          <h3 className="mt-6 mb-0 text-[28px] leading-[1.2] font-bold [word-break:keep-all] sm:text-[36px]">
            {stage.title}
          </h3>
          <p className="mt-5 mb-0 max-w-[620px] text-[15px] leading-[1.7] [word-break:keep-all] text-navy-muted sm:text-[16px]">
            {stage.description}
          </p>
          <div
            className="design-stage-enter mt-10"
            data-testid="operate-stage-artifact"
            key={activeStage}
          >
            <OperateArtifact stage={activeStage} />
          </div>
        </div>
      </div>

      <p className="mt-10 mb-0 border-l-2 border-navy-primary pl-6 text-[26px] leading-[1.35] font-bold [word-break:keep-all] whitespace-pre-line text-navy-deep sm:mt-12 sm:text-[34px]">
        {"배포는 완료가 아니라,\n운영의 시작입니다."}
      </p>
    </div>
  );
}

export function StudioPrinciples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [designStage, setDesignStage] = useState(0);
  const [buildStage, setBuildStage] = useState(0);
  const [operateStage, setOperateStage] = useState(0);
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
    if (index === 0) setDesignStage(0);
    if (index === 1) setBuildStage(0);
    if (index === 2) setOperateStage(0);
    trackEvent("service_view", {
      service_name: ["design", "engineering", "operation"][index] ?? "unknown",
      section_name: "how_we_build",
    });
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
              className="group grid w-full cursor-pointer gap-5 border-b border-navy-line py-7 text-left transition-[background-color,border-color] duration-500 hover:border-navy-primary hover:bg-navy-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-primary motion-reduce:transition-none sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-7 sm:py-8 lg:py-9 xl:grid-cols-[80px_minmax(300px,0.9fr)_minmax(240px,0.6fr)_minmax(280px,0.8fr)] xl:items-baseline xl:gap-9"
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => openDetail(index, event.currentTarget)}
            >
              <span className="text-[12px] font-bold text-navy-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="principle-title origin-left text-[27px] leading-[1.2] font-bold [word-break:keep-all] transition-[color,scale] duration-500 group-hover:scale-[1.035] group-hover:text-navy-primary motion-reduce:transform-none motion-reduce:transition-none sm:text-[32px] lg:text-[36px]"
                role="heading"
                aria-level={3}
              >
                {principle.title}
              </span>
              <span className="text-[15px] leading-[1.65] [word-break:keep-all] text-navy-muted sm:col-start-2 sm:text-[16px] xl:col-start-auto">
                {principle.description}
              </span>
              <span className="grid gap-5 transition-transform duration-500 group-hover:translate-x-2 motion-reduce:transform-none motion-reduce:transition-none sm:col-start-2 xl:col-start-auto">
                <strong className="border-l-2 border-navy-primary pl-5 text-[15px] leading-[1.55] [word-break:keep-all] text-navy-deep sm:text-[16px]">
                  {principle.statement}
                </strong>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-navy-muted transition-colors duration-300 group-hover:text-navy-primary">
                  {principle.label}
                  <span
                    className="grid size-5 place-items-center border border-current text-[14px] leading-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[180] overflow-hidden transition-[visibility] duration-300 ${open ? "visible" : "invisible"}`}
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

                  {activeIndex === 0 ? (
                    <DesignDetail
                      activeStage={designStage}
                      onStageChange={setDesignStage}
                      playing={open}
                    />
                  ) : activeIndex === 1 ? (
                    <BuildDetail
                      activeStage={buildStage}
                      onStageChange={setBuildStage}
                      playing={open}
                    />
                  ) : (
                    <OperateDetail
                      activeStage={operateStage}
                      onStageChange={setOperateStage}
                      playing={open}
                    />
                  )}
                </div>
              </section>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
