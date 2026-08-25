import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { contentShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

import { FooterFaqLink } from "./FooterFaqLink";

export function SiteFooter() {
  return (
    <footer className="bg-navy-night pt-24 pb-8 text-white sm:pt-28 sm:pb-10 lg:pt-32">
      <div className={contentShell}>
        <div className="grid gap-16 pb-16 sm:pb-20 lg:grid-cols-[minmax(240px,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-24">
          <div>
            <Link
              className="block w-[150px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-[178px]"
              href="/"
              aria-label={`${brand.name} 홈`}
            >
              <Image
                className="h-auto w-full brightness-0 invert"
                src={brand.assets.logoWord}
                alt=""
                width={446}
                height={233}
                sizes="(min-width: 640px) 178px, 150px"
              />
            </Link>
            <p className="mt-5 mb-0 text-[11px] font-bold text-white/48">
              JABIN STUDIO · SEOUL · GWANGJU
            </p>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            <p className="m-0 text-[11px] font-bold text-white/48">HAVE A PROJECT IN MIND?</p>
            <a
              className="group mt-5 inline-flex min-h-12 items-center gap-3 border-b border-white/65 pb-1 text-[25px] leading-tight font-bold text-white transition-[border-color,opacity] duration-200 hover:border-white hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[30px] lg:text-[32px]"
              href={`mailto:${brand.contactEmail}`}
            >
              {brand.contactEmail}
              <ArrowUpRightIcon
                className="size-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-6"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-12 border-t border-white/18 py-12 text-[13px] leading-[1.65] sm:grid-cols-2 sm:py-14 lg:grid-cols-[0.9fr_1.15fr_0.8fr_0.8fr] lg:gap-16">
          <section aria-labelledby="footer-company">
            <FooterHeading id="footer-company">COMPANY</FooterHeading>
            <dl className="m-0 grid gap-3 text-white/78">
              <FooterDetail label="회사명">{brand.company.legalName}</FooterDetail>
              <FooterDetail label="대표자">{brand.company.representatives.join(" · ")}</FooterDetail>
              <FooterDetail label="사업자등록번호">
                {brand.company.businessRegistrationNumber}
              </FooterDetail>
            </dl>
          </section>

          <address className="not-italic" aria-labelledby="footer-contact">
            <FooterHeading id="footer-contact">CONTACT</FooterHeading>
            <p className="m-0 break-keep text-white/78">{brand.company.address}</p>
          </address>

          <nav aria-labelledby="footer-guide">
            <FooterHeading id="footer-guide">GUIDE</FooterHeading>
            <div className="grid justify-items-start gap-1">
              <FooterFaqLink className={footerLink} />
              <Link className={footerLink} href="/#contact">
                프로젝트 문의
              </Link>
              <Link className={footerLink} href="/why-our-service">
                Why Jabin
              </Link>
            </div>
          </nav>

          <nav aria-labelledby="footer-legal">
            <FooterHeading id="footer-legal">LEGAL</FooterHeading>
            <div className="grid justify-items-start gap-1">
              <Link className={footerLink} href="/terms">
                이용약관
              </Link>
              <Link className={footerLink} href="/privacy">
                개인정보처리방침
              </Link>
              <a
                className={footerLink}
                href="https://www.hometax.go.kr"
                target="_blank"
                rel="noreferrer"
              >
                사업자등록 상태 확인 ↗
              </a>
            </div>
          </nav>
        </div>

        <div className="grid gap-4 border-t border-white/18 pt-8 text-[11px] leading-[1.5] text-white/48 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <p className="m-0">Planning · Design · Engineering · Infrastructure · Operations</p>
          <p className="m-0 sm:text-right">
            Copyright © {new Date().getFullYear()} {brand.company.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerLink =
  "inline-flex min-h-9 items-center border-b border-transparent text-white/78 transition-[border-color,color] duration-200 hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

function FooterHeading({ children, id }: { children: ReactNode; id: string }) {
  return (
    <h2 className="mt-0 mb-5 text-[10px] font-bold text-white/42" id={id}>
      {children}
    </h2>
  );
}

function FooterDetail({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-2">
      <dt className="text-white/42">{label}</dt>
      <dd className="m-0 break-keep">{children}</dd>
    </div>
  );
}
