"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  isAnalyticsEnabled,
  startContact,
  trackEvent,
  type AnalyticsEventName,
  type ContactEntryPoint,
} from "@/lib/analytics";

const sectionNames: Record<string, string> = {
  hero: "hero",
  approach: "why_jabin",
  contact: "contact",
  engineering: "how_we_build",
  infrastructure: "infrastructure",
  services: "services",
  team: "team",
  process: "process",
  "why-service-hero": "why_our_service",
  "why-conclusion": "live_projects",
};

export function Analytics() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const viewedSections = useRef(new Set<string>());

  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (!gtmId || !isAnalyticsEnabled()) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    if (document.getElementById("jabin-gtm")) return;
    const script = document.createElement("script");
    script.id = "jabin-gtm";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (pathname === previousPathname.current) return;
    trackEvent("page_view", { page_path: pathname });
    previousPathname.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const elements = Object.entries(sectionNames)
      .map(([id, sectionName]) => ({ element: document.getElementById(id), sectionName }))
      .filter((item): item is { element: HTMLElement; sectionName: string } =>
        Boolean(item.element),
      );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionName = elements.find((item) => item.element === entry.target)?.sectionName;
          if (!sectionName) return;

          const key = `${pathname}:${sectionName}`;
          if (viewedSections.current.has(key)) return;
          viewedSections.current.add(key);
          trackEvent("section_view", { section_name: sectionName });
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-analytics-event]",
      );
      if (!target) return;

      const eventName = target.dataset.analyticsEvent as AnalyticsEventName | undefined;
      if (eventName === "contact_start") {
        const entryPoint = target.dataset.entryPoint as ContactEntryPoint;
        startContact(entryPoint);
        trackEvent("cta_click", {
          cta_name: "project_contact",
          section_name: entryPoint,
          destination: "#contact",
        });
      } else if (eventName === "cta_click") {
        trackEvent("cta_click", {
          cta_name: target.dataset.ctaName ?? "unknown",
          section_name: target.dataset.sectionName ?? "unknown",
          destination: target.dataset.destination ?? "unknown",
        });
      } else if (eventName === "project_view") {
        trackEvent("project_view", {
          project_name: target.dataset.projectName ?? "unknown",
          project_category: target.dataset.projectCategory ?? "unknown",
          project_position: Number(target.dataset.projectPosition ?? 0),
        });
      }
    };

    const handleToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      if (
        !details.matches("#infrastructure details") ||
        !details.open ||
        details.dataset.analyticsViewed
      )
        return;
      details.dataset.analyticsViewed = "true";
      trackEvent("service_view", {
        service_name: "infrastructure",
        section_name: "infrastructure",
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("toggle", handleToggle, true);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("toggle", handleToggle, true);
    };
  }, []);

  return null;
}
