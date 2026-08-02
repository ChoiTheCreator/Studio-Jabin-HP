import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    data: { service: "studio-jabo", timestamp: new Date().toISOString() },
  });
}
