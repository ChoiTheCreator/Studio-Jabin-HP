import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    data: { service: "jabin-studio", timestamp: new Date().toISOString() },
  });
}
