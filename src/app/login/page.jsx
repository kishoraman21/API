"use client";

import React, { useState, useEffect } from "react";
import { Activity, ArrowLeft, Loader2, LogIn } from "lucide-react";
import { Client, Account, OAuthProvider, AppwriteException } from "appwrite";
import { useRouter } from "next/navigation";
import axios from "axios";
// --- Appwrite Configuration ---
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "68e149670002f239da5a";

// Initialize Appwrite client and services outside the component
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);
const account = new Account(client);

// --- Appwrite Utility Functions ---

async function getCurrentUser() {
  try {
    // Fetches the user account if a valid session exists (checks cookies/storage)
    const user = await account.get();
    //debug
    console.log("Appwrite User Loaded:", {
      id: user.$id,
      name: user.name,
      email: user.email,
      providers: user.prefs.providers, // Check if Google is listed
    });
    return user;
  } catch (error) {
    // If an error occurs (e.g., session not found), return null
    return null;
  }
}

// Initiates the OAuth login flow using correct Google scopes
function createGoogleOAuthSession(successUrl, failureUrl) {
  console.log("Appwrite: Redirecting to Google for OAuth...");

  // Using Google's explicit required scopes to resolve the Error 400: invalid_scope
  account
    .createOAuth2Session({
      provider: OAuthProvider.Google,
      success: successUrl,
      failure: failureUrl,
      // These are the valid scopes required by Google for email and profile access
      scopes: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
      ],
    })
    .catch((error) => {
      // This catch handles errors before the redirect
      console.error("Appwrite: Error initiating OAuth:", error);
    });
}

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", {
        email: user.email,
        password: user.password,
      });

      console.log("Login Successful", response.data);

      // Redirect to dashboard on success
    //   router.push("/dashboard");
    window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);

      // Handle axios error response
      if (error.response) {
        // Server responded with error status
        setError(
          error.response.data?.error ||
            error.response.data?.message ||
            "Login failed"
        );
      } else if (error.request) {
        // Request made but no response received
        setError("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError(error.message || "Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // --- Session Check on Component Mount ---
  useEffect(() => {
    async function checkSessionAndRedirect() {
      setSessionLoading(true);
      const user = await getCurrentUser();
      if (user) {
        // User is already logged in, redirect to the dashboard
        router.replace("/dashboard");
      } else {
        setSessionLoading(false);
      }
    }
    checkSessionAndRedirect();
  }, [router]);

  // Handles the traditional email/password login
  //   const onLogin = async (e) => {
  //     e.preventDefault();
  //     setIsSubmitting(true);
  //     setError("");

  //     try {
  //       // 1. Create the session using email/password
  //       await account.createEmailPasswordSession(
  //         credentials.email,
  //         credentials.password
  //       );

  //       // 2. Verify the session (optional, but good practice)
  //       await account.get();

  //       // 3. Navigate to the protected page
  //       router.push("/dashboard");
  //     } catch (err) {
  //       console.error("Login failed:", err);
  //       if (err instanceof AppwriteException) {
  //         // Display user-friendly error from Appwrite
  //         setError(err.message || "An unknown authentication error occurred.");
  //       } else {
  //         setError("Network error or failed to connect to service.");
  //       }
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  // Handles Google OAuth Sign In
  const handleGoogleSignIn = () => {
    console.log("gog");
    setError("");
    createGoogleOAuthSession(
      "http://localhost:3000/dashboard", // Success redirect URL
      "http://localhost:3000/login" // Failure redirect URL
    );
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  // --- Loading State UI ---
  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        <p className="ml-3 text-lg">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Dark Background with Subtle Gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={handleBackToHome}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors" />
          <span className="text-slate-400 group-hover:text-white transition-colors">
            Back to Home
          </span>
        </button>
      </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">
            {/* Logo Section Inside Card */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4">
                <Activity
                  className="w-8 h-8 text-slate-900"
                  strokeWidth={2.5}
                />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-orange-400">
                Welcome Back
              </h1>
              <p className="text-slate-400 text-sm">
                Sign in to your Api Analytics account
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all mb-6 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-white">
                Sign in with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-slate-900/80 text-slate-500">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-3 mb-4 text-sm text-red-300 bg-red-900/40 border border-red-800 rounded-lg"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={onLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="name@company.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        password: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-semibold text-slate-900 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center mt-6 text-xs text-slate-500">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Secure, encrypted connection
          </div>
        </div>
      </div>
    </div>
  );
}
