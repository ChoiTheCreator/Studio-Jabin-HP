"use client";

import type { MouseEvent, ReactNode } from "react";

export function NavigationGuard({ children }: { children: ReactNode }) {
  const preventNavigation = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const link = target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href?.startsWith("#")) event.preventDefault();
  };

  return <div onClickCapture={preventNavigation}>{children}</div>;
}
