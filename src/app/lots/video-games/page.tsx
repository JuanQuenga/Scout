import Link from "next/link";

export default function VideoGamesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Video Game <span className="text-[hsl(142,100%,70%)]">Lots</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12">
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/20 p-8 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-200 hover:scale-105 hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            href="/lots/video-games/create"
          >
            <h3 className="text-3xl font-bold">Create New Lot →</h3>
            <div className="text-xl">
              Start creating a new video game lot with Scout&apos;s AI
              assistance.
            </div>
          </Link>

          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/20 p-8 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-200 hover:scale-105 hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            href="/lots/video-games/browse"
          >
            <h3 className="text-3xl font-bold">Browse Lots →</h3>
            <div className="text-xl">
              View and manage your existing video game lots.
            </div>
          </Link>
        </div>

        <Link
          className="mt-8 text-xl text-white/70 transition-colors duration-200 hover:text-white"
          href="/"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
