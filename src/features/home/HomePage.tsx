import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { EngineeringSection } from "./components/EngineeringSection";
import { HeroSection } from "./components/HeroSection";
import { InquirySection } from "./components/InquirySection";
import { JabinIntro } from "./components/JabinIntro";
import { OwnedInfrastructureSection } from "./components/OwnedInfrastructureSection";
import { ProcessSection } from "./components/ProcessSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServiceMarquee } from "./components/ServiceMarquee";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StudioStatement } from "./components/StudioStatement";
import { TeamSection } from "./components/TeamSection";

export function HomePage() {
  return (
    <>
      <JabinIntro />
      <SiteHeader />
      <main className="origin-top animate-page-enter motion-reduce:animate-none">
        <HeroSection />
        <ServiceMarquee />
        <StudioStatement />
        <InquirySection />
        <ProjectsSection />
        <EngineeringSection />
        <OwnedInfrastructureSection />
        <CapabilitiesSection />
        <TeamSection />
        <ProcessSection />
      </main>
      <SiteFooter />
    </>
  );
}
