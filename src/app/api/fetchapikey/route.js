import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Read cookie value on the server
  const cookieStore = await cookies();
  const apiKey = cookieStore.get("apikey")?.value;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, message: "API key not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    apikey: apiKey,
  });
}
