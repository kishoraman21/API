import { connect } from "@/dbConfig/db";
import Usage from "@/models/usage";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const data = await Usage.aggregate([
      { $group: { _id: null, avgTime: { $avg: "$response_time_ms" } } }
    ]);
    return NextResponse.json({ avgResponseTime: data[0]?.avgTime || 0 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}