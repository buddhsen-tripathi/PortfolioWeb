import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/r2Client";

export async function GET() {
  try {
    const config = await getSiteConfig();
    const base = `https://api.counterapi.dev/v1/${config.integrations.visitorCounter}`;
    const res = await fetch(`${base}/visits/up`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("counterapi error");
    const data = await res.json();
    return NextResponse.json({ count: data.count ?? null });
  } catch {
    return NextResponse.json({ count: null });
  }
}
