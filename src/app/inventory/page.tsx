"use client"; // Needs to be a client component for date calculations or if we add interactivity

import {
  mockInventoryItems,
  type InventoryItem,
} from "../../data/mockInventoryItems";
import {
  PackageSearch,
  Clock,
  CheckCircle2,
  ListOrdered,
  DollarSign,
  CalendarDays,
  Tag,
} from "lucide-react";
import React, { useMemo } from "react";

// Helper function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper function to check if item is ready for processing (3 full days passed)
const isItemReady = (purchaseDateString: string): boolean => {
  const purchaseDate = new Date(purchaseDateString);
  const threeDaysAfterPurchase = new Date(purchaseDate);
  threeDaysAfterPurchase.setDate(purchaseDate.getDate() + 3);

  const today = new Date();
  // Set today to midnight to compare dates accurately
  today.setHours(0, 0, 0, 0);
  // Set threeDaysAfterPurchase to midnight as well
  threeDaysAfterPurchase.setHours(0, 0, 0, 0);

  return today.getTime() >= threeDaysAfterPurchase.getTime();
};

export default function InventoryPage() {
  const sortedInventory = useMemo(() => {
    return [...mockInventoryItems].sort(
      (a, b) =>
        new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime(),
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <PackageSearch className="h-8 w-8 text-[hsl(142,100%,70%)]" />
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Current Inventory
          </h1>
        </div>
        <p className="text-sm text-white/80">
          Items are on a 3-day hold from their purchase date before they can be
          processed.
        </p>
      </header>

      <div className="overflow-x-auto rounded-xl bg-white/5 shadow-lg">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap sm:px-6">
                Item Name
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap sm:px-6">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap sm:px-6">
                Purchase Date
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap sm:px-6">
                Cost
              </th>
              <th className="px-4 py-3 text-left font-semibold whitespace-nowrap sm:px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {sortedInventory.map((item) => {
              const ready = isItemReady(item.purchaseDate);
              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-white/10"
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap text-white/90 sm:px-6">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/70 sm:px-6">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/70 sm:px-6">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-white/50" />
                      {formatDate(item.purchaseDate)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/70 sm:px-6">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-white/50" />
                      {item.cost.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap sm:px-6">
                    {ready ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/20 px-2.5 py-1 text-xs font-semibold text-green-300">
                        <CheckCircle2 className="h-4 w-4" />
                        Ready for Processing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/20 px-2.5 py-1 text-xs font-semibold text-yellow-300">
                        <Clock className="h-4 w-4" />
                        On Hold
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            {sortedInventory.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-white/60">
                  No items currently in inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
