import type { ReactNode } from "react";

import { NavigationGuard } from "./NavigationGuard";
import "./taskwise.css";

export default function TaskwiseLayout({ children }: { children: ReactNode }) {
  return <NavigationGuard>{children}</NavigationGuard>;
}
