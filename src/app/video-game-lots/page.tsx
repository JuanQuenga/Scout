"use client";

import Link from "next/link";
import { useState } from "react";

export interface GamePrice {
  title: string;
  platform: string;
  condition: string;
  price: number;
  imageUrl?: string;
  url: string;
}

export default function CreateVideoGameLot() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GamePrice[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItems, setSelectedItems] = useState<GamePrice[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/ebay?q=${encodeURIComponent(searchQuery)}`,
      );
      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? "Failed to fetch game prices");
      }
      const results = (await response.json()) as GamePrice[];
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to search game prices. Please try again.",
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addItemToLot = (item: GamePrice) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const removeItemFromLot = (url: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.url !== url));
  };

  const calculateAveragePrice = (): number => {
    if (selectedItems.length === 0) return 0;
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    return total / selectedItems.length;
  };

  const calculateRecommendedPrice = (): number => {
    const avgPrice = calculateAveragePrice();
    // Apply a 20% discount for lot pricing
    return avgPrice * 0.8;
  };

  return (
    <main className="flex flex-col items-center">
      <div className="container flex flex-col items-center gap-8 px-4 py-16">
        <div className="flex w-full max-w-4xl items-center justify-between">
          <h1 className="text-4xl font-bold">
            Create Video Game{" "}
            <span className="text-[hsl(142,100%,70%)]">Lot</span>
          </h1>
          <Link
            href="/video-game-lots"
            className="rounded-lg bg-white/10 px-4 py-2 text-white/70 transition-colors duration-200 hover:bg-white/20 hover:text-white"
          >
            ← Back
          </Link>
        </div>

        <div className="w-full max-w-4xl space-y-8">
          {/* Search Section */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Search Game Prices</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter game title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 rounded-lg bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-[hsl(142,100%,70%)] focus:outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="rounded-lg bg-[hsl(142,100%,70%)] px-6 py-2 font-semibold text-black transition-colors duration-200 hover:bg-[hsl(142,100%,80%)] disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-red-500/10 p-4 text-red-400">
                {error}
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                {searchResults.map((item) => (
                  <div
                    key={item.url}
                    className="flex items-center justify-between rounded-lg bg-white/5 p-4 transition-colors duration-200 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-16 w-16 rounded object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-white/70">
                          {item.platform} • {item.condition}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addItemToLot(item)}
                        className="rounded-lg bg-[hsl(142,100%,70%)] px-4 py-1 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[hsl(142,100%,80%)]"
                      >
                        Add to Lot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Lot Section */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Current Lot</h2>
            <div className="space-y-4">
              {selectedItems.map((item) => (
                <div
                  key={item.url}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-4"
                >
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-16 w-16 rounded object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-white/70">
                        {item.platform} • {item.condition}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItemFromLot(item.url)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {selectedItems.length === 0 && (
                <p className="text-center text-white/50">
                  No items added to lot yet
                </p>
              )}
            </div>
          </div>

          {/* Lot Summary */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Lot Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{selectedItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Price:</span>
                <span>${calculateAveragePrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Lot Price:</span>
                <span>${calculateRecommendedPrice().toFixed(2)}</span>
              </div>
            </div>
            <button
              disabled={selectedItems.length === 0}
              className="mt-6 w-full rounded-lg bg-[hsl(142,100%,70%)] px-6 py-3 font-semibold text-black transition-colors duration-200 hover:bg-[hsl(142,100%,80%)] disabled:opacity-50"
            >
              Create Lot
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
