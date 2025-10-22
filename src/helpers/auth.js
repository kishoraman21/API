import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { connect } from "../dbConfig/db";
import crypto from "crypto";

export async function signUpUser(username, email, password) {
  await connect();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists!");
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  // password = hashedPassword;

  const newApikey = crypto.randomBytes(40).toString("hex");

  
  
  const user = await User.create({
    username,
    email,
    password, 
    provider: 'credentials',
    apikey: newApikey,

  });

  return { email: user.email, apikey: user.apikey };
}


