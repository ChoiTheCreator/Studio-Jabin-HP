type ServicePhrase = {
  language: "en" | "ko" | "ja";
  items: readonly string[];
};

const servicePhrases = [
  {
    language: "en",
    items: [
      "Planning",
      "Design",
      "Web/App",
      "Backend",
      "Security",
      "Deployment",
      "Operations",
      "JABIN STUDIO",
    ],
  },
  {
    language: "ko",
    items: ["기획", "디자인", "웹/앱", "백엔드", "보안", "배포", "운영", "JABIN STUDIO"],
  },
  {
    language: "ja",
    items: [
      "企画",
      "デザイン",
      "Web/App",
      "バックエンド",
      "セキュリティ",
      "デプロイ",
      "運用",
      "JABIN STUDIO",
    ],
  },
] as const satisfies readonly ServicePhrase[];

const phraseCopies = [0, 1] as const;
const trackCopies = [0, 1] as const;

function ServicePhraseGroup() {
  return (
    <span className="flex shrink-0 items-center">
      {phraseCopies.map((phraseCopy) =>
        servicePhrases.map((phrase) => (
          <span className="flex shrink-0 items-center" lang={phrase.language} key={`${phraseCopy}-${phrase.language}`}>
            {phrase.items.map((item) => (
              <span className="flex shrink-0 items-center" key={item}>
                <span className={item === "JABIN STUDIO" ? "font-bold text-navy-signal" : "font-bold"}>
                  {item}
                </span>
                <span className="mx-3 text-white/55 sm:mx-4">·</span>
              </span>
            ))}
          </span>
        )),
      )}
    </span>
  );
}

export function ServiceMarquee() {
  return (
    <section
      className="overflow-hidden border-y border-white/18 bg-navy-primary text-white"
      aria-labelledby="service-marquee-title"
      data-testid="service-marquee"
    >
      <h2 className="sr-only" id="service-marquee-title">
        Jabin Studio 서비스 범위
      </h2>

      <div
        className="service-marquee-track flex w-max animate-marquee items-center py-3 text-[12px] leading-none whitespace-nowrap motion-reduce:animate-none sm:text-[13px]"
        aria-hidden="true"
      >
        {trackCopies.map((copy) => (
          <span className="flex shrink-0 items-center" key={copy}>
            <ServicePhraseGroup />
          </span>
        ))}
      </div>

      <ul className="sr-only">
        {servicePhrases.map((phrase) => (
          <li lang={phrase.language} key={phrase.language}>
            {phrase.items.join(" · ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
