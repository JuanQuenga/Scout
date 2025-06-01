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

function floorTo5(num: number) {
  return Math.floor(num / 5) * 5;
}

const consoleQuotes = [
  // Microsoft
  {
    brand: "Microsoft",
    console: "Original Xbox",
    quote: "$15-25",
    sellPrice: "$51",
    complete: "$63",
  },
  {
    brand: "Microsoft",
    console: "Xbox 360 White",
    quote: "$5-15",
    sellPrice: "$25",
    complete: "$44",
  },
  {
    brand: "Microsoft",
    console: "Xbox 360 Elite (Black)",
    quote: "$10-30",
    sellPrice: "$31",
    complete: "$51",
  },
  {
    brand: "Microsoft",
    console: "Xbox 360 Slim 4GB (Black)",
    quote: "$10-30",
    sellPrice: "$35",
    complete: "$55",
  },
  {
    brand: "Microsoft",
    console: "Xbox 360 Slim 250GB (Black)",
    quote: "$10-30",
    sellPrice: "$37",
    complete: "$57",
  },
  {
    brand: "Microsoft",
    console: "Xbox 360 E 4GB (Black)",
    quote: "$10-30",
    sellPrice: "$35",
    complete: "$54",
  },
  {
    brand: "Microsoft",
    console: "Xbox 360 E 250GB (Black)",
    quote: "$10-30",
    sellPrice: "$37",
    complete: "$57",
  },
  {
    brand: "Microsoft",
    console: "Xbox One 500GB",
    quote: "$20-50",
    sellPrice: "$61",
    complete: "$82",
  },
  {
    brand: "Microsoft",
    console: "Xbox One 1TB",
    quote: "$45-65",
    sellPrice: "$115",
    complete: "$127",
  },
  {
    brand: "Microsoft",
    console: "Xbox One S 500GB",
    quote: "$30-50",
    sellPrice: "$85",
    complete: "$99",
  },
  {
    brand: "Microsoft",
    console: "Xbox One S 1TB",
    quote: "$45-65",
    sellPrice: "$87",
    complete: "$99",
  },
  {
    brand: "Microsoft",
    console: "Xbox One S 1TB All Digital",
    quote: "$30-50",
    sellPrice: "$85",
    complete: "$97",
  },
  {
    brand: "Microsoft",
    console: "Xbox Series S",
    quote: "$90-150",
    sellPrice: "$220",
    complete: "$220",
  },
  {
    brand: "Microsoft",
    console: "Xbox Series X Disc/Digital",
    quote: "$170-230/240",
    sellPrice: "$300",
    complete: "$330",
  },
  // Sony
  {
    brand: "Sony",
    console: "PS1",
    quote: "$10-15",
    sellPrice: "$31",
    complete: "$37",
  },
  {
    brand: "Sony",
    console: "PS2 Fat",
    quote: "$10-15",
    sellPrice: "$31",
    complete: "$68",
  },
  {
    brand: "Sony",
    console: "PS2 Slim",
    quote: "$15-25",
    sellPrice: "$59",
    complete: "$69",
  },
  {
    brand: "Sony",
    console: "PS3 Fat 40GB",
    quote: "$15-35",
    sellPrice: "$60",
    complete: "$68",
  },
  {
    brand: "Sony",
    console: "PS3 Fat 80GB",
    quote: "$15-35",
    sellPrice: "$60",
    complete: "$76",
  },
  {
    brand: "Sony",
    console: "PS3 Slim 120GB",
    quote: "$15-35",
    sellPrice: "$60",
    complete: "$69",
  },
  {
    brand: "Sony",
    console: "PS3 Slim 160GB",
    quote: "$15-35",
    sellPrice: "$60",
    complete: "$73",
  },
  {
    brand: "Sony",
    console: "PS3 Slim 250GB",
    quote: "$20-35",
    sellPrice: "$61",
    complete: "$89",
  },
  {
    brand: "Sony",
    console: "PS3 Slim 320GB",
    quote: "$20-35",
    sellPrice: "$61",
    complete: "$73",
  },
  {
    brand: "Sony",
    console: "PS3 Super Slim 250GB",
    quote: "$30-45",
    sellPrice: "$63",
    complete: "$91",
  },
  {
    brand: "Sony",
    console: "PS3 Super Slim 500GB",
    quote: "$30-45",
    sellPrice: "$63",
    complete: "$91",
  },
  {
    brand: "Sony",
    console: "PS4 Fat 500GB",
    quote: "$35-50",
    sellPrice: "$88",
    complete: "$100",
  },
  {
    brand: "Sony",
    console: "PS4 Fat 1TB",
    quote: "$25-45",
    sellPrice: "$80",
    complete: "$92",
  },
  {
    brand: "Sony",
    console: "PS4 Slim 500GB",
    quote: "$35-50",
    sellPrice: "$88",
    complete: "$101",
  },
  {
    brand: "Sony",
    console: "PS4 Slim 1TB",
    quote: "$35-50",
    sellPrice: "$88",
    complete: "$106",
  },
  {
    brand: "Sony",
    console: "PS4 Pro 1TB",
    quote: "$140-180",
    sellPrice: "$300",
    complete: "$320-340",
  },
  {
    brand: "Sony",
    console: "PS5",
    quote: "$180-240/250",
    sellPrice: "$320-340",
    complete: "$350-380",
  },
  {
    brand: "Sony",
    console: "PS5 Slim Digital-Disc",
    quote: "$180-240/250",
    sellPrice: "$320-340",
    complete: "$350-380",
  },
  {
    brand: "Sony",
    console: "PS5 Pro",
    quote: "$340-420",
    sellPrice: "$530",
    complete: "$580",
  },
  // Nintendo
  {
    brand: "Nintendo",
    console: "N64",
    quote: "$15-45",
    sellPrice: "$80",
    complete: "$120",
  },
  {
    brand: "Nintendo",
    console: "NES",
    quote: "$15-25",
    sellPrice: "$85",
    complete: "$120",
  },
  {
    brand: "Nintendo",
    console: "SNES",
    quote: "$15-25",
    sellPrice: "$80",
    complete: "$120",
  },
  {
    brand: "Nintendo",
    console: "Gamecube",
    quote: "$15-25",
    sellPrice: "$80",
    complete: "$120",
  },
  {
    brand: "Nintendo",
    console: "Gameboy (Original + Color)",
    quote: "$15-20",
    sellPrice: "$65",
    complete: "$65",
  },
  {
    brand: "Nintendo",
    console: "Gameboy Advance",
    quote: "$15-20",
    sellPrice: "$65",
    complete: "$95",
  },
  {
    brand: "Nintendo",
    console: "Gameboy Advance SP",
    quote: "$20-25",
    sellPrice: "$65",
    complete: "$95",
  },
  {
    brand: "Nintendo",
    console: "Nintendo Wii",
    quote: "$5-10",
    sellPrice: "$18",
    complete: "$24",
  },
  {
    brand: "Nintendo",
    console: "Nintendo Wii U Console",
    quote: "$15-40",
    sellPrice: "$42",
    complete: "$105",
  },
  {
    brand: "Nintendo",
    console: "Nintendo Switch v1/v2",
    quote: "$45-65",
    sellPrice: "$93",
    complete: "$128",
  },
  {
    brand: "Nintendo",
    console: "Nintendo Switch Lite",
    quote: "$40-55",
    sellPrice: "$98",
    complete: "$98",
  },
  {
    brand: "Nintendo",
    console: "Switch OLED",
    quote: "$75-100",
    sellPrice: "$200",
    complete: "$230",
  },
  // PC & Other
  {
    brand: "PC & Other",
    console: "Other/PC",
    quote: "-",
    sellPrice: "-",
    complete: "-",
  },
];

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

  // Calculate ranges based on the Google Sheet logic
  const averageRange = projection
    ? `$${floorTo5(projection * 0.45)} to $${floorTo5(projection * 0.55)}`
    : "-";
  const premiumRange = projection
    ? `$${floorTo5(projection * 0.55)} to $${floorTo5(projection * 0.65)}`
    : "-";
  const nicheRange = projection
    ? `$${floorTo5(projection * 0.3)} to $${floorTo5(projection * 0.4)}`
    : "-";
  const checkoutRange = projection
    ? `$${floorTo5(projection * 0.4)} to $${floorTo5(projection * 0.6)}`
    : "-";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] px-4 py-16 text-white">
      <div className="flex w-full max-w-6xl flex-col gap-8 rounded-xl bg-white/10 p-6 shadow-lg md:flex-row">
        <div className="flex w-full flex-col justify-start md:w-1/3">
          <div className="mb-6 rounded-xl bg-white/10 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-[hsl(142,100%,70%)]" />
              <h1 className="text-2xl font-bold">Quote Calculator</h1>
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
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-emerald-300" />
                <div>
                  <div className="font-semibold">Average Range</div>
                  <div className="text-lg">{averageRange}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <div>
                  <div className="font-semibold">Premium Range</div>
                  <div className="text-lg">{premiumRange}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-300" />
                <div>
                  <div className="font-semibold">Niche / Oversized Range</div>
                  <div className="text-lg">{nicheRange}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-pink-300" />
                <div>
                  <div className="font-semibold">Checkout Range</div>
                  <div className="text-lg">{checkoutRange}</div>
                </div>
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
                      Sell Price (Console Only)
                    </th>
                    <th className="px-3 py-2 font-semibold text-white/70">
                      Sell Price (Complete)
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
