import "server-only";

import type { InquiryInput } from "./inquiry.schema";

export type InquiryReceipt = {
  id: string;
  receivedAt: string;
};

export async function submitInquiry(input: InquiryInput): Promise<InquiryReceipt> {
  const receipt = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
  };

  const { website, ...inquiry } = input;

  if (website) {
    return receipt;
  }
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...receipt, ...inquiry }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      throw new Error(`Inquiry webhook failed with ${response.status}`);
    }
  } else {
    console.info("[inquiry:accepted]", {
      ...receipt,
      nameLength: input.name.length,
      emailDomain: input.email.split("@")[1],
      companyProvided: Boolean(input.company),
      phoneProvided: Boolean(input.phone),
      projectType: input.projectType,
      servicesCount: input.services.length,
      scheduleProvided: Boolean(input.schedule),
      budgetProvided: Boolean(input.budget),
      projectLength: input.project.length,
    });
  }

  return receipt;
}
