export const serviceOptions = [
  "기획",
  "UX/UI 디자인",
  "웹 개발",
  "앱 개발",
  "배포 및 운영",
] as const;

export type InquiryService = (typeof serviceOptions)[number];

/**
 * 문의 메일 발신 주소.
 * Resend 공용 테스트 주소라 도메인 인증이 필요 없는 대신,
 * 수신자가 Resend 계정 가입 이메일로 제한된다.
 * 도메인 인증 후 noreply@jabin.studio 등으로 교체.
 */
export const inquiryFromEmail = "onboarding@resend.dev";

/** 문의 메일 수신 주소. Resend 계정 가입 이메일과 일치해야 한다. */
export const inquiryToEmail = "hello.jabinstudio@gmail.com";
