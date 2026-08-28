import { pageShell } from "@/components/ui/tailwind";

export default function Loading() {
  return (
    <main className="min-h-[100dvh] bg-paper" aria-busy="true">
      <p className="sr-only" role="status">
        개인정보 처리 안내 페이지를 불러오는 중입니다.
      </p>

      <div className="motion-safe:animate-pulse" aria-hidden="true">
        <div
          className={`${pageShell} flex h-24 items-center justify-between border-b border-ink/20`}
        >
          <div className="h-6 w-[84px] bg-ink/10" />
          <div className="h-4 w-14 bg-ink/10" />
        </div>

        <div className={`${pageShell} py-[72px] sm:py-24 lg:py-32`}>
          <div className="grid gap-12 lg:grid-cols-[minmax(220px,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <div>
              <div className="h-4 w-16 bg-blue/20" />
              <div className="mt-6 h-11 w-32 bg-ink/10 sm:h-16 sm:w-44" />
              <div className="mt-3 h-11 w-36 bg-ink/10 sm:h-16 sm:w-48" />
              <div className="mt-6 h-4 w-28 bg-ink/10" />
            </div>

            <div className="grid gap-16">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="border-t border-ink/20 pt-5" key={index}>
                  <div className="h-6 w-44 bg-ink/10 sm:h-8 sm:w-56" />
                  <div className="mt-5 h-4 w-full bg-ink/10" />
                  <div className="mt-2 h-4 w-[92%] bg-ink/10" />
                  <div className="mt-2 h-4 w-[75%] bg-ink/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
