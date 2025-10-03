"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const onSignUp = async () => {
    try {
      const response = axios.post("/api/auth/signup", user);
      console.log(response);

      router.push("/login");
    } catch (error) {
      console.log("signup error", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen py-2">
      <h1 className="mb-4">Signup</h1>
      <hr />
      <label htmlFor="username"> Username </label>
      <input
        className="p-2 border-gray-300 bg-amber-100 rounded-2xl mt-2 "
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email" className="mt-4">
        {" "}
        email{" "}
      </label>
      <input
        className="p-2 border-gray-300  bg-amber-100 rounded-2xl mt-2"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="mt-4">
        {" "}
        password{" "}
      </label>
      <input
        className="p-2 border-gray-300  bg-amber-100 rounded-2xl mt-2"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignUp}
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Sign Up
      </button>
      <Link href="/login" className="border border-gray-200 rounded-3xl p-3">
        Visit Login
      </Link>
    </div>
  );
}
