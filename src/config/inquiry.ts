export const projectTypes = ["신규 구축", "리뉴얼", "고도화", "유지보수"] as const;

export const serviceOptions = [
  "기획",
  "UX/UI 디자인",
  "프론트엔드",
  "백엔드 API",
  "배포·운영",
] as const;

export const scheduleOptions = ["협의 필요", "1~3개월", "3~6개월", "6개월 이상"] as const;

export const budgetOptions = [
  "협의 필요",
  "1천만원 미만",
  "1천만~3천만원",
  "3천만~5천만원",
  "5천만원 이상",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type InquiryService = (typeof serviceOptions)[number];
export type ProjectSchedule = (typeof scheduleOptions)[number];
export type ProjectBudget = (typeof budgetOptions)[number];
