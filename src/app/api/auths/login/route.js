import { loginUser } from "../../../../helpers/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();

    const { email, password } = reqBody;

    const result = await loginUser(email, password); //holds the object token and apikey

    const { token, apikey, username } = result; //destructing the token

    const response = NextResponse.json({
      success: true,
      message: "Login successfull",
      apiKey: result.apikey,
    });

    response.cookies.set("token", token,{ httpOnly: true });
    response.cookies.set("apikey", apikey,{ httpOnly: true });
    response.cookies.set("username", username,{ httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
