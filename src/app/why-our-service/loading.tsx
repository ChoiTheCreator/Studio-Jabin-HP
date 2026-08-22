import { contentShell } from "@/components/ui/tailwind";

export default function Loading() {
  return (
    <main className="min-h-[100dvh] bg-navy-paper" aria-busy="true">
      <p className="sr-only" role="status">
        WHY OUR SERVICE 페이지를 불러오는 중입니다.
      </p>

      <div className="motion-safe:animate-pulse" aria-hidden="true">
        <section className="flex min-h-[52dvh] items-center py-14 sm:min-h-[56dvh] sm:py-16">
          <div className={`${contentShell} flex flex-col items-center`}>
            <div className="h-8 w-56 bg-navy-tint sm:h-10 sm:w-72" />
            <div className="mt-9 h-10 w-full max-w-[760px] bg-navy-surface sm:h-14" />
            <div className="mt-3 h-10 w-[78%] max-w-[620px] bg-navy-surface sm:h-14" />
          </div>
        </section>

        <div className="h-24 bg-navy-deep sm:h-28" />

        <section className="border-t border-navy-line py-24 sm:py-32">
          <div className={contentShell}>
            <div className="h-5 w-10 bg-navy-tint" />
            <div className="mt-8 h-11 w-full max-w-[560px] bg-navy-surface sm:h-14" />
            <div className="mt-3 h-11 w-[72%] max-w-[430px] bg-navy-surface sm:h-14" />
            <div className="mt-8 h-4 w-full max-w-[360px] bg-navy-tint" />
            <div className="mt-3 h-4 w-[78%] max-w-[280px] bg-navy-tint" />
            <div className="mt-14 aspect-[16/9] w-full border border-navy-line bg-navy-surface sm:mt-16" />
          </div>
        </section>
      </div>
    </main>
  );
}
