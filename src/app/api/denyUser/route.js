import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = createClient();

  const data = await req.json();
  const { id, motivo_rechazo } = data;

  if (!id) {
    return NextResponse.error("ID del cliente no proporcionado", {
      status: 400,
    });
  }

  const { error } = await client
    .from("usuarios")
    .update({ estado: "denegado", motivo_rechazo: motivo_rechazo })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error });
  }
  return NextResponse.json({ message: "Usuario denegado" });
}
