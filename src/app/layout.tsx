import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Studio JABO | 생각을 작동하게 만드는 디지털 스튜디오",
  description: "전략, 브랜드, 디지털 경험과 개발을 하나의 관점으로 연결하는 Studio JABO입니다.",
  applicationName: "Studio JABO",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Studio JABO",
    description: "생각을 작동하게 만드는 디지털 스튜디오",
    url: "/",
    siteName: "Studio JABO",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/jabo-studio-hero.png", width: 1680, height: 945 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#11110f",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
