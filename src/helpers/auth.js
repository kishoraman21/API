import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { connect } from "../dbConfig/db";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET_TOKEN;

export async function signUpUser(username, email, password) {
  await connect();

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists!");

  const hashedPassword = await bcrypt.hash(password, 10);
  const apikey = crypto.randomBytes(20).toString("hex");

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    apikey,
  });

  return { email: user.email, apikey: user.apikey };
}

//login

export async function loginUser(email, password) {
  await connect();
  console.log("DB connected")

  const user = await User.findOne({ email });
  const username = user?.username;
  console.log(username)
  console.log("User fetched", user)
  if (!user) throw new Error("User not found ");

  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) throw new Error("Invalid Password");

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" }); //token data ,then secret key and last expiry

  return { token, apikey: user.apikey , username : username};
}
