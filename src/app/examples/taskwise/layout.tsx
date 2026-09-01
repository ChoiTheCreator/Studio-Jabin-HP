import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NavigationGuard } from "./NavigationGuard";
import "./taskwise.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function TaskwiseLayout({ children }: { children: ReactNode }) {
  return <NavigationGuard>{children}</NavigationGuard>;
}
