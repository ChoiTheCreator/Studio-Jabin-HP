import type { Metadata } from "next";

import { WhyOurServicePage } from "@/features/why-our-service/WhyOurServicePage";

export const metadata: Metadata = {
  title: "WHY OUR SERVICE? | Jabin Studio",
  description: "브랜드와 비즈니스에서 출발하는 Jabin Studio의 웹사이트 설계 원칙을 소개합니다.",
  alternates: { canonical: "/why-our-service" },
};

export default function Page() {
  return <WhyOurServicePage />;
}
