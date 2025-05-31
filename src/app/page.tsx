import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Welcome{" "}
          <span className="cookie text-[8rem] text-[hsl(142,100%,70%)]">
            Scout
          </span>
          , your new <span className="text-[hsl(142,100%,70%)]">AI</span> Lister
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/20 p-8 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-200 hover:scale-105 hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            href="/lots/video-games"
          >
            <h3 className="text-3xl font-bold">Video Game Lots</h3>
            <div className="text-xl">
              See how Scout helps streamline doing video game lots.
            </div>
          </Link>
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-8 text-white hover:bg-white/20"
            href="https://github.com/JuanQuenga/Scout"
            target="_blank"
          >
            <h3 className="text-3xl font-bold">GitHub →</h3>
            <div className="text-xl">
              Scout is open source, so you can see how it works.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
