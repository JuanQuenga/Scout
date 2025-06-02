"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Joystick, DollarSign, Search, QrCode, Menu, X } from "lucide-react";
import NavButton from "./NavButton";
import { useState, useEffect } from "react";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === "/") return null;

  const navLinks: {
    href: string;
    icon: React.ReactElement<{ className?: string }>;
    text: string;
  }[] = [
    {
      href: "/video-game-lots",
      icon: <Joystick className="h-4 w-4" />,
      text: "Video Game Lots",
    },
    {
      href: "/quotes",
      icon: <DollarSign className="h-4 w-4" />,
      text: "Quotes",
    },
    {
      href: "/spec-finder",
      icon: <Search className="h-4 w-4" />,
      text: "Spec Finder",
    },
    {
      href: "/upc-lookup",
      icon: <QrCode className="h-4 w-4" />,
      text: "UPC Lookup",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#1a472a]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 md:px-4">
        <Link
          href="/"
          className="cookie text-3xl text-white hover:text-[hsl(142,100%,70%)] md:text-4xl"
        >
          Scout
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-2 md:flex md:gap-4">
          {navLinks.map((link) => (
            <NavButton href={link.href} key={link.href} size="sm">
              {React.cloneElement(link.icon, {
                className: `${link.icon.props.className ?? ""} transition-colors duration-200 group-hover:text-black`,
              })}
              <span className="font-medium transition-colors duration-200 group-hover:text-black">
                {link.text}
              </span>
            </NavButton>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-white hover:bg-white/10 focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`transform transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "visible max-h-screen opacity-100" : "invisible max-h-0 opacity-0"} overflow-hidden border-t border-white/10 bg-[#1a472a]/95 backdrop-blur-md`}
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navLinks.map((link) => (
            <NavButton
              href={link.href}
              key={`mobile-${link.href}`}
              size="md" // Use larger buttons for mobile dropdown
              className="w-full !justify-start text-base" // Full width, left align text, ensure text-base
            >
              {React.cloneElement(link.icon, {
                className: `${link.icon.props.className ?? ""} transition-colors duration-200 group-hover:text-black`,
              })}
              <span className="font-medium transition-colors duration-200 group-hover:text-black">
                {link.text}
              </span>
            </NavButton>
          ))}
        </div>
      </div>
    </nav>
  );
}
