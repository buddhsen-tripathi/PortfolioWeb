import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ views: 0 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "No slug provided" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ views: data?.count || 0 });
}

export async function POST(req) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ views: 0 });
  }

  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json({ error: "No slug provided" }, { status: 400 });
  }

  const { error: incrementError } = await supabase.rpc(
    "increment_view_count",
    { post_slug: slug }
  );

  if (incrementError) {
    console.error("View Count Error:", incrementError);
    return NextResponse.json({ error: incrementError.message }, { status: 500 });
  }

  const { data, error: fetchError } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .maybeSingle();

  if (fetchError) {
    console.error("Fetch Error:", fetchError);
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ views: data?.count || 0 });
}
