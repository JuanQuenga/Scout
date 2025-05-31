import Link from "next/link";

export default function CreateVideoGameLot() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] text-white">
      <div className="container flex flex-col items-center gap-8 px-4 py-16">
        <div className="flex w-full max-w-4xl items-center justify-between">
          <h1 className="text-4xl font-bold">
            Create Video Game{" "}
            <span className="text-[hsl(142,100%,70%)]">Lot</span>
          </h1>
          <Link
            href="/lots/video-games"
            className="rounded-lg bg-white/10 px-4 py-2 text-white/70 transition-colors duration-200 hover:bg-white/20 hover:text-white"
          >
            ← Back
          </Link>
        </div>

        <div className="w-full max-w-4xl space-y-8">
          {/* Search Section */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Search Games</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter game title..."
                className="flex-1 rounded-lg bg-white/5 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-[hsl(142,100%,70%)] focus:outline-none"
              />
              <button className="rounded-lg bg-[hsl(142,100%,70%)] px-6 py-2 font-semibold text-black transition-colors duration-200 hover:bg-[hsl(142,100%,80%)]">
                Search
              </button>
            </div>
          </div>

          {/* Current Lot Section */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Current Lot</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
                <div>
                  <h3 className="font-semibold">Example Game Title</h3>
                  <p className="text-sm text-white/70">Platform • Condition</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">$XX.XX</span>
                  <button className="text-red-400 hover:text-red-300">
                    Remove
                  </button>
                </div>
              </div>
              {/* Add more game items here */}
            </div>
          </div>

          {/* Lot Summary */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Lot Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Games:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Value:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Lot Price:</span>
                <span>$0.00</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-[hsl(142,100%,70%)] px-6 py-3 font-semibold text-black transition-colors duration-200 hover:bg-[hsl(142,100%,80%)]">
              Create Lot
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
