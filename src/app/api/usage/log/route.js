import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/db";
import usage from "../../../../models/usage";

export async function POST(req) {
  try {
    await connect();

    const { apikey, endpoint, status_code, is_success, response_time_ms, method , ip } =
      await req.json();

    if (
      !apikey ||
      !endpoint ||
      !method||
      !ip||
      typeof status_code !== "number" ||
      typeof is_success !== "boolean" ||
      typeof response_time_ms !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing or invalid fields",
        },
        { status: 400 }
      );
    }

    const usaged = await usage.findOneAndUpdate(
      { apikey, endpoint, status_code, is_success, method , ip},
      {
        $inc: { count: 1 },
        $set: {
          response_time_ms,
          timestamp: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, usaged });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
