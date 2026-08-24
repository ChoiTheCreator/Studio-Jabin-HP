import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell } from "@/components/ui/tailwind";

import { AnimatedInfrastructureCostGraph } from "./AnimatedInfrastructureCostGraph";

const comparisonRows = [
  { label: "리소스 제공", aws: "제공", jabin: "제공" },
  { label: "운영·관리", aws: "별도 구성 필요", jabin: "전문인력 직접 담당" },
  { label: "보안", aws: "별도 구성 필요", jabin: "전문인력 직접 담당" },
  { label: "책임 구조", aws: "책임 분산", jabin: "통합 책임" },
] as const;

function MobileInfrastructureComparison() {
  return (
    <div
      className="rounded-[8px] border border-[#e7e9ed] bg-white px-5 py-6 md:hidden"
      aria-label="AWS 직접 구축과 Jabin 인프라 서비스 비교"
      data-testid="infrastructure-comparison-mobile"
    >
      <div className="grid grid-cols-2 gap-4 text-[18px] leading-[1.25] font-bold">
        <p className="w-fit border-b-2 border-[#ff9900] pb-1 text-[#6b4100]">AWS 직접 구축</p>
        <p className="w-fit border-b-2 border-[#142b4a] pb-1 text-[#142b4a]">Jabin 구축</p>
      </div>

      <dl className="mt-5">
        {comparisonRows.map((row) => (
          <div
            className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#e7e9ed] py-5 first:pt-4 last:pb-0"
            key={row.label}
          >
            <dt className="col-span-2 text-[14px] font-medium text-[#626b76]">{row.label}</dt>
            <dd className="text-[15px] leading-[1.45] font-medium text-[#24272c]">
              <span className="mb-1 block text-[12px] font-bold text-[#6b4100]">AWS</span>
              <span className="block">{row.aws}</span>
            </dd>
            <dd className="text-[15px] leading-[1.45] font-bold text-[#142b4a]">
              <span className="mb-1 block text-[12px] font-bold text-[#142b4a]">Jabin</span>
              <span className="block">{row.jabin}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function InfrastructureComparison() {
  return (
    <Reveal className="w-full max-w-[690px] justify-self-center" delay={80}>
      <div data-testid="infrastructure-comparison">
        <MobileInfrastructureComparison />
        <Image
          className="hidden h-auto w-full md:block"
          src="/images/why-our-service/text_comparison.svg"
          alt="AWS 직접 구축과 Jabin 인프라 서비스의 리소스 제공, 운영·관리, 보안, 책임 구조 비교"
          width={698}
          height={392}
          sizes="(min-width: 1280px) 690px, (min-width: 1120px) 57vw, (min-width: 768px) min(690px, calc(100vw - 64px)), 0px"
          unoptimized
        />
      </div>
    </Reveal>
  );
}

function InfrastructureCostGraph() {
  return (
    <Reveal className="w-full max-w-[400px] justify-self-center" delay={180}>
      <AnimatedInfrastructureCostGraph />
    </Reveal>
  );
}

export function InfrastructureSection() {
  return (
    <section
      className="border-t border-navy-line bg-navy-surface py-24 sm:py-32 lg:py-40"
      id="why-infrastructure"
      aria-labelledby="infrastructure-title"
    >
      <div className={contentShell}>
        <Reveal className="max-w-[900px]">
          <p className="mb-7 text-[18px] font-bold text-navy-primary sm:mb-9 sm:text-[20px]">04</p>
          <h2
            className="text-[40px] leading-[1.02] font-bold text-navy-ink sm:text-[50px] lg:text-[68px]"
            id="infrastructure-title"
          >
            <span className="block sm:inline">인프라도, 더 효율적으로</span>{" "}
            <span className="block sm:inline">설계합니다.</span>
          </h2>
          <p className="mt-8 max-w-[680px] text-[17px] leading-[1.65] text-navy-muted sm:mt-10 sm:text-[20px]">
            <span className="block">웹사이트 제작에 그치지 않고,</span>
            <span className="block">
              실제 사용자가 접근할 수 있는 환경까지 전문 인력이 직접 배포하고 운영합니다.
            </span>
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid w-full max-w-[1122px] items-center gap-10 min-[1120px]:grid-cols-[minmax(0,1.725fr)_minmax(0,1fr)] min-[1120px]:gap-8 sm:mt-16">
          <InfrastructureComparison />
          <InfrastructureCostGraph />
        </div>

        <Reveal className="mx-auto mt-16 max-w-[760px] text-center sm:mt-20 lg:mt-24" delay={280}>
          <h3 className="text-[30px] leading-[1.12] font-bold text-navy-ink sm:text-[40px] lg:text-[50px]">
            <span className="block">운영까지 포함하면,</span>
            <span className="block">
              비용과 책임 구조는 <span className="block sm:inline">더 크게 달라집니다.</span>
            </span>
          </h3>
          <p className="mt-7 text-[16px] leading-[1.65] text-navy-muted sm:mt-8 sm:text-[19px]">
            서버를 제공하는 것을 넘어,
            <br />
            운영 가능한 인프라를 함께 만듭니다.
          </p>
          <p className="mx-auto mt-10 max-w-[560px] text-[12px] leading-[1.6] text-navy-muted sm:text-[13px]">
            동일·유사 사양 기준 예상 비용이며, 실제 비용은 사용량과 운영 환경에 따라 달라질 수
            있습니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
