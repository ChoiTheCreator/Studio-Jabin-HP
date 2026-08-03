import { NextResponse } from "next/server";

import { consumeInquiryRequest } from "@/server/inquiries/inquiry.rate-limit";
import { submitInquiry } from "@/server/inquiries/inquiry.service";
import { validateInquiry } from "@/server/inquiries/inquiry.schema";
import type { ApiResponse } from "@/server/shared/api-response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientAddress = forwardedFor || request.headers.get("x-real-ip");
  const rateLimit = consumeInquiryRequest(clientAddress);

  if (!rateLimit.allowed) {
    return NextResponse.json<ApiResponse<never>>(
      {
        ok: false,
        error: {
          code: "RATE_LIMITED",
          message: "문의 요청이 많습니다. 잠시 후 다시 시도해 주세요.",
        },
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      {
        ok: false,
        error: { code: "INVALID_JSON", message: "요청 형식이 올바르지 않습니다." },
      },
      { status: 400 },
    );
  }

  const validation = validateInquiry(payload);

  if (!validation.success) {
    return NextResponse.json<ApiResponse<never>>(
      {
        ok: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "입력 내용을 다시 확인해 주세요.",
          fields: validation.fields,
        },
      },
      { status: 422 },
    );
  }

  try {
    const receipt = await submitInquiry(validation.data);
    return NextResponse.json<ApiResponse<typeof receipt>>(
      { ok: true, data: receipt },
      { status: 201 },
    );
  } catch (error) {
    console.error("[inquiry:failed]", error);
    return NextResponse.json<ApiResponse<never>>(
      {
        ok: false,
        error: {
          code: "INQUIRY_UNAVAILABLE",
          message: "문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        },
      },
      { status: 503 },
    );
  }
}
