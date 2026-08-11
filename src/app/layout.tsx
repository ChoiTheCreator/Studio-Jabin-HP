import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { brand } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: `${brand.name} | ${brand.tagline}`,
  description: brand.description,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: brand.name,
    description: brand.tagline,
    url: "/",
    siteName: brand.name,
    locale: "ko_KR",
    type: "website",
    images: [{ url: brand.assets.hero, width: 1680, height: 945 }],
  },
  icons: {
    icon: [{ url: brand.assets.favicon, type: "image/png", sizes: "512x512" }],
    apple: [{ url: brand.assets.favicon, type: "image/png", sizes: "512x512" }],
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
    <html lang="ko" className="scroll-smooth scroll-pt-[88px] motion-reduce:scroll-auto">
      <body className="overflow-x-hidden bg-paper font-sans font-medium tracking-[0] text-ink antialiased selection:bg-lime selection:text-ink">
        {children}
      </body>
    </html>
  );
}
