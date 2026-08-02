import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { HeroSection } from "./components/HeroSection";
import { InquirySection } from "./components/InquirySection";
import { ProcessSection } from "./components/ProcessSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StudioStatement } from "./components/StudioStatement";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <StudioStatement />
        <ProjectsSection />
        <CapabilitiesSection />
        <ProcessSection />
        <InquirySection />
      </main>
      <SiteFooter />
    </>
  );
}
