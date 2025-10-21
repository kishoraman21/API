import { NextAuthOptions, User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserModel from "../models/userModel";
import {connect} from "../dbConfig/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import crypto from "crypto";

export const authConfig = {

  secret : process.env.JWT_SECRET_TOKEN,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        await connect();
        console.log("db connected")
        const user =await UserModel.findOne({ email: credentials.email });
        console.log("user fetched", user)

        if(!user){
          throw new Error("User not found with this email");
        }
        
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordMatch) {
          throw new Error("Invalid Password");
        }
        return {
          id: user._id,
          email: user.email,
          username: user.username,
          apikey: user.apikey,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {

  async signIn({ user, account, profile }) {
  if (account.provider === "google") {
    await connect();

    // Find the user by their email
    let existingUser = await UserModel.findOne({ email: user.email });

    if (!existingUser) {
      // If the user doesn't exist, create a new one.
     
      const newApikey = crypto.randomBytes(20).toString('hex');
      const newUser = new UserModel({
        email: user.email,
        username: user.name || profile.name || "Google User",
        provider: "google",
        apikey: newApikey,
      });
      
      // Save the new user to the database
      existingUser = await newUser.save();
    }
    
    // Pass the user data from the database to the JWT callback
    user.id = existingUser._id;
    user.apikey = existingUser.apikey;
    user.username = existingUser.username;
  }
  
  // Continue the sign-in process
  return true;
},
    async jwt({ token, user, account }) {
      // The `user` object is only available on the first sign-in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.apikey = user.apikey;
        // The `account` object provides provider-specific data
        if (account) {
          token.provider = account.provider;
          token.accessToken = account.access_token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom properties from the JWT to the session object
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.apikey = token.apikey;
      session.user.accessToken = token.accessToken;
      if (token.provider) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/login");
  }
}

