import { NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/db";
import Usage from "../../../../models/usage";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const apikey = searchParams.get("apikey");

    if (!apikey) {
      return NextResponse.json(
        { success: false, message: "API key is required" },
        { status: 400 }
      );
    }

    // Only summary analytics
    const summary = await Usage.aggregate([
      { $match: { apikey } },
      {
        $group: {
          _id: "$endpoint",
          totalHits: { $sum: "$count" },
          avgResponse: { $avg: "$response_time_ms" },
          successRate: {
            $avg: { $cond: [{ $eq: ["$is_success", true] }, 1, 0] },
          },
          endpoint: { $first: "$endpoint" },
        },
      },
      { $sort: { totalHits: -1 } },
      { $limit: 10 },
    ]);

    return NextResponse.json({
      success: true,
      message: "Summary data fetched successfully",
      summary,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
