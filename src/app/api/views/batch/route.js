import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slugsParam = searchParams.get("slugs");

  if (!slugsParam) {
    return NextResponse.json({ error: "No slugs provided" }, { status: 400 });
  }

  const slugs = slugsParam.split(",").filter(Boolean);
  if (slugs.length === 0) {
    return NextResponse.json({ views: {} });
  }

  const supabase = getSupabaseAdmin();

  const viewsMap = {};
  slugs.forEach((slug) => {
    viewsMap[slug] = 0;
  });

  if (!supabase) {
    return NextResponse.json({ views: viewsMap });
  }

  const { data, error } = await supabase
    .from("views")
    .select("slug, count")
    .in("slug", slugs);

  if (error) {
    console.error("Batch Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  data?.forEach((item) => {
    viewsMap[item.slug] = item.count;
  });

  return NextResponse.json({ views: viewsMap });
}
