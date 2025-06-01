"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface NavButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function NavButton({
  href,
  children,
  className = "",
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2 rounded-lg bg-white/20 px-4 py-3 text-white shadow transition-all duration-200 hover:scale-105 hover:bg-[hsl(142,100%,70%)] hover:text-black hover:shadow-lg ${className}`}
    >
      {children}
    </Link>
  );
}
