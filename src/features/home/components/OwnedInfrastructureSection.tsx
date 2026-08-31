import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { TextHighlight } from "@/components/ui/TextHighlight";
import {
  aiInfrastructureSpecs,
  coreInfrastructureFeatures,
  infrastructureRegionServices,
} from "../home.content";

type RegionServiceSegment = {
  text: string;
  highlight?: boolean;
};

function RegionServiceCopy({ segments }: { segments: readonly RegionServiceSegment[] }) {
  return segments.map((segment, index) =>
    segment.highlight ? (
      <TextHighlight className="font-bold !text-navy-ink" key={`${index}-${segment.text}`}>
        {segment.text}
      </TextHighlight>
    ) : (
      segment.text
    ),
  );
}

export function OwnedInfrastructureSection({ overviewOnly = false }: { overviewOnly?: boolean }) {
  return (
    <section id="infrastructure" aria-labelledby="infrastructure-title">
      <div
        className="bg-navy-surface py-22 text-navy-ink sm:py-28 lg:py-32"
        data-testid="infrastructure-overview"
      >
        <div className={contentShell}>
          <div className="md:grid md:grid-cols-[minmax(0,1fr)_240px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 xl:grid-cols-[800px_minmax(0,1fr)] xl:gap-8">
            <div className="xl:max-w-200" data-testid="infrastructure-intro">
              <Reveal className="border-t border-navy-line pt-5 sm:pt-3 lg:pt-6">
                <div className="flex items-center justify-between gap-6">
                  <p className={`${eyebrow} text-navy-primary`}>OWNED INFRASTRUCTURE</p>
                  <p className="m-0 text-[12px] font-bold text-navy-muted">02 REGIONS</p>
                </div>

                <h2
                  className="mt-14 mb-0 flex items-center justify-between gap-2 text-[34px] leading-none font-bold sm:mt-20 sm:gap-3 sm:text-[64px] md:justify-start md:gap-6 md:text-[42px] lg:mt-24 lg:gap-10 lg:text-[60px] xl:gap-14 xl:text-[72px]"
                  id="infrastructure-title"
                  aria-label="Seoul to Gwangju"
                >
                  <span className="whitespace-nowrap">Seoul</span>
                  <span className="text-navy-primary" aria-hidden="true">
                    ↔
                  </span>
                  <span className="whitespace-nowrap">Gwangju</span>
                </h2>

                <div className="mt-14 grid gap-8 sm:mt-18 md:grid-cols-1 md:items-start xl:grid-cols-[332px_minmax(0,1fr)]">
                  <p className="m-0 max-w-190 text-[34px] leading-[1.08] font-bold break-keep sm:text-[46px] md:text-[38px] lg:text-[42px] xl:text-[38px]">
                    <TextHighlight>자체 인프라</TextHighlight>로
                    <br />
                    서비스를 직접
                    <br />
                    운영합니다.
                  </p>
                  <p className="m-0 max-w-145 text-[16px] leading-[1.72] break-keep text-navy-muted sm:text-[18px] xl:text-[16px]">
                    서울의 AI 컴퓨팅 인프라와 광주의 서비스 운영 인프라를 기반으로 외부 클라우드
                    의존도를 낮추고 운영 비용을 효율적으로 설계합니다.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-10 ml-auto w-full max-w-60 overflow-hidden rounded-md sm:mt-14 sm:max-w-72 md:mt-0 md:max-w-none">
              <Image
                className="h-auto w-full"
                src="/images/infrastructure/infra-map-v2.png"
                alt="서울과 광주의 자체 인프라 거점을 연결한 대한민국 네트워크 지도"
                width={1099}
                height={1431}
                sizes="(min-width: 1280px) 332px, (min-width: 1024px) 280px, (min-width: 768px) 240px, (min-width: 640px) 288px, 240px"
              />
            </Reveal>
          </div>

          <Reveal
            className={`${overviewOnly ? "hidden" : ""} mt-18 border-y border-navy-line py-7 sm:mt-24 sm:py-9 lg:mt-32`}
            data-testid="infrastructure-locations"
          >
            <div
              className="grid grid-cols-2 gap-10"
              role="img"
              aria-label="서울 AI 컴퓨팅과 광주 코어 컴퓨팅을 연결한 자체 인프라"
            >
              <div>
                <p className="m-0 text-[28px] leading-none font-bold sm:text-[38px] lg:text-[46px]">
                  SEOUL
                </p>
                <p className="mt-3 mb-0 text-[11px] font-bold text-navy-primary sm:text-[12px]">
                  AI COMPUTE
                </p>
              </div>
              <div className="text-right">
                <p className="m-0 text-[28px] leading-none font-bold sm:text-[38px] lg:text-[46px]">
                  GWANGJU
                </p>
                <p className="mt-3 mb-0 text-[11px] font-bold text-navy-primary sm:text-[12px]">
                  CORE COMPUTE
                </p>
              </div>
            </div>

            <div className="relative mt-8 h-px bg-navy-line sm:mt-10" aria-hidden="true">
              <span className="infrastructure-region__signal" />
            </div>
          </Reveal>

          <Reveal className={`${overviewOnly ? "hidden" : ""} mt-10 sm:mt-14`}>
            <details
              className="group border-b border-navy-line"
              data-testid="infrastructure-details"
            >
              <summary className="infrastructure-details__summary grid min-h-24 cursor-pointer list-none grid-cols-[minmax(0,1fr)_44px] items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-primary sm:min-h-28 sm:grid-cols-[minmax(0,1fr)_48px] sm:gap-8 sm:py-7 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block text-[16px] leading-tight font-bold sm:text-[18px]">
                    기술 사양 자세히 보기
                  </span>
                  <span className="mt-2 block max-w-150 text-[12px] leading-[1.55] font-medium break-keep text-navy-muted sm:text-[14px]">
                    서울 AI Compute와 광주 Core Compute의 서비스 범위와 장비 구성을 확인합니다.
                  </span>
                </span>
                <span
                  className="infrastructure-details__indicator relative grid size-11 shrink-0 place-items-center border border-navy-ink transition-[background-color,border-color,transform] duration-300 group-open:border-navy-primary group-open:bg-navy-primary motion-reduce:transition-none sm:size-12"
                  data-testid="infrastructure-details-indicator"
                  aria-hidden="true"
                >
                  <span className="absolute h-px w-4 bg-navy-ink transition-colors duration-300 group-open:bg-white motion-reduce:transition-none" />
                  <span
                    className="absolute h-4 w-px bg-navy-ink transition-[transform,background-color] duration-300 group-open:scale-y-0 group-open:bg-white motion-reduce:transition-none"
                    data-testid="infrastructure-details-indicator-vertical"
                  />
                </span>
              </summary>

              <div className="infrastructure-details__content grid gap-14 border-t border-navy-line py-10 sm:py-14 lg:grid-cols-2 lg:gap-0">
                <section className="lg:pr-14" aria-labelledby="seoul-specs-title">
                  <p className="m-0 text-[11px] font-bold text-navy-primary">SEOUL / AI COMPUTE</p>
                  <h3
                    className="mt-5 mb-0 text-[32px] leading-none font-bold sm:text-[40px]"
                    id="seoul-specs-title"
                  >
                    Seoul
                  </h3>
                  <p className="mt-6 mb-0 max-w-120 text-[15px] leading-[1.68] font-medium break-keep text-navy-muted sm:text-[16px]">
                    <RegionServiceCopy segments={infrastructureRegionServices.seoul} />
                  </p>
                  <dl className="mt-10 space-y-5">
                    {aiInfrastructureSpecs.map((spec) => (
                      <div
                        className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-6"
                        key={spec.label}
                      >
                        <dt className="text-[11px] font-bold text-navy-muted">{spec.label}</dt>
                        <dd className="m-0 text-[18px] leading-[1.25] font-bold">
                          {spec.value}
                          {spec.detail ? (
                            <span className="mt-1 block text-[12px] leading-[1.5] font-medium text-navy-muted">
                              {spec.detail}
                            </span>
                          ) : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section
                  className="border-t border-navy-line pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14"
                  aria-labelledby="gwangju-specs-title"
                >
                  <p className="m-0 text-[11px] font-bold text-navy-primary">
                    GWANGJU / CORE COMPUTE
                  </p>
                  <h3
                    className="mt-5 mb-0 text-[32px] leading-none font-bold sm:text-[40px]"
                    id="gwangju-specs-title"
                  >
                    Gwangju
                  </h3>
                  <p className="mt-6 mb-0 max-w-120 text-[15px] leading-[1.68] font-medium break-keep text-navy-muted sm:text-[16px]">
                    <RegionServiceCopy segments={infrastructureRegionServices.gwangju} />
                  </p>
                  <ul className="mt-10 list-none space-y-3 p-0">
                    {coreInfrastructureFeatures.map((feature) => (
                      <li className="text-[18px] leading-[1.35] font-bold" key={feature}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </details>
          </Reveal>
        </div>
      </div>

      {/* <div className="bg-white py-22 text-navy-ink sm:py-28 lg:py-36">
        <div className={contentShell}>
          <Reveal className="border-t border-navy-line pt-7 lg:pt-9">
            <h2 className="m-0 max-w-240 text-[42px] leading-[1.02] font-bold break-keep sm:text-[64px] lg:text-[86px]">
              서버를 계속 빌리는 대신,
              <br />
              <span className="text-navy-primary">우리는 직접 운영합니다.</span>
            </h2>
          </Reveal>

          <Reveal className="mt-14 grid gap-9 sm:mt-20 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <p className="m-0 text-[12px] font-bold text-navy-muted">OPERATING MODEL</p>
            <div className="max-w-170 text-[17px] leading-[1.75] break-keep text-navy-muted sm:text-[19px]">
              <p className="m-0">
                AWS와 같은 퍼블릭 클라우드는 서버가 실행되는 동안 지속적으로 비용이 발생합니다.
              </p>
              <p className="mt-6 mb-0">
                Jabin Studio는 서울과 광주에 자체 컴퓨팅 인프라를 보유하고 있어 상시 운영되는
                워크로드는 자체 인프라에서 처리하고, 확장이 필요한 순간에는 클라우드를 함께 활용할
                수 있습니다.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-16 border-y border-navy-line py-8 sm:mt-24 sm:py-10 lg:mt-28">
            <p className="m-0 max-w-220 text-[28px] leading-[1.12] font-bold sm:text-[40px] lg:text-[52px]">
              Own infrastructure for the baseline.
              <br />
              <span className="text-navy-primary">Cloud for the peaks.</span>
            </p>
          </Reveal>

          <Reveal className="mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
            <p className="m-0 max-w-130 text-[20px] leading-[1.4] font-bold break-keep sm:text-[24px]">
              소프트웨어뿐만 아니라, 그 소프트웨어가 동작할 환경까지 설계합니다.
            </p>
            <a
              className="inline-flex min-h-12 w-fit items-center gap-3 border-b border-navy-ink text-[14px] font-bold transition-colors duration-200 hover:border-navy-primary hover:text-navy-primary"
              href="#contact"
            >
              프로젝트 문의
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div> */}
    </section>
  );
}
