import Image from "next/image";
import Link from "next/link";

import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <Link className="footer-wordmark" href="#top" aria-label={`${brand.name} 홈`}>
          <Image
            src={brand.assets.logoLockup}
            alt=""
            width={446}
            height={595}
            sizes="(min-width: 640px) 220px, 160px"
          />
        </Link>
        <div className="site-footer__meta">
          <p>Strategy · Design · Technology</p>
          <p>Seoul, Republic of Korea</p>
          <p>© {new Date().getFullYear()} {brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
