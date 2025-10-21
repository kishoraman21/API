import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/db";
import usage from "../../../../models/usage";
import User from "../../../../models/userModel"; 

export async function POST(req) {
  try {
    await connect();

    const body = await req.json();
    const { apikey, endpoint, status_code, is_success, response_time_ms, method, ip } = body;

    if (
      !apikey ||
      !endpoint ||
      !method ||
      !ip ||
      typeof status_code !== "number" ||
      typeof is_success !== "boolean" ||
      typeof response_time_ms !== "number"
    ) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    //verify apikey
    const validUser = await User.findOne({ apikey: apikey });
    if (!validUser) {
      return NextResponse.json(
        { success: false, message: "Invalid API key" },
        { status: 401 }
      );
    }

    // Sanitize endpoint to prevent injection attacks
    const safeEndpoint = endpoint.replace(/[^\w/:-]/g, "");

   
    const usaged = await usage.findOneAndUpdate(
      { userId: validUser._id,   apikey, endpoint: safeEndpoint, status_code, is_success, method, ip },
      {
        $inc: { count: 1 },
        $set: {
          response_time_ms,
          timestamp: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Usage logged successfully",
      data: {
        endpoint: usaged.endpoint,
        status_code: usaged.status_code,
        is_success: usaged.is_success,
        response_time_ms: usaged.response_time_ms,
        count: usaged.count,
        timestamp: usaged.timestamp,
      },
    });
  } catch (error) {
    console.error("Usage logging error:", error);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
