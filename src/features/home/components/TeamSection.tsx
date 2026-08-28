import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell } from "@/components/ui/tailwind";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TeamLinkIcon({ label }: { label: string }) {
  if (label === "GitHub") return <GitHubIcon className="size-4" />;
  if (label === "LinkedIn") return <LinkedInIcon className="size-4" />;
  return <ArrowUpRightIcon className="size-4" aria-hidden="true" />;
}

export function TeamSection() {
  return (
    <section
      className="bg-navy-surface py-19 text-navy-ink sm:py-28 lg:py-32"
      id="team"
      aria-labelledby="team-title"
    >
      <div className={contentShell}>
        <Reveal className="grid gap-8 border-t border-navy-line pt-5 lg:gap-16 lg:pt-6">
          <div>
            <h2 className="text-[38px] font-bold sm:text-[46px] lg:text-[54px]" id="team-title">
              이 4명이 만듭니다.
            </h2>
            <p className="mt-7 mb-0 text-[16px] leading-[1.68] break-keep text-navy-muted sm:text-[17px]">
              기획과 기술의 책임자가 처음부터 끝까지 참여합니다.
              <br />
              빠른 의사결정과 명확한 책임 범위로 아이디어를 현실으로 만들어갑니다.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-navy-line sm:mt-24 lg:mt-24">
          {team.members.map((member, memberIndex) => (
            <Reveal key={member.nameEn} delay={memberIndex * 100}>
              <article className="relative grid gap-5 overflow-hidden border-b border-navy-line py-6 sm:grid-cols-[104px_minmax(180px,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-7 lg:grid-cols-[128px_minmax(220px,0.85fr)_minmax(300px,1.2fr)_minmax(180px,0.65fr)] lg:items-start lg:gap-7 lg:py-11">
                <div className="relative mr-4 size-20 overflow-hidden bg-navy-deep sm:size-24 lg:size-30">
                  <Image
                    src={member.image}
                    alt={`${member.name} 프로필 사진`}
                    fill
                    sizes="(min-width: 1024px) 120px, (min-width: 640px) 96px, 80px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="m-0 text-[12px] font-bold text-navy-primary">{member.role}</p>
                  <h3 className="mt-4 mb-0 text-[36px] leading-none font-normal sm:text-[40px] lg:text-[42px]">
                    {member.name}
                  </h3>
                  <p className="mt-2 mb-0 text-[13px] font-bold text-navy-muted">{member.nameEn}</p>
                </div>

                <div>
                  {member.responsibility ? (
                    <p className="m-0 max-w-142.5 text-[17px] leading-[1.65] break-keep sm:text-[18px]">
                      {member.responsibility}
                    </p>
                  ) : null}
                  <p className="mt-4 mb-0 max-w-130 text-[12px] leading-[1.7] font-medium text-navy-muted">
                    {member.specialties.join(" · ")}
                  </p>
                </div>

                <ul className="m-0 grid list-none border-t border-navy-line p-0 sm:col-start-2 sm:col-end-4 lg:col-start-4 lg:col-end-5">
                  {member.links
                    .filter((link) => link.href)
                    .map((link) => (
                      <li key={link.label}>
                        <a
                          className="flex min-h-10 items-center justify-between gap-4 border-b border-navy-line px-2 text-[12px] font-bold transition-colors duration-200 hover:bg-navy-ink hover:text-white"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} ${link.label} 새 창에서 열기`}
                        >
                          {link.label}
                          <TeamLinkIcon label={link.label} />
                        </a>
                      </li>
                    ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type TeamLink = {
  label: string;
  // URL이 확인되지 않은 구성원은 href를 비워 두고 비활성 링크로 표시한다.
  href?: string;
};

type TeamMember = {
  name: string;
  nameEn: string;
  image: string;
  role: string;
  responsibility?: string;
  specialties: readonly string[];
  links: readonly TeamLink[];
};

type Team = {
  members: readonly TeamMember[];
};

const team: Team = {
  members: [
    {
      name: "최원빈",
      nameEn: "Wonbin Choi",
      image: "/images/team/wonbin-choi.png",
      role: "CEO",
      responsibility:
        "고객의 목표를 제품 방향으로 구체화하고, 프로젝트의 우선순위와 실행 과정을 책임집니다.",
      specialties: ["Business Strategy", "Product Direction", "Client Partnership"],
      links: [
        {
          label: "LinkedIn",
          href: "https://kr.linkedin.com/in/%EC%9B%90%EB%B9%88-%EC%B5%9C-a90451366",
        },
        { label: "GitHub", href: "https://github.com/ChoiTheCreator" },
        { label: "Portfolio", href: "https://www.wonbinchoi.com/" },
      ],
    },
    {
      name: "박재욱",
      nameEn: "Jaewook Park",
      image: "/images/team/jaewook-park.png",
      role: "CTO",
      responsibility:
        "서비스 구조와 기술 의사결정을 이끌고, 구축부터 배포와 운영까지의 품질을 책임집니다.",
      specialties: ["Full-stack Engineering", "Application Engineering", "Cloud Operations"],
      links: [
        {
          label: "LinkedIn",
          href: "https://au.linkedin.com/in/jaewook-park-a5a032385",
        },
        { label: "GitHub", href: "https://github.com/wooooooooook" },
        { label: "Portfolio", href: "https://wooooooooook.com/" },
      ],
    },
    {
      name: "유효석",
      nameEn: "Hyoseok Yu",
      image: "/images/team/hyoseok-yu.png",
      role: "Planning & Design",
      responsibility:
        "서비스 기획과 디자인을 설계하고, 완성도 있는 결과물을 위한 품질 관리를 책임집니다.",
      specialties: ["Product Planning", "UI/UX Design", "Quality Assurance"],
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/%EC%9C%A0%ED%9A%A8%EC%84%9D-undefined-12886742a/",
        },
        { label: "GitHub", href: "https://github.com/hughryu1125" },
        { label: "Portfolio" },
      ],
    },
    {
      name: "임시우",
      nameEn: "Siwoo Lim",
      image: "/images/team/siwoo-lim.jpg",
      role: "Infrastructure",
      responsibility: "서버와 인프라를 운영하고, 안정적인 배포와 장애 대응 체계를 책임집니다.",
      specialties: ["Server Administration", "Infrastructure Management", "DevOps"],
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/siwoo-lim/" },
        { label: "GitHub", href: "https://github.com/Ani-Gil" },
        { label: "Portfolio", href: "https://www.bluerack.org/" },
      ],
    },
  ],
};
