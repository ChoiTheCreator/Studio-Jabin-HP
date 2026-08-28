import { ChatWidget } from "@/features/chat/ChatWidget";

import { HeroSection } from "./components/HeroSection";
import { InquirySection } from "./components/InquirySection";
import { JabinIntro } from "./components/JabinIntro";
import { ServiceMarquee } from "./components/ServiceMarquee";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StudioStatement } from "./components/StudioStatement";
import { WhyJabinTeaser, WhyOurServiceCta } from "./components/WhyJabinTeaser";
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
        <InquirySection />

        <section className="bg-white text-navy-ink" id="approach" aria-labelledby="statement-title">
          <div className={`${contentShell} py-22 sm:py-28 lg:py-32`}>
            <WhyJabinTeaser />
            <div className="mt-20 lg:mt-28">
              <Reveal className="border-t-2 border-navy-deep pt-5">
                <p className={`${eyebrow} text-navy-primary`}>HOW WE BUILD</p>
              </Reveal>
              <StudioPrinciples />
              <WhyOurServiceCta />
              {/* <OwnershipStatement /> */}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  );
}
