import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "Scout AI",
  description: "AI Auto-Listing Assistant",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] text-white">
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
