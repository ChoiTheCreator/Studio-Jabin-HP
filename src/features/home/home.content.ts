export const navigation = [
  { href: "#work", label: "WORK" },
  { href: "#services", label: "SERVICES" },
  { href: "#process", label: "PROCESS" },
] as const;

export const projects = [
  {
    number: "01",
    title: "JABIN SYSTEM",
    summary: "스튜디오의 전략과 제작 방식을 하나의 디지털 언어로 정리한 브랜드 시스템",
    services: "Brand strategy · Web design · Development",
    year: "2026",
    status: "Studio concept",
    visual: "studio",
  },
  {
    number: "02",
    title: "ORBITAL ARCHIVE",
    summary: "자료가 쌓일수록 탐색이 쉬워지는 문화 아카이브 인터페이스",
    services: "Product design · Interaction · Frontend",
    year: "2026",
    status: "Studio concept",
    visual: "archive",
  },
  {
    number: "03",
    title: "COMMON GROUND",
    summary: "지역과 사람의 이야기를 빠르게 연결하는 모바일 중심 콘텐츠 플랫폼",
    services: "UX strategy · Design system · Prototype",
    year: "2026",
    status: "Studio concept",
    visual: "common",
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Strategy",
    description: "문제 정의, 사용자 흐름, 콘텐츠 구조, 제품 로드맵",
  },
  {
    number: "02",
    title: "Identity",
    description: "브랜드 방향, 비주얼 시스템, 디지털 가이드라인",
  },
  {
    number: "03",
    title: "Experience",
    description: "웹·앱 UX/UI, 프로토타입, 인터랙션과 모션",
  },
  {
    number: "04",
    title: "Engineering",
    description: "프론트엔드, 백엔드 API, CMS와 운영 환경",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "목표와 맥락을 듣고, 해결해야 할 진짜 문제를 함께 찾습니다.",
    output: "Brief · Research",
  },
  {
    number: "02",
    title: "Define",
    description: "우선순위와 성공 기준을 정해 모두가 같은 방향을 보게 합니다.",
    output: "Scope · Direction",
  },
  {
    number: "03",
    title: "Design",
    description: "브랜드와 사용성이 한 언어로 이어지는 경험을 설계합니다.",
    output: "System · Prototype",
  },
  {
    number: "04",
    title: "Deliver",
    description: "실제 환경에서 빠르고 안정적으로 작동하도록 만들고 검증합니다.",
    output: "Product · Handoff",
  },
] as const;
