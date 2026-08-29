import { contentShell } from "@/components/ui/tailwind";

export default function Loading() {
  return (
    <main className="min-h-[100dvh] bg-navy-paper" aria-busy="true">
      <p className="sr-only" role="status">
        HOW JABIN 페이지를 불러오는 중입니다.
      </p>

      <div className="motion-safe:animate-pulse" aria-hidden="true">
        <section className="flex min-h-[42dvh] items-center py-14 sm:min-h-[46dvh] sm:py-16">
          <div className={`${contentShell} flex flex-col items-center`}>
            <div className="h-8 w-32 bg-navy-tint sm:h-10 sm:w-40" />
            <div className="mt-7 h-9 w-[92%] max-w-[720px] bg-navy-surface sm:mt-9 sm:h-13" />
            <div className="mt-3 h-9 w-[62%] max-w-[420px] bg-navy-surface sm:h-13" />
          </div>
        </section>

        {/* EngineeringSection */}
        <div className="h-56 bg-navy-night sm:h-64" />

        {/* OwnedInfrastructureSection */}
        <section className="border-t border-navy-line bg-navy-surface py-24 sm:py-32">
          <div className={contentShell}>
            <div className="h-5 w-10 bg-navy-line" />
            <div className="mt-8 h-11 w-full max-w-[560px] bg-white sm:h-14" />
            <div className="mt-3 h-11 w-[72%] max-w-[430px] bg-white sm:h-14" />
            <div className="mt-8 h-4 w-full max-w-[360px] bg-navy-line" />
            <div className="mt-3 h-4 w-[78%] max-w-[280px] bg-navy-line" />
            <div className="mt-14 aspect-[16/9] w-full border border-navy-line bg-white sm:mt-16" />
          </div>
        </section>

        {/* CapabilitiesSection */}
        <div className="h-105 bg-white sm:h-120 lg:h-140" />

        {/* TeamSection */}
        <div className="h-105 bg-navy-surface sm:h-120 lg:h-130" />

        {/* ProcessSection */}
        <div className="h-90 bg-white sm:h-100 lg:h-110" />
      </div>
    </main>
  );
}
