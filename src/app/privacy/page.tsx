import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { pageShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";
import { SiteFooter } from "@/features/home/components/SiteFooter";

export const metadata: Metadata = {
  title: `개인정보 처리 안내 | ${brand.name}`,
  description: `${brand.name} 프로젝트 문의 과정에서 수집하는 개인정보와 처리 기준입니다.`,
  alternates: { canonical: "/privacy" },
};

const sectionClass = "border-t border-ink pt-5";
const headingClass = "m-0 text-[24px] leading-[1.2] font-bold sm:text-[30px]";
const bodyClass = "mt-5 mb-0 text-[15px] leading-[1.75] text-muted [word-break:keep-all]";

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-paper" id="top">
        <header
          className={`${pageShell} flex h-24 items-center justify-between border-b border-ink/20`}
        >
          <Link
            className="inline-flex min-h-11 w-[84px] items-center"
            href="/"
            aria-label={`${brand.name} 홈`}
          >
            <Image
              src={brand.assets.logoWord}
              alt=""
              width={446}
              height={233}
              className="h-auto w-[84px]"
              priority
              sizes="84px"
            />
          </Link>
          <Link className="text-[12px] font-bold" href="/">
            홈으로
          </Link>
        </header>

        <article className={`${pageShell} py-[72px] sm:py-24 lg:py-32`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <div>
              <p className="m-0 text-[12px] font-bold text-blue">PRIVACY</p>
              <h1 className="mt-6 mb-0 text-[48px] leading-[0.95] font-bold [word-break:keep-all] sm:text-[68px] lg:text-[82px]">
                개인정보
                <br />
                처리 안내
              </h1>
              <p className="mt-6 mb-0 text-[12px] font-bold text-muted">시행일 2026. 08. 03.</p>
            </div>

            <div className="grid gap-16">
              <section className={sectionClass}>
                <h2 className={headingClass}>1. 수집하는 정보</h2>
                <p className={bodyClass}>
                  프로젝트 문의 과정에서 이름, 이메일, 회사 또는 브랜드명, 연락처, 프로젝트 유형,
                  필요한 업무 범위, 예상 일정, 예산 구간과 프로젝트 설명을 수집합니다. 회사명,
                  연락처, 일정과 예산은 선택 항목입니다.
                </p>
              </section>

              <section className={sectionClass}>
                <h2 className={headingClass}>2. 이용 목적</h2>
                <p className={bodyClass}>
                  접수된 정보는 문의 내용 확인, 기술 및 수행 범위 검토, 일정·견적 제안과 후속 연락을
                  위해서만 사용합니다.
                </p>
              </section>

              <section className={sectionClass}>
                <h2 className={headingClass}>3. 보유 기간과 파기</h2>
                <p className={bodyClass}>
                  문의 정보는 접수일로부터 1년간 보관한 뒤 복구할 수 없는 방식으로 파기합니다. 보유
                  기간 중 삭제를 요청하거나 수집 목적이 사라진 경우 필요한 확인을 거쳐 지체 없이
                  파기합니다.
                </p>
              </section>

              <section className={sectionClass}>
                <h2 className={headingClass}>4. 동의 거부와 영향</h2>
                <p className={bodyClass}>
                  개인정보 수집 및 이용에 동의하지 않을 수 있습니다. 다만 필수 항목 제공과 동의가
                  없으면 홈페이지를 통한 프로젝트 문의 접수가 어렵습니다. 이 경우 아래 이메일로 직접
                  문의할 수 있습니다.
                </p>
              </section>

              <section className={sectionClass}>
                <h2 className={headingClass}>5. 외부 서비스와 처리 위탁</h2>
                <p className={bodyClass}>
                  현재 홈페이지 문의 정보의 외부 처리 수탁사를 확정하지 않았습니다. 이메일, 협업
                  도구, 저장 서비스 등 외부 처리 수탁사를 도입하는 경우 업체명, 목적과 보유 기준을
                  이 문서에 반영합니다.
                </p>
              </section>

              <section className={sectionClass}>
                <h2 className={headingClass}>6. 문의와 권리 행사</h2>
                <p className={bodyClass}>
                  본인의 문의 정보에 대한 열람, 정정 또는 삭제는{" "}
                  <a
                    className="border-b border-current font-bold text-ink"
                    href={`mailto:${brand.contactEmail}`}
                  >
                    {brand.contactEmail}
                  </a>
                  로 요청할 수 있습니다. 요청자 확인이 필요한 경우 최소한의 추가 정보를 요청할 수
                  있습니다.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
