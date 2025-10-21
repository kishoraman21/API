import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "./AuthProvider";
// import { ThemeProvider } from "./themecontext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ApiDeck",
  description: "Monitor and track your API usage with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProvider> */}
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
