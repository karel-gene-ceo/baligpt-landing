import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await getSupabase()
      .from("waitlist")
      .upsert({ email: email.toLowerCase() }, { onConflict: "email" });

    if (error) {
      console.error("Waitlist insert error:", error);
      return NextResponse.json({ error: "Failed to join" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to join" }, { status: 500 });
  }
}
