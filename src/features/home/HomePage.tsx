import { ChatWidget } from "@/features/chat/ChatWidget";

import { HeroSection } from "./components/HeroSection";
import { InquirySection } from "./components/InquirySection";
import { JabinIntro } from "./components/JabinIntro";
import { OwnedInfrastructureSection } from "./components/OwnedInfrastructureSection";
import { ServiceMarquee } from "./components/ServiceMarquee";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StudioStatement } from "./components/StudioStatement";
import { WhyJabinTeaser } from "./components/WhyJabinTeaser";
import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { StudioPrinciples } from "./components/StudioPrinciples";

export function HomePage() {
  return (
    <>
      <JabinIntro />
      <SiteHeader />
      <main className="origin-top animate-page-enter motion-reduce:animate-none">
        <HeroSection />
        <ServiceMarquee />
        <StudioStatement />

        <section className="bg-white text-navy-ink" id="approach" aria-labelledby="statement-title">
          <div className={`${contentShell} pb-22 sm:pb-28 lg:pb-32`}>
            <WhyJabinTeaser />
            <div>
              <Reveal className="pt-5">
                <p className={`${eyebrow} text-navy-primary`}>HOW WE BUILD</p>
              </Reveal>
              <StudioPrinciples />
              {/* <OwnershipStatement /> */}
            </div>
          </div>
        </section>
        <InquirySection />
        <OwnedInfrastructureSection overviewOnly />
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
