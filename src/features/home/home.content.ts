import type { ProjectSummary } from "@/features/projects/project.types";

export const navigation = [
  { href: "#approach", label: "ABOUT" },
  { href: "#infrastructure", label: "INFRA" },
  { href: "#team", label: "TEAM" },
  { href: "#process", label: "PROCESS" },
] as const;

export const projects = [
  {
    slug: "jabin-system",
    number: "01",
    title: "JABIN SYSTEM",
    industry: "Digital Studio",
    summary: "스튜디오의 전략과 제작 방식을 하나의 디지털 언어로 정리한 브랜드 시스템",
    challenge: "기획, 디자인, 개발의 판단 기준을 하나의 운영 가능한 시스템으로 연결합니다.",
    services: "Brand strategy · Web design · Development",
    scope: ["Brand strategy", "UX/UI", "Frontend"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2026",
    status: "Studio concept",
    kind: "concept",
    visibility: "public",
    visual: "studio",
  },
  {
    slug: "orbital-archive",
    number: "02",
    title: "ORBITAL ARCHIVE",
    industry: "Culture & Archive",
    summary: "자료가 쌓일수록 탐색이 쉬워지는 문화 아카이브 인터페이스",
    challenge: "서로 다른 형식의 기록을 일관된 탐색 경험 안에서 연결합니다.",
    services: "Product design · Interaction · Frontend",
    scope: ["Information architecture", "Interaction", "Prototype"],
    technologies: [],
    year: "2026",
    status: "Studio concept",
    kind: "concept",
    visibility: "public",
    visual: "archive",
  },
  {
    slug: "common-ground",
    number: "03",
    title: "COMMON GROUND",
    industry: "Local Community",
    summary: "지역과 사람의 이야기를 빠르게 연결하는 모바일 중심 콘텐츠 플랫폼",
    challenge: "지역의 다양한 소식을 모바일에서 빠르게 발견하고 참여하도록 구조화합니다.",
    services: "UX strategy · Design system · Prototype",
    scope: ["UX strategy", "Design system", "Mobile prototype"],
    technologies: [],
    year: "2026",
    status: "Studio concept",
    kind: "concept",
    visibility: "public",
    visual: "common",
  },
] as const satisfies readonly ProjectSummary[];

export const capabilities = [
  {
    number: "01",
    title: "Planning",
    description: "요구사항 정리, 기능 우선순위 설정, 화면 설계",
  },
  {
    number: "02",
    title: "Design",
    description: "UI 디자인, 프로토타입, 스타일 가이드",
  },
  {
    number: "03",
    title: "Development",
    description: "웹, 앱, 서버, 데이터 연동",
  },
  {
    number: "04",
    title: "Operations",
    description: "배포, 안정화, 유지보수",
  },
] as const;

export const engineeringFlow = [
  { number: "01", title: "Users", detail: "Customer · Operator", icon: "users" },
  { number: "02", title: "Web / App", detail: "Responsive Experience", icon: "window" },
  { number: "03", title: "Server", detail: "Security · Business Logic", icon: "code" },
  { number: "04", title: "Data", detail: "Database · Storage", icon: "database" },
  { number: "05", title: "Cloud", detail: "Hosting · Operations", icon: "cloud" },
  { number: "06", title: "Monitoring", detail: "Logs · Alerts · Backup", icon: "chart" },
] as const;

export const operationCapabilities = [
  {
    number: "01",
    title: "Application",
    description: "말로 설명하기 어려운 부분까지 파악해서, 필요한 서비스를 명확하게 구현합니다.",
    practices: ["Web & App", "Admin", "API Integration"],
  },
  {
    number: "02",
    title: "Infrastructure",
    description: "서비스 규모에 맞게, 과하지 않은 서버와 데이터 구조로 설계합니다.",
    practices: ["Cloud Runtime", "Database", "CI/CD"],
  },
  {
    number: "03",
    title: "Reliability",
    description: "문제를 빠르게 발견하고 복구할 수 있도록 로그, 알림, 백업 기준을 만듭니다.",
    practices: ["Monitoring", "Logging", "Backup"],
  },
  {
    number: "04",
    title: "Security",
    description: "필요한 사람에게 필요한 권한만 제공하고 민감 정보의 경계를 명확히 나눕니다.",
    practices: ["Access Control", "Secret Management", "Audit Trail"],
  },
] as const;

export const coreInfrastructureFeatures = [
  "Dedicated Compute",
  "SAS Storage",
  "RAID 10",
  "Database Infrastructure",
  "CI/CD",
  "Daily Backup",
] as const;

export const infrastructureRegionServices = {
  seoul: [
    {
      text: "SI 프로젝트에 필요한 AI 모델 추론과 경량 학습, 사내 데이터 기반 RAG 및 문서 검색, OCR, 이미지·언어 처리를 지원합니다. ",
    },
    { text: "챗봇", highlight: true },
    { text: "과 " },
    { text: "업무 자동화", highlight: true },
    { text: ", " },
    { text: "AI API 연동", highlight: true },
    { text: ", 기능 검증 및 운영 환경까지 구성합니다." },
  ],
  gwangju: [
    { text: "웹·앱 호스팅, API와 " },
    { text: "데이터베이스 운영", highlight: true },
    { text: ", " },
    { text: "CI/CD 배포", highlight: true },
    { text: ", 스토리지와 " },
    { text: "일일 백업 환경", highlight: true },
    { text: "을 제공합니다." },
  ],
} as const;

export const aiInfrastructureSpecs = [
  {
    label: "GPU",
    value: "RTX A4500 × 2",
    detail: "20GB per GPU",
  },
  {
    label: "GPU MEMORY",
    value: "40GB Total",
    detail: "두 GPU의 장착 메모리 합계",
  },
  {
    label: "CPU",
    value: "Threadripper PRO",
    detail: "3955WX / 16C / 32T",
  },
  {
    label: "MEMORY",
    value: "128GB ECC",
    detail: "System Memory",
  },
  {
    label: "AI ACCELERATOR",
    value: "Tenstorrent p150a",
    detail: "32GB",
  },
] as const;

type TeamLink = {
  label: string;
  // URL이 확인되지 않은 구성원은 href를 비워 두고 비활성 링크로 표시한다.
  href?: string;
};

type TeamMember = {
  number: string;
  name: string;
  nameEn: string;
  initials: string;
  role: string;
  responsibility: string;
  specialties: readonly string[];
  links: readonly TeamLink[];
};

type Team = {
  total: number;
  members: readonly TeamMember[];
  additionalMembers: readonly {
    number: string;
    name: string;
  }[];
};

export const team: Team = {
  total: 4,
  members: [
    {
      number: "01",
      name: "최원빈",
      nameEn: "Wonbin Choi",
      initials: "WB",
      role: "CEO",
      responsibility:
        "고객의 목표를 제품 방향으로 구체화하고, 프로젝트의 우선순위와 실행 과정을 책임집니다.",
      specialties: ["Business Strategy", "Product Direction", "Client Partnership"],
      links: [
        {
          label: "LinkedIn",
          href: "https://kr.linkedin.com/in/%EC%9B%90%EB%B9%88-%EC%B5%9C-a90451366",
        },
        { label: "GitHub", href: "https://github.com/ChoiTheCreator" },
        { label: "Portfolio", href: "https://www.wonbinchoi.com/" },
      ],
    },
    {
      number: "02",
      name: "박재욱",
      nameEn: "Jaewook Park",
      initials: "JW",
      role: "CTO",
      responsibility:
        "서비스 구조와 기술 의사결정을 이끌고, 구축부터 배포와 운영까지의 품질을 책임집니다.",
      specialties: ["System Architecture", "Full-stack Engineering", "Cloud Operations"],
      links: [
        {
          label: "LinkedIn",
          href: "https://au.linkedin.com/in/jaewook-park-a5a032385",
        },
        { label: "GitHub", href: "https://github.com/wooooooooook" },
        { label: "Portfolio", href: "https://wooooooooook.com/" },
      ],
    },
  ],
  additionalMembers: [
    { number: "03", name: "유효석" },
    { number: "04", name: "임시우" },
  ],
};

export const processSteps = [
  {
    number: "01",
    title: "Diagnose",
    description: "목표, 사용자, 기존 시스템과 제약을 확인해 해결해야 할 문제를 구체화합니다.",
    output: "Diagnosis · Questions",
  },
  {
    number: "02",
    title: "Scope",
    description: "기능과 우선순위, 일정, 책임 범위를 합의해 실행 가능한 계획을 만듭니다.",
    output: "Scope · Estimate",
  },
  {
    number: "03",
    title: "Build",
    description: "설계, 디자인, 개발을 짧은 주기로 연결하고 실제 화면으로 검토합니다.",
    output: "Prototype · Build",
  },
  {
    number: "04",
    title: "Launch",
    description: "테스트와 데이터 이전, 배포 점검을 거쳐 운영 가능한 서비스로 전환합니다.",
    output: "QA · Release",
  },
  {
    number: "05",
    title: "Operate",
    description: "로그와 운영 피드백을 확인하고 장애 대응과 개선 이력을 지속해서 관리합니다.",
    output: "Monitoring · Iteration",
  },
] as const;
