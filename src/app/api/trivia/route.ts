import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount") ?? "10";
  const category = searchParams.get("category") ?? "";
  const difficulty = searchParams.get("difficulty") ?? "";
  const type = searchParams.get("type") ?? "multiple";

  const url = new URL("https://opentdb.com/api.php");
  url.searchParams.set("amount", amount);
  if (category) url.searchParams.set("category", category);
  if (difficulty) url.searchParams.set("difficulty", difficulty);
  if (type) url.searchParams.set("type", type);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok)
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });

  const data = await res.json();
  return NextResponse.json(data);
}
