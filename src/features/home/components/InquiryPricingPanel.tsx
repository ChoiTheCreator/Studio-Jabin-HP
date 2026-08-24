import { eyebrow } from "@/components/ui/tailwind";
import { inquiryPricingByScenario } from "@/config/pricing";
import type { InquiryType } from "@/config/inquiry";

type InquiryPricingPanelProps = {
  scenario: InquiryType;
};

export function InquiryPricingPanel({ scenario }: InquiryPricingPanelProps) {
  const pricing = inquiryPricingByScenario[scenario];

  return (
    <aside
      className="inquiry-fields-enter grid content-start gap-5 border-l-2 border-navy-signal bg-navy-surface-dark p-6 sm:p-8 lg:sticky lg:top-28"
      aria-label="예상 비용 안내"
      key={scenario}
    >
      <p className={`${eyebrow} text-white/55`}>PROJECT PRICING</p>
      <p className="m-0 text-[26px] leading-[1.2] font-bold break-keep text-white sm:text-[30px]">
        <span className="text-white/45">{pricing.headline.label} — </span>
        {pricing.headline.value}
      </p>
      {pricing.detail ? (
        <p className="m-0 max-w-100 text-[14px] leading-[1.65] break-keep text-white/70">
          {pricing.detail}
        </p>
      ) : null}
      {pricing.items ? (
        <dl className="m-0 grid gap-3 border-t border-white/15 pt-4">
          {pricing.items.map((item) => (
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4" key={item.label}>
              <dt className="text-[13px] font-bold text-white/55">{item.label}</dt>
              <dd className="m-0 text-right text-[14px] font-bold text-white">
                {item.value}
                {item.detail ? (
                  <span className="mt-0.5 block text-[11px] font-medium text-white/45">
                    {item.detail}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {pricing.disclaimer ? (
        <p className="m-0 text-[12px] leading-[1.55] text-white/45">* {pricing.disclaimer}</p>
      ) : null}
    </aside>
  );
}
