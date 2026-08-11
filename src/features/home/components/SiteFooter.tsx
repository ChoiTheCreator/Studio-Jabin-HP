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
        <div className="grid gap-3 border-t border-white/25 pt-[18px] text-[11px] text-white/60 sm:grid-cols-2 lg:grid-cols-4">
          <p className="m-0">Planning · Design · Engineering · Operations</p>
          <a className="w-fit hover:text-white" href={`mailto:${brand.contactEmail}`}>
            {brand.contactEmail}
          </a>
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
