export const brand = {
  name: "Jabin",
  // canonical, Open Graph, sitemap이 공유하는 운영 도메인. 끝에 슬래시를 두지 않는다.
  siteUrl: "https://jabinstudio.com",
  tagline: "복잡한 요구를 작동하는 시스템으로",
  description:
    "서비스 기획, UX/UI, 프론트엔드, 백엔드와 운영 환경을 함께 설계하고 구축하는 Jabin입니다.",
  contactEmail: "hello@jabin.studio",
  assets: {
    logoWord: "/images/brand/jabin-logo-word.png",
    logoLockup: "/images/brand/jabin-logo-lockup.png",
    logoMark: "/images/brand/jabin-logo-mark.png",
    favicon: "/images/brand/jabin-favicon.png",
    hero: "/images/work/jabin-studio-hero.png",
  },
} as const;
