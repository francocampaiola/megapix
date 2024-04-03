import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = createClient();

  const data = await req.json();
  const { id } = data;
  
  if (!id) {
    return NextResponse.error("ID del usuario no proporcionado", {
      status: 400,
    });
  }

  const { error } = await client
    .from("usuarios")
    .update({ estado: "aprobado" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ message: "Usuario aprobado" });
}
