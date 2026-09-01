import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Analytics } from "@/components/analytics/Analytics";
import { brand } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: `Jabin Studio | ${brand.tagline}`,
  description: brand.description,
  applicationName: brand.name,
  authors: [{ name: "Jabin Studio", url: brand.siteUrl }],
  publisher: "Jabin Studio",
  alternates: { canonical: "/" },
  other: {
    "naver-site-verification": "ce38fd6bc785097ef431a86465e29202160d61d7",
  },
  openGraph: {
    title: `Jabin Studio | ${brand.tagline}`,
    description: brand.description,
    url: "/",
    siteName: brand.name,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: brand.assets.socialPreview,
        width: 1200,
        height: 630,
        alt: "Jabin Studio 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Jabin Studio | ${brand.tagline}`,
    description: brand.description,
    images: [brand.assets.socialPreview],
  },
  icons: {
    icon: [{ url: brand.assets.favicon, type: "image/png", sizes: "512x512" }],
    apple: [{ url: brand.assets.favicon, type: "image/png", sizes: "512x512" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${brand.siteUrl}/#organization`,
  name: "Jabin Studio",
  alternateName: ["Jabin", "자빈", "자빈 스튜디오"],
  url: brand.siteUrl,
  logo: `${brand.siteUrl}${brand.assets.logoMark}`,
  email: brand.contactEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.company.address,
    addressCountry: "KR",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${brand.siteUrl}/#website`,
  name: "Jabin Studio",
  alternateName: "Jabin",
  url: brand.siteUrl,
  inLanguage: "ko-KR",
  publisher: { "@id": `${brand.siteUrl}/#organization` },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${brand.siteUrl}/#service`,
  name: "Jabin Studio",
  url: brand.siteUrl,
  image: `${brand.siteUrl}${brand.assets.socialPreview}`,
  description: brand.description,
  email: brand.contactEmail,
  serviceType: ["서비스 기획", "UX/UI 디자인", "웹·앱 개발", "배포 및 운영"],
  areaServed: { "@type": "Country", name: "대한민국" },
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.company.address,
    addressCountry: "KR",
  },
  parentOrganization: { "@id": `${brand.siteUrl}/#organization` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#11110f",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className="scroll-pt-[88px] scroll-smooth motion-reduce:scroll-auto">
      <body className="overflow-x-hidden bg-paper font-sans font-medium tracking-[0] text-ink antialiased selection:bg-lime selection:text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
