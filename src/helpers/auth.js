import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { connect } from "../dbConfig/db";

export async function signUpUser(username, email, password) {
  await connect();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists!");
  }

  
  const user = await User.create({
    username,
    email,
    password, 
    provider: 'credentials',
  });

  return { email: user.email, apikey: user.apikey };
}


