import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cloud Run 컨테이너에 필요한 파일만 담은 최소 서버 번들을 생성한다.
  output: "standalone",
};

export default nextConfig;
