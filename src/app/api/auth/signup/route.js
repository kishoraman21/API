import { NextResponse } from "next/server";
import { signUpUser } from "../../../../helpers/auth";

export async function POST(req) {
  try {

    const reqBody = await req.json();
    const {username , email , password} = reqBody;
    const user = await signUpUser(username, email , password);
    return NextResponse.json({success:true, user});
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
