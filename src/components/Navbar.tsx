"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Joystick, DollarSign, Search, QrCode } from "lucide-react";
import NavButton from "./NavButton";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#1a472a]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="cookie text-4xl text-white hover:text-[hsl(142,100%,70%)]"
        >
          Scout
        </Link>

        <div className="flex items-center gap-4">
          <NavButton href="/video-game-lots" size="sm">
            <Joystick className="h-4 w-4 transition-colors duration-200 group-hover:text-black" />
            <span className="font-medium transition-colors duration-200 group-hover:text-black">
              Video Game Lots
            </span>
          </NavButton>
          <NavButton href="/quotes" size="sm">
            <DollarSign className="h-4 w-4 transition-colors duration-200 group-hover:text-black" />
            <span className="font-medium transition-colors duration-200 group-hover:text-black">
              Quotes
            </span>
          </NavButton>
          <NavButton href="/spec-finder" size="sm">
            <Search className="h-4 w-4 transition-colors duration-200 group-hover:text-black" />
            <span className="font-medium transition-colors duration-200 group-hover:text-black">
              Spec Finder
            </span>
          </NavButton>
          <NavButton href="/upc-lookup" size="sm">
            <QrCode className="h-4 w-4 transition-colors duration-200 group-hover:text-black" />
            <span className="font-medium transition-colors duration-200 group-hover:text-black">
              UPC Lookup
            </span>
          </NavButton>
        </div>
      </div>
    </div>
  );
}
