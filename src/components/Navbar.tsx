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
          <NavButton href="/video-game-lots" className="px-4 py-2">
            <Joystick className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              Video Game Lots
            </span>
          </NavButton>
          <NavButton href="/quotes" className="px-4 py-2">
            <DollarSign className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              Quotes
            </span>
          </NavButton>
          <NavButton href="/spec-finder" className="px-4 py-2">
            <Search className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              Spec Finder
            </span>
          </NavButton>
          <NavButton href="/upc-lookup" className="px-4 py-2">
            <QrCode className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              UPC Lookup
            </span>
          </NavButton>
        </div>
      </div>
    </div>
  );
}
