import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { contentShell } from "@/components/ui/tailwind";

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
                          className="flex min-h-10 items-center justify-between gap-4 border-b border-navy-line text-[12px] font-bold"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} ${link.label} 새 창에서 열기`}
                        >
                          {link.label}
                          <ArrowUpRightIcon className="size-4" aria-hidden="true" />
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
      nameEn: "Hyoseok Ryu",
      image: "/images/team/hyoseok-ryu.png",
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
