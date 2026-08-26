"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

export function FooterFaqLink({ className }: { className: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    window.dispatchEvent(new Event("jabin:open-chat"));
  };

  return (
    <Link className={className} href="/?chat=faq" onClick={handleClick}>
      자주 묻는 질문
    </Link>
  );
}
