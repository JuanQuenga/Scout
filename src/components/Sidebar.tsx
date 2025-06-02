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
  X as XIcon,
} from "lucide-react";
import React from "react";

interface NavLinkItem {
  href: string;
  icon: React.ReactElement<{ className?: string }>;
  text: string;
}

const navLinks: NavLinkItem[] = [
  { href: "/", icon: <LayoutDashboard className="h-5 w-5" />, text: "Home" },
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

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#0f172a] p-4 text-white transition-transform duration-300 ease-in-out sm:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="cookie text-4xl text-white hover:text-[hsl(142,100%,70%)]"
          onClick={() => {
            if (isOpen) toggleSidebar();
          }}
        >
          Scout
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-2 text-white/80 hover:text-white sm:hidden"
          aria-label="Close sidebar"
        >
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-grow space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.text}
              onClick={() => {
                if (isOpen) toggleSidebar();
              }}
              className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out hover:bg-white/5 ${
                isActive
                  ? "bg-white/10 text-[hsl(142,100%,70%)]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {React.cloneElement(link.icon, {
                className: `mr-3 h-5 w-5 shrink-0 transition-colors duration-150 ease-in-out ${isActive ? "text-[hsl(142,100%,70%)]" : "text-white/60 group-hover:text-white"}`,
              })}
              {link.text}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
