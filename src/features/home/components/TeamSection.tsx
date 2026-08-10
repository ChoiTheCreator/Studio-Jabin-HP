import { ArrowUpRightIcon, MinusIcon } from "@heroicons/react/24/outline";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell, eyebrow } from "@/components/ui/tailwind";
import { team } from "../home.content";

export function TeamSection() {
  return (
    <section
      className="bg-navy-surface py-19 text-navy-ink sm:py-28 lg:py-32"
      id="team"
      aria-labelledby="team-title"
    >
      <div className={contentShell}>
        <Reveal className="grid gap-8 border-t border-navy-line pt-5 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,2.2fr)] lg:gap-16 lg:pt-6">
          <div className="flex items-start justify-between gap-5 lg:block">
            <p className={`${eyebrow} text-navy-primary`}>CORE TEAM</p>
            <dl className="m-0 grid grid-cols-2 gap-x-5 text-right lg:mt-20 lg:max-w-55 lg:text-left">
              <div>
                <dt className="text-[11px] font-bold text-navy-muted">PEOPLE</dt>
                <dd className="mt-1 text-[26px] leading-none font-bold">0{team.total}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold text-navy-muted">PUBLIC</dt>
                <dd className="mt-1 text-[26px] leading-none font-bold">0{team.members.length}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2
              className="m-0 max-w-215 text-[38px] leading-[1.08] font-bold break-keep sm:text-[46px] lg:text-[54px]"
              id="team-title"
            >
              역할은 나누고,
              <br />
              책임은 함께 집니다.
            </h2>
            <p className="mt-7 mb-0 max-w-155 text-[16px] leading-[1.68] break-keep text-navy-muted sm:text-[17px]">
              기획과 기술의 책임자가 처음부터 직접 참여합니다. 빠른 의사결정과 명확한 책임 범위로
              아이디어를 실제 운영 가능한 서비스까지 도달합니다.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-navy-line sm:mt-24 lg:mt-24">
          {team.members.map((member, memberIndex) => (
            <Reveal key={member.number} delay={memberIndex * 100}>
              <article className="group relative grid gap-7 overflow-hidden border-b border-navy-line py-7 sm:grid-cols-[88px_minmax(180px,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-9 lg:min-h-71 lg:grid-cols-[88px_minmax(220px,0.85fr)_minmax(300px,1.2fr)_minmax(180px,0.65fr)] lg:items-start lg:gap-9 lg:py-9">
                <div className="flex items-center justify-between sm:block">
                  <span className="text-[12px] font-bold text-navy-primary">{member.number}</span>
                  <span
                    className="grid size-14 place-items-center bg-navy-deep text-[15px] font-bold text-white transition-colors duration-300 group-hover:bg-navy-primary sm:mt-18.5 sm:size-16 lg:size-17"
                    aria-hidden="true"
                  >
                    {member.initials}
                  </span>
                </div>

                <div>
                  <p className="m-0 text-[12px] font-bold text-navy-primary">{member.role}</p>
                  <h3 className="mt-4 mb-0 text-[36px] leading-none font-bold sm:text-[40px] lg:text-[46px]">
                    {member.name}
                  </h3>
                  <p className="mt-2 mb-0 text-[13px] font-bold text-navy-muted">{member.nameEn}</p>
                </div>

                <div>
                  <p className="m-0 max-w-142.5 text-[17px] leading-[1.65] break-keep sm:text-[18px]">
                    {member.responsibility}
                  </p>
                  <p className="mt-7 mb-0 max-w-130 text-[12px] leading-[1.7] font-medium text-navy-muted">
                    {member.specialties.join(" · ")}
                  </p>
                </div>

                <ul className="m-0 grid list-none border-t border-navy-line p-0 sm:col-start-2 sm:col-end-4 lg:col-start-4 lg:col-end-5">
                  {member.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a
                          className="flex min-h-12 items-center justify-between gap-4 border-b border-navy-line text-[12px] font-bold transition-colors duration-200 hover:border-navy-primary hover:text-navy-primary"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} ${link.label} 새 창에서 열기`}
                        >
                          {link.label}
                          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          className="flex min-h-12 items-center justify-between gap-4 border-b border-navy-line text-[12px] font-bold text-navy-muted/45"
                          aria-disabled="true"
                          title="프로필 URL 필요"
                        >
                          {link.label}
                          <MinusIcon className="size-4" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5 flex flex-col gap-2 text-[12px] font-bold text-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">3 PEOPLE · 2 PUBLIC PROFILES</p>
          <p className="m-0">PROJECT LEAD · PRODUCT · ENGINEERING · OPERATIONS</p>
        </Reveal>
      </div>
    </section>
  );
}
