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

// Helper to format date string to 'Day, Month DDth' format
const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Get ordinal suffix for the day (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);

  return date
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
    .replace(/\d+/, day + ordinalSuffix);
};

const getRowColorByDays = (days: number) => {
  if (days === 0) return "bg-red-200";
  if (days === 1) return "bg-red-100";
  if (days === 2) return "bg-red-50";
  if (days >= 3 && days < 5) return "bg-green-100";
  if (days >= 5) return "bg-yellow-100";
  return "bg-white";
};

export default function InventoryPage() {
  const inventory = [...mockInventoryData].sort(
    (a, b) => a.orderNumber - b.orderNumber,
  );

  const rollOffTomorrowCount = inventory.filter(
    (item) => daysSince(item.purchaseDate) === 2,
  ).length;
  const inQueueThreePlusDaysCount = inventory.filter(
    (item) => daysSince(item.purchaseDate) >= 3,
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Current Inventory
        </h1>
        <div className="flex space-x-4">
          <div className="rounded-lg bg-black/20 px-6 py-4 text-center">
            <p className="text-sm font-medium text-gray-300">
              Rolls Off Tomorrow
            </p>
            <p className="text-3xl font-bold text-white">
              {rollOffTomorrowCount}
            </p>
          </div>
          <div className="rounded-lg bg-black/20 px-6 py-4 text-center">
            <p className="text-sm font-medium text-gray-300">
              Left In Queue Today
            </p>
            <p className="text-3xl font-bold text-white">
              {inQueueThreePlusDaysCount}
            </p>
          </div>
        </div>
      </header>
      <div className="overflow-x-auto rounded-xl bg-gray-100 shadow-lg">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-200 text-gray-600">
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
          <tbody className="divide-y divide-gray-200">
            {inventory.map((item) => {
              const daysInInventory = daysSince(item.purchaseDate);
              const location = daysInInventory > 3 ? "" : item.location;
              const rowColor = getRowColorByDays(daysInInventory);

              return (
                <tr
                  key={item.orderNumber}
                  className={`transition-colors ${rowColor}`}
                >
                  <td className="px-4 py-3 font-mono text-gray-600">
                    {item.orderNumber}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="rounded-full p-1.5 hover:bg-black/10"
                      title={`Customer: ${item.customer.firstName} ${item.customer.lastName}\nContact: ${item.customer.contact ?? "N/A"}`}
                    >
                      <User className="h-4 w-4" />
                    </button>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.device.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatDisplayDate(item.purchaseDate)}
                  </td>
                  <td
                    className={`px-4 py-3 text-gray-600 ${
                      daysInInventory === 6 ? "font-bold text-red-600" : ""
                    }`}
                  >
                    {daysInInventory}
                  </td>
                  <td className="px-4 py-3 text-emerald-600">
                    ${item.purchaseAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-yellow-600">
                    ${item.estimatedSellPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{`${item.employee.firstName} ${item.employee.lastName}`}</td>
                  <td className="px-4 py-3 font-mono text-cyan-600">
                    {location}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
