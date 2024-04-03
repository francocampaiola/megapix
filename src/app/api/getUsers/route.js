import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const client = createClient();
  const { data } = await client.from("usuarios").select("*");
  return NextResponse.json({ data });
}