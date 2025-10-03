import { loginUser } from "../../../../helpers/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();

    const { email, password } = reqBody;

    const result = await loginUser(email, password); //holds the object token and apikey 

    const { token } = result 

    const response = NextResponse.json({
      success: true,
      message: "Login successfull",
      apiKey: result.apiKey,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
