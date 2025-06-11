"use client";

import { mockInventoryData } from "../../data/inventory";
import {
  User,
  CalendarDays,
  Hash,
  Coins,
  Search,
  DollarSign,
  MapPin,
  Pencil,
} from "lucide-react";
import React from "react";

// Manual date difference calculation
const daysSince = (dateString: string): number => {
  const purchaseDate = new Date(dateString);
  const today = new Date();
  // Reset time part to compare dates only
  purchaseDate.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);
  const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper to format date string 'yyyy-MM-dd' to 'Mon Day, Year'
const formatDisplayDate = (dateString: string): string => {
  const [yearStr, monthStr, dayStr] = dateString.split("-");

  if (!yearStr || !monthStr || !dayStr) {
    return dateString; // Return original string if format is incomplete
  }

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Basic validation for NaN
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return dateString;
  }

  // Note: month is 0-indexed in JS Date, so month - 1
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

// Status to row color mapping
const statusColors: Record<string, string> = {
  "In Stock": "bg-sky-600/10 hover:bg-sky-600/20",
  Processing: "bg-yellow-500/10 hover:bg-yellow-500/20",
  Listed: "bg-green-500/10 hover:bg-green-500/20",
  Sold: "bg-purple-500/10 hover:bg-purple-500/20",
  "For Parts": "bg-red-500/10 hover:bg-red-500/20",
};

export default function InventoryPage() {
  const inventory = [...mockInventoryData].sort(
    (a, b) => a.orderNumber - b.orderNumber,
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Inventory Dashboard
        </h1>
      </header>
      <div className="overflow-x-auto rounded-xl bg-white/5 shadow-lg">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Order #</th>
              <th className="px-4 py-3 text-left font-semibold">Customer</th>
              <th className="px-4 py-3 text-left font-semibold">Device</th>
              <th className="px-4 py-3 text-left font-semibold">
                Purchase Date
              </th>
              <th className="px-4 py-3 text-left font-semibold">Days</th>
              <th className="px-4 py-3 text-left font-semibold">
                Purchase Amt
              </th>
              <th className="px-4 py-3 text-left font-semibold">Sell Price</th>
              <th className="px-4 py-3 text-left font-semibold">Employee</th>
              <th className="px-4 py-3 text-left font-semibold">Location</th>
              <th className="px-4 py-3 text-left font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {inventory.map((item) => {
              const daysInInventory = daysSince(item.purchaseDate);
              const location = daysInInventory > 3 ? "" : item.location;
              const rowColor = statusColors[item.status] ?? "hover:bg-white/10";

              return (
                <tr
                  key={item.orderNumber}
                  className={`transition-colors ${rowColor}`}
                >
                  <td className="px-4 py-3 font-mono text-white/70">
                    {item.orderNumber}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="rounded-full p-1.5 hover:bg-white/20"
                      title={`Customer: ${item.customer.name}\nContact: ${item.customer.contact ?? "N/A"}`}
                    >
                      <User className="h-4 w-4" />
                    </button>
                  </td>
                  <td className="px-4 py-3 font-medium text-white/90">
                    {item.device.name}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {formatDisplayDate(item.purchaseDate)}
                  </td>
                  <td
                    className={`px-4 py-3 text-white/70 ${
                      daysInInventory === 6 ? "font-bold text-red-500" : ""
                    }`}
                  >
                    {daysInInventory}
                  </td>
                  <td className="px-4 py-3 text-emerald-300">
                    ${item.purchaseAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-yellow-300">
                    ${item.estimatedSellPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-white/70">{item.employee}</td>
                  <td className="px-4 py-3 font-mono text-cyan-300">
                    {location}
                  </td>
                  <td className="px-4 py-3 text-white/70">{item.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
