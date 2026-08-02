import Image from "next/image";
import Link from "next/link";

import { pageShell } from "@/components/ui/tailwind";
import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-[52px] pb-[30px] text-white">
      <div className={`${pageShell} grid gap-12`}>
        <Link className="block w-40 sm:w-[200px] lg:w-[220px]" href="#top" aria-label={`${brand.name} 홈`}>
          <Image
            className="h-auto w-full brightness-0 invert"
            src={brand.assets.logoLockup}
            alt=""
            width={446}
            height={595}
            sizes="(min-width: 640px) 220px, 160px"
          />
        </Link>
        <div className="grid gap-2 border-t border-white/25 pt-[18px] text-[11px] text-white/60 sm:grid-cols-3">
          <p className="m-0">Strategy · Design · Technology</p>
          <p className="m-0">Seoul, Republic of Korea</p>
          <p className="m-0 sm:text-right">© {new Date().getFullYear()} {brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
