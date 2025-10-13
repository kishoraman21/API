import { NextResponse } from "next/server";
import Usage from "../../../../models/usage";
import { connect } from "../../../../dbConfig/db";

export async function GET(req) {
  try {
    await connect();
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get("apiKey");

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "API key required" },
        { status: 400 }
      );
    }

    const usage = await Usage.find({ apiKey });
    return NextResponse.json({ success: true, usage });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
