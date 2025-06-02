"use client";

import Sidebar from "~/components/Sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Hamburger Menu Button - only on mobile */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-[60] rounded-md bg-[#0f172a]/80 p-2 text-white backdrop-blur-sm hover:bg-white/20 sm:hidden"
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <Sidebar
        isOpen={isMobileSidebarOpen}
        toggleSidebar={toggleMobileSidebar}
      />

      {/* Overlay for mobile when sidebar is open */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      <main className="flex-1 bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] p-4 pt-16 sm:ml-64 sm:pt-6 lg:p-8">
        {children}
      </main>
    </>
  );
}
