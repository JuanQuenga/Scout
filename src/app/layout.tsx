import "~/styles/globals.css";

import { type Metadata } from "next";
import Sidebar from "~/components/Sidebar";

export const metadata: Metadata = {
  title: "Scout | POS",
  description: "Scout POS and Listing Tools",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-64 flex-1 bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
