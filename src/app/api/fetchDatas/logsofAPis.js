import { connect } from "@/dbConfig/db";
import Usage from "@/models/usage";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();

  try {
    const logs = await Usage.find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .select("endpoint status_code response_time_ms timestamp method ip")
      .lean();

    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}