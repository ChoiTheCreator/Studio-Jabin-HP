import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cloud Run 컨테이너에 필요한 파일만 담은 최소 서버 번들을 생성한다.
  output: "standalone",
  // 챗봇 라우트가 런타임에 fs로 읽는 CHATBOT_KNOWLEDGE.md는 자동 추적 대상이 아니라 명시한다.
  outputFileTracingIncludes: {
    "/api/chat": ["./CHATBOT_KNOWLEDGE.md"],
  },
};

export default nextConfig;
