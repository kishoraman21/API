import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/db";
import Usage from "../../../../models/usage";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const apikey = searchParams.get("apikey");
    const limit = parseInt(searchParams.get("limit")) || 50;

    if (!apikey) {
      return NextResponse.json(
        { success: false, message: "API key is required" },
        { status: 400 }
      );
    }

    //recent request and deatils 

    const logs = await Usage.find({ apikey })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select("endpoint status_code is_success response_time_ms method ip timestamp count")
      .lean();

    return NextResponse.json({
      success: true,
      message: "Usage logs fetched successfully",
      logs,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
