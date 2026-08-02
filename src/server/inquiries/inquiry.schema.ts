export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  project: string;
};

type ValidationResult =
  | { success: true; data: InquiryInput }
  | { success: false; fields: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
    project: normalize(source.project),
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
  if (data.project.length < 20 || data.project.length > 2000) {
    fields.project = "프로젝트 설명을 20~2000자로 입력해 주세요.";
  }

  return Object.keys(fields).length > 0
    ? { success: false, fields }
    : { success: true, data };
}
