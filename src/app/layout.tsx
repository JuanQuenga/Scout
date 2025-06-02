import "~/styles/globals.css";

import { type Metadata } from "next";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "Scout",
  description: "Premium Listing Tools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
