import type { Metadata } from "next";

import { SiteFooter } from "@/features/home/components/SiteFooter";
import { SiteHeader } from "@/features/home/components/SiteHeader";
import { EngineeringSection } from "@/features/home/components/EngineeringSection";
import { OwnedInfrastructureSection } from "@/features/home/components/OwnedInfrastructureSection";
import { CapabilitiesSection } from "@/features/home/components/CapabilitiesSection";
import { TeamSection } from "@/features/home/components/TeamSection";
import { ProcessSection } from "@/features/home/components/ProcessSection";
import { contentShell } from "@/components/ui/tailwind";

export const metadata: Metadata = {
  title: "HOW WE WORK | Jabin Studio",
  description: "Jabin Studio의 엔지니어링 방식, 자체 인프라, 팀, 제작 프로세스를 소개합니다.",
  alternates: { canonical: "/how-we-work" },
};

export default function Page() {
  return (
    <>
      <SiteHeader initialTone="light" />
      <main className="bg-navy-paper">
        <section
          className="flex min-h-[42dvh] items-center bg-navy-paper py-14 sm:min-h-[46dvh] sm:py-16"
          aria-labelledby="method-hero-title"
        >
          <div className={`${contentShell} text-center`}>
            <p className="mb-7 text-[30px] leading-none font-bold text-navy-primary sm:mb-9 sm:text-[38px] lg:text-[44px]">
              HOW WE WORK
            </p>
            <h1
              className="mx-auto max-w-215 text-[36px] leading-[1.08] font-bold text-navy-ink sm:text-[48px] lg:text-[58px]"
              id="method-hero-title"
            >
              Jabin Studio가 프로젝트를
              <br />
              운영하는 방식
            </h1>
          </div>
        </section>
        <EngineeringSection />
        <OwnedInfrastructureSection />
        <CapabilitiesSection />
        <TeamSection />
        <ProcessSection />
      </main>
      <div className="relative z-60">
        <SiteFooter />
      </div>
    </>
  );
}
