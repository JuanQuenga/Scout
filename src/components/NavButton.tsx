"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface NavButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export default function NavButton({
  href,
  children,
  className = "",
  size = "md",
}: NavButtonProps) {
  const sizeClasses =
    size === "sm" ? "px-2 py-1 text-sm gap-1" : "px-4 py-3 text-base gap-2";

  return (
    <Link
      href={href}
      className={`group flex items-center rounded-lg bg-white/20 text-white shadow transition-all duration-200 hover:scale-105 hover:bg-[hsl(142,100%,70%)] hover:text-black hover:shadow-lg ${sizeClasses} ${className}`}
    >
      {children}
    </Link>
  );
}
