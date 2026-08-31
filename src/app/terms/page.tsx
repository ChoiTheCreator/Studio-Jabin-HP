import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { pageShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";
import { SiteFooter } from "@/features/home/components/SiteFooter";

export const metadata: Metadata = {
  title: `이용약관 | ${brand.name}`,
  description: `${brand.name} 홈페이지의 이용 조건과 안내입니다.`,
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. 목적",
    body: "이 약관은 Jabin Studio가 운영하는 홈페이지의 이용 조건과 방문자 및 회사의 기본적인 권리와 책임을 안내합니다.",
  },
  {
    title: "2. 홈페이지 이용",
    body: "방문자는 관계 법령과 이 약관을 준수해 홈페이지를 이용해야 합니다. 서비스 운영을 방해하거나 다른 사람의 권리를 침해하는 방식으로 이용할 수 없습니다.",
  },
  {
    title: "3. 프로젝트 문의",
    body: "홈페이지를 통한 문의 접수는 계약 체결이나 업무 착수를 의미하지 않습니다. 구체적인 업무 범위, 일정, 비용과 결과물의 권리는 별도로 합의한 계약 또는 견적 조건을 따릅니다.",
  },
  {
    title: "4. 콘텐츠와 지식재산권",
    body: "홈페이지에 게시된 로고, 문구, 이미지, 디자인과 코드에 관한 권리는 Jabin Studio 또는 정당한 권리자에게 있습니다. 사전 동의 없이 상업적으로 복제, 배포 또는 변경할 수 없습니다.",
  },
  {
    title: "5. 외부 링크와 서비스",
    body: "홈페이지에는 외부 웹사이트나 서비스로 연결되는 링크가 포함될 수 있습니다. 외부 서비스의 내용과 이용 조건은 해당 운영자의 정책을 따릅니다.",
  },
  {
    title: "6. 변경과 문의",
    body: `운영 또는 관련 기준의 변경에 따라 약관을 수정할 수 있으며, 중요한 변경은 홈페이지에 안내합니다. 약관에 관한 문의는 ${brand.contactEmail}으로 접수할 수 있습니다.`,
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <main className="bg-paper">
        <header className={`${pageShell} flex h-24 items-center justify-between border-b border-ink/20`}>
          <Link className="inline-flex min-h-11 w-[84px] items-center" href="/" aria-label={`${brand.name} 홈`}>
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
              <p className="m-0 text-[12px] font-bold text-blue">TERMS</p>
              <h1 className="mt-6 mb-0 text-[48px] leading-[0.95] font-bold break-keep sm:text-[68px] lg:text-[82px]">
                홈페이지
                <br />
                이용약관
              </h1>
              <p className="mt-6 mb-0 text-[12px] font-bold text-muted">시행일 2026. 08. 25.</p>
            </div>

            <div className="grid gap-14">
              {sections.map((section) => (
                <section className="border-t border-ink pt-5" key={section.title}>
                  <h2 className="m-0 text-[24px] leading-[1.2] font-bold sm:text-[30px]">
                    {section.title}
                  </h2>
                  <p className="mt-5 mb-0 text-[15px] leading-[1.75] text-muted [word-break:keep-all]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
