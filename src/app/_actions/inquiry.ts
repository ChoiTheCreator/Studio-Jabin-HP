"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import {
  inquiryFromEmail,
  inquiryToEmail,
  inquiryTypeLabels,
  serviceOptions,
  type InquiryType,
} from "@/config/inquiry";
import { InquiryEmail } from "@/server/inquiries/InquiryEmail";
import { consumeInquiryRequest } from "@/server/inquiries/inquiry.rate-limit";

// "use server" 파일은 async 함수만 값으로 내보낼 수 있어, 초기 상태 상수는
// 이 파일에 두지 않는다. 타입은 컴파일 시점에 지워지므로 내보내도 된다.
export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fields?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedServices = new Set<string>(serviceOptions);

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function readInquiryType(formData: FormData): InquiryType | "" {
  const value = readText(formData, "inquiryType");
  return value in inquiryTypeLabels ? (value as InquiryType) : "";
}

function buildProjectSummary(formData: FormData, inquiryType: InquiryType) {
  let required: string[];
  let entries: Array<[string, string]>;

  if (inquiryType === "concept") {
    required = [readText(formData, "idea"), readText(formData, "problem")];
    entries = [
      ["구상 중인 서비스", required[0]],
      ["해결하려는 문제", required[1]],
      ["현재 준비된 자료", readText(formData, "materials")],
      ["참고 서비스 또는 자료", readText(formData, "reference")],
    ];
  } else if (inquiryType === "continuation") {
    required = [readText(formData, "currentState"), readText(formData, "continuationScope")];
    entries = [
      ["현재 준비된 결과물", required[0]],
      ["이어서 맡길 범위", required[1]],
      ["검토 자료 링크", readText(formData, "resourceLink")],
      ["유지해야 하는 조건", readText(formData, "constraints")],
    ];
  } else {
    required = [readText(formData, "priorityIssue"), readText(formData, "issueContext")];
    entries = [
      ["현재 서비스 URL", readText(formData, "serviceUrl")],
      ["가장 먼저 해결할 문제", required[0]],
      ["문제와 발생 상황", required[1]],
      ["현재 기술 또는 서버 환경", readText(formData, "environment")],
      ["기대하는 개선 결과", readText(formData, "expectedOutcome")],
    ];
  }

  if (
    required.some((value) => value.length < 10) ||
    entries.some(([, value]) => value.length > 2000)
  ) {
    return "";
  }

  return entries
    .flatMap(([label, value]) => (value ? [`[${label}]`, value, ""] : []))
    .join("\n")
    .trim();
}

export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // honeypot. 사람에게는 보이지 않는 필드라 값이 차 있으면 자동 제출로 보고
  // 검증 결과를 알려주지 않은 채 접수된 것처럼 응답한다.
  if (readText(formData, "website")) {
    return { status: "success" };
  }

  const name = readText(formData, "name");
  const email = readText(formData, "email").toLowerCase();
  const company = readText(formData, "company");
  const inquiryType = readInquiryType(formData);
  const inquiryTypeLabel = inquiryType ? inquiryTypeLabels[inquiryType] : "";
  const project = inquiryType ? buildProjectSummary(formData, inquiryType) : "";
  const privacyConsent = formData.get("privacyConsent") === "on";
  const services = formData
    .getAll("services")
    .filter((value): value is string => typeof value === "string" && allowedServices.has(value));

  const fields: Record<string, string> = {};

  if (name.length < 2 || name.length > 40) {
    fields.name = "이름을 2~40자로 입력해 주세요.";
  }
  if (!emailPattern.test(email) || email.length > 120) {
    fields.email = "확인 가능한 이메일을 입력해 주세요.";
  }
  if (company.length > 80) {
    fields.company = "회사 또는 브랜드명은 80자 이내로 입력해 주세요.";
  }
  if (!inquiryType) {
    fields.inquiryType = "현재 프로젝트 상태를 선택해 주세요.";
  }
  if (services.length === 0) {
    fields.services = "필요한 범위를 한 가지 이상 선택해 주세요.";
  }
  if (inquiryType && !project) {
    fields.project = "선택한 문의 유형의 필수 내용을 확인해 주세요.";
  }
  if (!privacyConsent) {
    fields.privacyConsent = "개인정보 수집 및 이용에 동의해 주세요.";
  }

  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "입력 내용을 다시 확인해 주세요.", fields };
  }

  const requestHeaders = await headers();
  const clientAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    email;

  if (!consumeInquiryRequest(clientAddress)) {
    return {
      status: "error",
      message: "문의 요청이 많습니다. 10분 후 다시 시도해 주세요.",
    };
  }

  const receivedAt = new Date().toISOString();
  const apiKey = process.env.RESEND_API_KEY;

  // 키가 없는 환경(초기 설정, E2E)에서는 실제 발송 대신 민감 정보를 가린 요약만 남긴다.
  if (!apiKey) {
    console.info("[inquiry:accepted]", {
      receivedAt,
      emailDomain: email.split("@")[1],
      companyProvided: Boolean(company),
      servicesCount: services.length,
      inquiryType,
      projectLength: project.length,
    });
    return { status: "success" };
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.RESEND_FROM_EMAIL?.trim() || inquiryFromEmail,
    to: process.env.RESEND_TO_EMAIL?.trim() || inquiryToEmail,
    // 발신 주소는 인증된 도메인이어야 하므로, 답장이 문의자에게 가도록 여기에 넣는다.
    replyTo: email,
    subject: `[${inquiryTypeLabel}] ${singleLine(name)}${company ? ` · ${singleLine(company)}` : ""}`,
    react: InquiryEmail({
      name,
      company,
      email,
      inquiryType: inquiryTypeLabel,
      services,
      project,
      receivedAt,
    }),
    text: [
      `이름: ${name}`,
      `회사 / 브랜드: ${company || "-"}`,
      `이메일: ${email}`,
      `문의 유형: ${inquiryTypeLabel}`,
      `필요한 범위: ${services.join(", ")}`,
      `접수 시각: ${receivedAt}`,
      "",
      project,
    ].join("\n"),
  });

  if (error) {
    console.error("[inquiry:failed]", error);
    return { status: "error", message: "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }

  return { status: "success" };
}
