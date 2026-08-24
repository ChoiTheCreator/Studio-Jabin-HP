import Image from "next/image";
import Link from "next/link";

import { contentShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="bg-navy-night pt-[52px] pb-[30px] text-white">
      <div className={`${contentShell} grid gap-12`}>
        <Link
          className="block w-40 sm:w-[200px] lg:w-[220px]"
          href="/"
          aria-label={`${brand.name} 홈`}
        >
          <Image
            className="h-auto w-full brightness-0 invert"
            src={brand.assets.logoLockup}
            alt=""
            width={446}
            height={595}
            sizes="(min-width: 640px) 220px, 160px"
          />
        </Link>

        <div className="grid gap-10 border-t border-white/25 pt-6 lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,2.15fr)] lg:gap-16">
          <div>
            <p className="m-0 text-[11px] font-bold text-white/45">CONTACT</p>
            <a
              className="mt-4 block w-fit border-b border-current text-[22px] font-bold text-white transition-colors hover:text-white/70 sm:text-[26px]"
              href={`mailto:${brand.contactEmail}`}
            >
              {brand.contactEmail}
            </a>
          </div>

          <dl className="m-0 grid gap-x-8 gap-y-6 text-[12px] leading-[1.55] sm:grid-cols-2 lg:grid-cols-[0.8fr_0.8fr_1.4fr]">
            <div>
              <dt className="font-bold text-white/45">대표자</dt>
              <dd className="mt-2 text-white/85">{brand.company.representatives.join(" · ")}</dd>
            </div>
            <div>
              <dt className="font-bold text-white/45">사업자등록번호</dt>
              <dd className="mt-2 text-white/85">
                {brand.company.businessRegistrationNumber ?? "발급 전"}
              </dd>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <dt className="font-bold text-white/45">주소</dt>
              <dd className="mt-2 break-keep text-white/85">{brand.company.address}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-3 border-t border-white/25 pt-[18px] text-[11px] text-white/60 sm:grid-cols-2 lg:grid-cols-[1.4fr_auto_auto]">
          <p className="m-0">Planning · Design · Engineering · Operations</p>
          <Link className="w-fit hover:text-white" href="/privacy">
            개인정보 처리 안내
          </Link>
          <p className="m-0 lg:text-right">
            © {new Date().getFullYear()} {brand.name} · Seoul
          </p>
        </div>
      </div>
    </footer>
  );
}
