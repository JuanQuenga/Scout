"use client";

import Link from "next/link";
import { QrCode, Construction, Home, Joystick, Search } from "lucide-react"; // Changed primary icon

export default function UpcLookupComingSoonPage() {
  // Renamed component
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] px-4 py-16 text-white">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-white/10 px-6 py-8 text-center shadow-lg sm:p-10">
        <Construction className="mb-2 h-16 w-16 text-white/70" />
        <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(142,100%,70%)]">
          UPC Lookup
        </h1>
        <h2 className="text-3xl font-bold">Coming Soon!</h2>
        <p className="max-w-md text-lg text-white/80">
          Our UPC Lookup tool is under development. Soon you&apos;ll be able to
          quickly find product information by scanning or entering a UPC. Check
          back later!
        </p>
        <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-lg bg-[hsl(142,100%,70%)] px-4 py-3 font-semibold text-black shadow transition hover:bg-[hsl(142,100%,80%)]"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
          <Link
            href="/quotes"
            className="flex items-center justify-center gap-2 rounded-lg bg-white/20 px-4 py-3 font-semibold text-white shadow transition hover:bg-white/30"
          >
            <Search className="h-5 w-5" />
            Check Quotes
          </Link>
        </div>
      </div>
    </div>
  );
}
