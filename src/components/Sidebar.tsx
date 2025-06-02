"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  Search,
  Joystick,
  Wrench,
  QrCode,
  HomeIcon,
} from "lucide-react";
import React from "react";

const navLinks = [
  { href: "/", icon: <HomeIcon className="h-5 w-5" />, text: "Home" },
  { href: "/quotes", icon: <DollarSign className="h-5 w-5" />, text: "Quotes" },
  { href: "/insights", icon: <Search className="h-5 w-5" />, text: "Insights" },
  {
    href: "/video-game-lots",
    icon: <Joystick className="h-5 w-5" />,
    text: "Video Game Lots",
  },
  {
    href: "/spec-finder",
    icon: <Wrench className="h-5 w-5" />,
    text: "Spec Finder",
  },
  {
    href: "/upc-lookup",
    icon: <QrCode className="h-5 w-5" />,
    text: "UPC Lookup",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0f172a] p-4 text-white transition-transform sm:translate-x-0">
      <div className="mb-8 flex items-center justify-center">
        <Link
          href="/"
          className="cookie text-4xl text-white hover:text-[hsl(142,100%,70%)]"
        >
          Scout
        </Link>
      </div>
      <nav className="flex-grow space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.text}
              className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out hover:bg-white/5 ${
                isActive
                  ? "bg-white/10 text-[hsl(142,100%,70%)]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {React.cloneElement(link.icon, {
                className: `mr-3 h-5 w-5 transition-colors duration-150 ease-in-out ${isActive ? "text-[hsl(142,100%,70%)]" : "text-white/60 group-hover:text-white"}`,
              })}
              {link.text}
            </Link>
          );
        })}
      </nav>
      {/* Optional: Add a footer or user profile section here later */}
    </aside>
  );
}
