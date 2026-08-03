import {
  budgetOptions,
  projectTypes,
  scheduleOptions,
  serviceOptions,
  type InquiryService,
  type ProjectBudget,
  type ProjectSchedule,
  type ProjectType,
} from "@/config/inquiry";

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: ProjectType;
  services: InquiryService[];
  schedule: ProjectSchedule | "";
  budget: ProjectBudget | "";
  project: string;
  privacyConsent: boolean;
  website: string;
};

type ValidationResult =
  | { success: true; data: InquiryInput }
  | { success: false; fields: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeList(value: unknown) {
  return Array.isArray(value) ? value.map(normalize).filter(Boolean) : [];
}

function isAllowed<T extends string>(value: string, options: readonly T[]): value is T {
  return options.includes(value as T);
}

export function validateInquiry(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object") {
    return { success: false, fields: { form: "요청 형식이 올바르지 않습니다." } };
  }

  const source = payload as Record<string, unknown>;
  const data: InquiryInput = {
    name: normalize(source.name),
    email: normalize(source.email).toLowerCase(),
    company: normalize(source.company),
    phone: normalize(source.phone),
    projectType: normalize(source.projectType) as ProjectType,
    services: normalizeList(source.services) as InquiryService[],
    schedule: normalize(source.schedule) as ProjectSchedule | "",
    budget: normalize(source.budget) as ProjectBudget | "",
    project: normalize(source.project),
    privacyConsent: source.privacyConsent === true,
    website: normalize(source.website),
  };
  const fields: Record<string, string> = {};

  if (data.name.length < 2 || data.name.length > 40) {
    fields.name = "이름을 2~40자로 입력해 주세요.";
  }
  if (!emailPattern.test(data.email) || data.email.length > 120) {
    fields.email = "확인 가능한 이메일을 입력해 주세요.";
  }
  if (data.company.length > 80) {
    fields.company = "회사 또는 브랜드명은 80자 이내로 입력해 주세요.";
  }
  if (data.phone.length > 30) {
    fields.phone = "연락처는 30자 이내로 입력해 주세요.";
  }
  if (!isAllowed(data.projectType, projectTypes)) {
    fields.projectType = "프로젝트 유형을 선택해 주세요.";
  }
  if (
    data.services.length === 0 ||
    data.services.some((service) => !isAllowed(service, serviceOptions))
  ) {
    fields.services = "필요한 범위를 한 개 이상 선택해 주세요.";
  }
  if (data.schedule && !isAllowed(data.schedule, scheduleOptions)) {
    fields.schedule = "예상 일정을 다시 선택해 주세요.";
  }
  if (data.budget && !isAllowed(data.budget, budgetOptions)) {
    fields.budget = "예산 구간을 다시 선택해 주세요.";
  }
  if (data.project.length < 20 || data.project.length > 2000) {
    fields.project = "프로젝트 설명을 20~2000자로 입력해 주세요.";
  }
  if (!data.privacyConsent) {
    fields.privacyConsent = "개인정보 수집 및 이용에 동의해 주세요.";
  }

  return Object.keys(fields).length > 0
    ? { success: false, fields }
    : { success: true, data };
}
