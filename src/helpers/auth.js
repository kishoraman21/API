import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { connect } from "../dbConfig/db";

export async function signUpUser(username, email, password) {
  await connect();

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists!");
  }

  // apikey and password hashing are handled by the pre-save hook in the model
  const user = await User.create({
    username,
    email,
    password, // No need to hash here, the model's pre-save hook does it
    provider: 'credentials',
  });

  return { email: user.email, apikey: user.apikey };
}

// The loginUser helper is no longer needed as NextAuth.js handles the login logic.
// However, the logic for comparing passwords is now part of the userModel instance method.
