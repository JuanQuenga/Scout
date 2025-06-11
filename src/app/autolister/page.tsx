"use client";

import { useState } from "react";
import {
  Smartphone,
  Laptop,
  Gamepad2,
  Package,
  Search,
  ChevronDown,
  Camera,
  Headphones,
  DiscAlbum,
} from "lucide-react";

// Mock inventory data - in a real app, this would be fetched from a database
const mockInventory = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    condition: "Used - Good",
    quantity: 1,
    sku: "IP15P-256-BLK",
  },
  {
    id: "2",
    name: "PlayStation 5 Disc",
    condition: "Used - Like New",
    quantity: 2,
    sku: "PS5D-WHT-001",
  },
  {
    id: "3",
    name: 'MacBook Pro 14" M3',
    condition: "Open Box",
    quantity: 1,
    sku: "MBP14-M3-512",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    condition: "Used - Acceptable",
    quantity: 3,
    sku: "SN-XM5-BLK",
  },
];

const deviceCategories = {
  phones: {
    name: "Smartphones",
    icon: Smartphone,
    fields: ["Brand", "Model", "Storage", "Color", "Carrier", "IMEI"],
  },
  laptops: {
    name: "Laptops",
    icon: Laptop,
    fields: ["Brand", "Model", "Processor", "RAM", "Storage", "Screen Size"],
  },
  consoles: {
    name: "Gaming Consoles",
    icon: Gamepad2,
    fields: ["Brand", "Model", "Storage", "Edition (Disc/Digital)"],
  },
  cameras: {
    name: "Cameras",
    icon: Camera,
    fields: ["Brand", "Model", "Type (DSLR/Mirrorless)", "Megapixels"],
  },
  headphones: {
    name: "Headphones",
    icon: Headphones,
    fields: ["Brand", "Model", "Type (Over-ear/In-ear)", "Connectivity"],
  },
  media: {
    name: "Physical Media",
    icon: DiscAlbum,
    fields: ["Title", "Artist/Studio", "Format (Blu-ray/DVD/CD)", "Edition"],
  },
};

type CategoryKey = keyof typeof deviceCategories;

export default function AutoListerPage() {
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<
    (typeof mockInventory)[0] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("phones");
  const [listingDetails, setListingDetails] = useState<Record<string, string>>(
    {},
  );

  const handleInputChange = (field: string, value: string) => {
    setListingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectInventory = (item: (typeof mockInventory)[0]) => {
    setSelectedInventoryItem(item);
    // Pre-fill logic would go here. For now, we'll just set a title.
    setListingDetails({ Title: `Listing for ${item.name}` });
  };

  const currentFields = deviceCategories[selectedCategory].fields;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] p-4 text-white sm:p-6 md:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight">
          eBay Auto Lister
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Side: Inventory Selection */}
          <div className="rounded-xl bg-white/10 p-6 shadow-lg">
            <h2 className="mb-4 flex items-center text-2xl font-semibold">
              <Package className="mr-3 text-emerald-300" />
              List from Inventory
            </h2>
            <div className="relative mb-4">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full rounded-lg bg-white/20 py-2 pr-4 pl-10 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
            <div className="max-h-96 space-y-3 overflow-y-auto">
              {mockInventory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectInventory(item)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors duration-200 ${selectedInventoryItem?.id === item.id ? "bg-emerald-500/80" : "bg-white/5 hover:bg-white/20"}`}
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-white/70">
                      {item.condition} - SKU: {item.sku}
                    </p>
                  </div>
                  <span className="rounded bg-black/20 px-2 py-1 font-mono text-sm">
                    Qty: {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Listing Details */}
          <div className="rounded-xl bg-white/10 p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Listing Details</h2>

            {/* Category Selector */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Device Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as CategoryKey)
                  }
                  className="w-full appearance-none rounded-lg bg-white/20 px-4 py-2.5 pr-10 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  {Object.entries(deviceCategories).map(([key, { name }]) => (
                    <option key={key} value={key} className="bg-slate-800">
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-white/60" />
              </div>
            </div>

            {/* Dynamic Form Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentFields.map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    value={listingDetails[field] ?? ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full rounded-lg bg-white/20 px-4 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    placeholder={`Enter ${field}...`}
                  />
                </div>
              ))}

              {/* Condition Dropdown - A more complex field */}
              <div>
                <label
                  htmlFor="condition"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Condition
                </label>
                <select
                  id="condition"
                  value={listingDetails.Condition ?? "Used"}
                  onChange={(e) =>
                    handleInputChange("Condition", e.target.value)
                  }
                  className="w-full appearance-none rounded-lg bg-white/20 px-4 py-2.5 pr-10 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  <option className="bg-slate-800">New</option>
                  <option className="bg-slate-800">Open Box</option>
                  <option className="bg-slate-800">Used - Like New</option>
                  <option className="bg-slate-800">Used - Good</option>
                  <option className="bg-slate-800">Used - Acceptable</option>
                  <option className="bg-slate-800">
                    For Parts/Not Working
                  </option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-white/60" />
              </div>
            </div>

            <button className="mt-8 w-full rounded-lg bg-emerald-600 px-4 py-3 font-bold text-white transition-colors duration-200 hover:bg-emerald-700">
              Generate eBay Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
