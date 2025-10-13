import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore =  await cookies();
  const username = cookieStore.get("username")?.value;

  if (!username) {
    return NextResponse.json(
      { success: false, message: "Username not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    username: username,
  });
}
