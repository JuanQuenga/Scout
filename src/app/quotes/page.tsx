"use client";

import { useState } from "react";
import {
  Monitor,
  Disc,
  Gamepad2,
  Laptop,
  Info,
  Calendar,
  Calculator,
  BarChart2,
  Star,
  Package,
  ShoppingCart,
} from "lucide-react";
import {
  getAverageRange,
  getPremiumRange,
  getNicheRange,
  getCheckoutRange,
} from "../../lib/quoteMath";
import { consoleQuotes } from "../../data/consoleQuotes";

const brandSections = [
  {
    name: "Microsoft",
    icon: <Monitor className="mr-2 inline-block h-5 w-5 text-[#107C10]" />,
  },
  {
    name: "Sony",
    icon: <Disc className="mr-2 inline-block h-5 w-5 text-blue-400" />,
  },
  {
    name: "Nintendo",
    icon: <Gamepad2 className="mr-2 inline-block h-5 w-5 text-red-500" />,
  },
  {
    name: "PC & Other",
    icon: <Laptop className="mr-2 inline-block h-5 w-5 text-gray-300" />,
  },
];

const previousQuotes = [
  {
    date: "5/30/2025",
    device: "iPhone 15 Plus",
    value: "$500",
    range: "$225 - $325",
  },
  {
    date: "5/29/2025",
    device: "PS5 Slim Disc",
    value: "$350",
    range: "$175 - $210",
  },
  {
    date: "5/29/2025",
    device: "Gaming PC",
    value: "$1,160",
    range: "$600 - $750",
  },
  {
    date: "5/30/2025",
    device: "NEW PS5 Slim Disc",
    value: "$430",
    range: "$210 - $250",
  },
];

export default function QuotesPage() {
  const [projection, setProjection] = useState(0);
  const [input, setInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [showCalculatorInfo, setShowCalculatorInfo] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>(null);

  // Calculate ranges based on the Google Sheet logic
  const averageRange = projection ? getAverageRange(projection) : "-";
  const premiumRange = projection ? getPremiumRange(projection) : "-";
  const nicheRange = projection ? getNicheRange(projection) : "-";
  const checkoutRange = projection ? getCheckoutRange(projection) : "-";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] px-4 py-16 text-white">
      <div className="flex w-full max-w-7xl flex-col gap-4 rounded-xl bg-white/10 p-6 shadow-lg md:flex-row">
        <div className="flex w-full flex-col justify-start md:w-1/3">
          <div className="mb-6 rounded-xl bg-white/10 p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calculator className="h-6 w-6 text-[hsl(142,100%,70%)]" />
                <h1 className="text-2xl font-bold">Quote Calculator</h1>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Info about calculator ranges"
                  className="flex cursor-pointer items-center justify-center rounded-full bg-white/10 p-1.5 hover:bg-white/20"
                  onClick={() => setShowCalculatorInfo((prev) => !prev)}
                >
                  <Info className="h-5 w-5 text-white/80" />
                </button>
                {showCalculatorInfo && (
                  <div className="absolute top-full right-0 z-20 mt-2 w-80 rounded-lg bg-slate-800 p-4 text-sm text-white shadow-xl">
                    <h3 className="mb-2 text-base font-semibold text-[hsl(142,100%,70%)]">
                      Range Explanations:
                    </h3>
                    <div className="mb-2 space-y-0.5">
                      <p className="font-medium text-white/90">
                        Average Range:
                      </p>
                      <p className="text-xs text-white/70">
                        Typical offer for most items (45-55% of projection,
                        floored to $5).
                      </p>
                    </div>
                    <div className="mb-2 space-y-0.5">
                      <p className="font-medium text-white/90">
                        Premium Range:
                      </p>
                      <p className="text-xs text-white/70">
                        For high-demand/premium items (55-65% of projection,
                        floored to $5).
                      </p>
                    </div>
                    <div className="mb-2 space-y-0.5">
                      <p className="font-medium text-white/90">
                        Niche / Oversized Range:
                      </p>
                      <p className="text-xs text-white/70">
                        For niche, oversized, or harder-to-sell items (30-40% of
                        projection, floored to $5).
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-medium text-white/90">
                        Checkout Range:
                      </p>
                      <p className="text-xs text-white/70">
                        For items to move quickly or at checkout (40-60% of
                        projection, floored to $5).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <label className="mb-2 block font-medium">
              Projected Resale Value ($)
            </label>
            <input
              type="number"
              min={0}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setProjection(Number(e.target.value));
              }}
              className="mb-6 w-full rounded-lg bg-white/20 px-4 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-[hsl(142,100%,70%)] focus:outline-none"
              placeholder="Enter projected resale value"
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <BarChart2 className="h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="font-semibold">Average Range</span>
                </div>
                <div className="text-lg font-medium">{averageRange}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 shrink-0 text-yellow-300" />
                  <span className="font-semibold">Premium Range</span>
                </div>
                <div className="text-lg font-medium">{premiumRange}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Package className="h-5 w-5 shrink-0 text-blue-300" />
                  <span className="font-semibold">Niche / Oversized Range</span>
                </div>
                <div className="text-lg font-medium">{nicheRange}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShoppingCart className="h-5 w-5 shrink-0 text-pink-300" />
                  <span className="font-semibold">Checkout Range</span>
                </div>
                <div className="text-lg font-medium">{checkoutRange}</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-white/80">
                Previous Quotes
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {previousQuotes.map((q, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 rounded-lg bg-white/10 px-4 py-3 shadow-sm transition hover:bg-white/20"
                >
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{q.date}</span>
                    <span className="font-semibold text-white/90">
                      {q.device}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-4">
                    <span className="font-bold text-emerald-300">
                      {q.value}
                    </span>
                    <span className="text-white/80">{q.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-2 hidden w-px bg-white/20 md:block" />
        <div className="w-full md:w-2/3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-center text-2xl font-bold md:text-left">
              Console Quotes Reference
            </h2>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm">
                <Calendar className="h-4 w-4 text-white/60" />
                Last Updated: <span className="text-white">5/30</span>
              </span>
              <button
                type="button"
                aria-label="Why were prices updated?"
                className="relative flex cursor-pointer items-center justify-center rounded-full bg-white/10 p-1 hover:bg-white/20"
                onClick={() => setShowInfo((v) => !v)}
              >
                <Info className="h-4 w-4 text-white/80" />
                {showInfo && (
                  <span className="absolute top-full right-0 z-10 mt-2 w-64 rounded bg-black/90 px-4 py-2 text-xs text-white shadow-lg">
                    Prices were updated to reflect current market trends and
                    recent sales data. This ensures your quotes are as accurate
                    as possible.
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="space-y-8">
            {brandSections.map((section) => (
              <table
                key={section.name}
                className="min-w-full overflow-hidden rounded-xl bg-white/5 text-left text-white shadow-lg"
              >
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-3 py-2 font-semibold text-white/90">
                      {section.icon}
                      {section.name}
                    </th>
                    <th className="px-3 py-2 font-semibold text-white/70">
                      Quote
                    </th>
                    <th className="px-3 py-2 font-semibold text-white/70">
                      <div className="flex flex-col items-start">
                        <span>Sell Price</span>
                        <span className="text-xs font-normal text-white/50">
                          (Console Only)
                        </span>
                      </div>
                    </th>
                    <th className="px-3 py-2 font-semibold text-white/70">
                      <div className="flex flex-col items-start">
                        <span>Sell Price</span>
                        <span className="text-xs font-normal text-white/50">
                          (Complete)
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {consoleQuotes
                    .filter((row) => row.brand === section.name)
                    .map((row, i) => (
                      <tr
                        key={row.console}
                        className="border-b border-white/10 odd:bg-white/10 even:bg-white/5 hover:bg-white/20"
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.console}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.quote}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.sellPrice}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {row.complete}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
