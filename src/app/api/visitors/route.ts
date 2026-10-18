import { siteConfig } from "@/site.config";
import { NextResponse } from "next/server";

const BASE = `https://api.counterapi.dev/v1/${siteConfig.integrations.visitorCounter}`;

export async function GET() {
  try {
    const res = await fetch(`${BASE}/visits/up`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("counterapi error");
    const data = await res.json();
    return NextResponse.json({ count: data.count ?? null });
  } catch {
    return NextResponse.json({ count: null });
  }
}
