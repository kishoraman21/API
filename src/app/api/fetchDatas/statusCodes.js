import { connect } from "@/dbConfig/db";
import Usage from "@/models/usage";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  try {
    const data = await Usage.aggregate([
      { $group: { _id: "$status_code", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    return NextResponse.json({ statusCodes: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
