import type { InquiryService, InquiryType } from "@/config/inquiry";

export type ContactEntryPoint = "header" | "mobile_header" | "contact_section";

type AnalyticsEventMap = {
  page_view: { page_path: string };
  section_view: { section_name: string };
  cta_click: { cta_name: string; section_name: string; destination: string };
  service_view: { service_name: string; section_name: string };
  project_view: { project_name: string; project_category: string; project_position: number };
  contact_start: { entry_point: ContactEntryPoint };
  project_status_select: { project_status: string };
  service_select: { service_type: string };
  form_start: { project_status: string; entry_point: ContactEntryPoint };
  generate_lead: {
    project_status: string;
    service_type: string;
    entry_point: ContactEntryPoint;
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const productionHostnames = new Set(["jabinstudio.com", "www.jabinstudio.com"]);
const debugEnabled = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

export const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KPW4GPCG";

const projectStatusMap: Record<InquiryType, string> = {
  concept: "no_plan",
  continuation: "has_project",
  improvement: "existing_product",
};

const serviceTypeMap: Record<InquiryService, string> = {
  기획: "planning",
  "UX/UI 디자인": "ux_ui_design",
  "웹 개발": "web_development",
  "앱 개발": "app_development",
  "배포 및 운영": "deployment_operations",
};

let contactEntryPoint: ContactEntryPoint = "contact_section";
let contactStarted = false;

export function isAnalyticsEnabled() {
  return (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "production" &&
    Boolean(gtmId) &&
    productionHostnames.has(window.location.hostname)
  );
}

export function trackEvent<Name extends AnalyticsEventName>(
  event: Name,
  parameters: AnalyticsEventMap[Name],
) {
  const payload = { event, site_language: "ko", ...parameters };

  if (debugEnabled) console.info("[analytics]", payload);
  if (!isAnalyticsEnabled()) return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
  } catch {
    // Analytics must never interrupt the product experience.
  }
}

export function startContact(entryPoint: ContactEntryPoint) {
  contactEntryPoint = entryPoint;
  if (contactStarted) return;
  contactStarted = true;
  trackEvent("contact_start", { entry_point: entryPoint });
}

export function getContactEntryPoint() {
  return contactEntryPoint;
}

export function getProjectStatus(type: InquiryType) {
  return projectStatusMap[type];
}

export function getServiceType(service: InquiryService) {
  return serviceTypeMap[service];
}
