"use client";

import { useState, useMemo } from "react";
import {
  Search,
  DollarSign,
  CalendarDays,
  CheckSquare,
  Square,
} from "lucide-react";
import {
  mockEbaySoldItems,
  type MockEbaySoldItem,
} from "../../data/mockEbaySoldItems";

// Helper to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MockEbaySoldItem[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    setSelectedItems(new Set()); // Clear selections on new search
    setTimeout(() => {
      // Filter mock data based on query (simple title match)
      const filteredResults = query
        ? mockEbaySoldItems.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          )
        : mockEbaySoldItems; // Show all if query is empty for demo
      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      const newSelection = new Set(prevSelected);
      if (newSelection.has(itemId)) {
        newSelection.delete(itemId);
      } else {
        newSelection.add(itemId);
      }
      return newSelection;
    });
  };

  const averageSoldPrice = useMemo(() => {
    if (selectedItems.size === 0) return null;
    let total = 0;
    results.forEach((item) => {
      if (selectedItems.has(item.id)) {
        total += parseFloat(item.price.replace("$", ""));
      }
    });
    return (total / selectedItems.size).toFixed(2);
  }, [selectedItems, results]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] px-4 py-8 text-white sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-center text-3xl font-bold text-[hsl(142,100%,70%)] sm:text-4xl">
          eBay Sold Listings Insights
        </h1>
      </header>

      <div className="flex flex-1 flex-col gap-8 md:flex-row">
        {/* Left Column: Search and Filters */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="sticky top-24 rounded-xl bg-white/5 p-4 shadow-lg sm:p-6">
            <h2 className="mb-4 text-xl font-semibold">Search & Analyze</h2>
            <form onSubmit={handleSearch} className="mb-6 space-y-4">
              <div>
                <label
                  htmlFor="device-search"
                  className="mb-1 block text-sm font-medium text-white/80"
                >
                  Device Name
                </label>
                <div className="flex gap-2">
                  <input
                    id="device-search"
                    type="text"
                    className="w-full rounded-lg bg-white/20 px-3 py-2.5 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-[hsl(142,100%,70%)] focus:outline-none"
                    placeholder="e.g., iPhone 14 Pro"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[hsl(142,100%,70%)] px-4 py-2.5 text-sm font-semibold text-black shadow transition hover:bg-[hsl(142,100%,80%)] disabled:opacity-50"
                    disabled={loading || !query.trim()}
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </div>
            </form>

            {selectedItems.size > 0 && (
              <div className="mt-6 rounded-lg bg-white/10 p-4">
                <h3 className="mb-2 text-lg font-semibold text-white/90">
                  Selection Average
                </h3>
                {averageSoldPrice !== null && (
                  <div className="text-2xl font-bold text-[hsl(142,100%,70%)]">
                    ${averageSoldPrice}
                  </div>
                )}
                <p className="text-xs text-white/60">
                  Average sold price of {selectedItems.size} selected item(s).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="flex-1 md:w-2/3 lg:w-3/4">
          {loading && (
            <div className="flex h-64 items-center justify-center text-lg text-white/80">
              Loading results...
            </div>
          )}
          {!loading && searched && results.length === 0 && (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white/5 p-6 text-center text-white/70 shadow-lg">
              No results found for "{query}". Try a different search term.
            </div>
          )}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item) => (
                <div
                  key={item.id}
                  className={`relative cursor-pointer rounded-xl bg-white/5 p-4 shadow-lg transition-all hover:bg-white/10 ${selectedItems.has(item.id) ? "ring-2 ring-[hsl(142,100%,70%)]" : "ring-1 ring-transparent"}`}
                  onClick={() => toggleItemSelection(item.id)}
                >
                  <div className="absolute top-3 right-3">
                    {selectedItems.has(item.id) ? (
                      <CheckSquare className="h-5 w-5 text-[hsl(142,100%,70%)]" />
                    ) : (
                      <Square className="h-5 w-5 text-white/40" />
                    )}
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-3 h-40 w-full rounded-lg bg-white/10 object-cover shadow"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/150x150?text=No+Image")
                    }
                  />
                  <h3 className="mb-1.5 leading-tight font-semibold text-white/90 group-hover:text-white">
                    {item.title}
                  </h3>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xl font-bold text-[hsl(142,100%,70%)]">
                      {item.price}
                    </p>
                  </div>
                  <div className="flex items-center text-xs text-white/60">
                    <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                    <span>Sold: {formatDate(item.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && !searched && (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white/5 p-6 text-center text-white/70 shadow-lg">
              Enter a device name above and click Search to see eBay sold
              listings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
