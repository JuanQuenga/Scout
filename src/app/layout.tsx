// "use client"; // No longer a client component

import "~/styles/globals.css";
import { type Metadata } from "next";
// import Sidebar from "~/components/Sidebar"; // Sidebar is now managed by LayoutClient
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { Menu as MenuIcon } from "lucide-react";
import LayoutClient from "~/components/LayoutClient"; // Import the new client wrapper

// Note: Static metadata should be defined outside the component or in a separate file
// For simplicity, we'll keep it here, but be aware of Next.js recommendations.
export const metadata: Metadata = {
  title: "Scout | POS",
  description: "Scout POS and Listing Tools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // const pathname = usePathname();

  // const toggleMobileSidebar = () => {
  //   setIsMobileSidebarOpen(!isMobileSidebarOpen);
  // };

  // useEffect(() => {
  //   setIsMobileSidebarOpen(false);
  // }, [pathname]);

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
          <LayoutClient>{children}</LayoutClient>
        </div>
      </body>
    </html>
  );
}
