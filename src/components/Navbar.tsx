"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

        <div className="flex items-center gap-8">
          <Link
            href="/lots/video-games"
            className="rounded-lg bg-white/10 px-4 py-2 text-white/70 transition-all duration-200 hover:bg-white/20 hover:text-white"
          >
            Video Games
          </Link>
          <Link
            href="https://github.com/JuanQuenga/Scout"
            target="_blank"
            className="rounded-lg bg-white/10 px-4 py-2 text-white/70 transition-all duration-200 hover:bg-white/20 hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
