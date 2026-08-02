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
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...receipt, ...input }),
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
      projectLength: input.project.length,
    });
  }

  return receipt;
}
