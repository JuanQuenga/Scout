"use client";

import Link from "next/link";
import { Ghost, Home, Joystick, Search, QrCode } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] px-4 py-16 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white/10 px-6 py-8 text-center shadow-lg sm:p-10">
        <Ghost className="mb-2 h-16 w-16 text-white/70" />
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          404
        </h1>
        <h2 className="text-xl font-bold sm:text-2xl">Page Not Found</h2>
        <p className="max-w-md text-center text-base text-white/80 sm:text-lg">
          404 Error: This page seems to have cashed out! Maybe it went to
          PayMore Southgate to get top dollar?
          <br />
          But don&apos;t worry, you can still find your way back to
          civilization!
        </p>
        <div className="flex w-full max-w-xs flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-[hsl(142,100%,70%)] px-4 py-3 font-semibold text-black shadow transition hover:bg-[hsl(142,100%,80%)]"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/video-game-lots"
            className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-3 font-semibold text-white shadow transition hover:bg-white/30"
          >
            <Joystick className="h-5 w-5" />
            Video Game Lots
          </Link>
          <Link
            href="/quotes"
            className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-3 font-semibold text-white shadow transition hover:bg-white/30"
          >
            <Search className="h-5 w-5" />
            Quotes
          </Link>
          <Link
            href="/upc-lookup"
            className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-3 font-semibold text-white shadow transition hover:bg-white/30"
          >
            <QrCode className="h-5 w-5" />
            UPC Lookup
          </Link>
        </div>
      </div>
    </div>
  );
}
