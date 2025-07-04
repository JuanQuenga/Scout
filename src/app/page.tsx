import Link from "next/link";
import { Joystick, DollarSign, Search, QrCode } from "lucide-react";
import NavButton from "../components/NavButton";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1a472a] to-[#0a0a0a] px-2 pt-4 pb-8 text-white sm:px-4 sm:pt-8 sm:pb-16">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Welcome to{" "}
          <span className="cookie text-[8rem] text-[hsl(142,100%,70%)]">
            Scout
          </span>
          , your new POS.{" "}
        </h1>
        <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-4">
          <NavButton href="/video-game-lots">
            <Joystick className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              Video Game Lots
            </span>
          </NavButton>
          <NavButton href="/quotes">
            <DollarSign className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              Quotes
            </span>
          </NavButton>
          <NavButton href="/spec-finder">
            <Search className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              Insights
            </span>
          </NavButton>
          <NavButton href="/upc-lookup">
            <QrCode className="h-5 w-5 transition-colors duration-200 group-hover:text-black" />
            <span className="font-semibold transition-colors duration-200 group-hover:text-black">
              UPC Lookup
            </span>
          </NavButton>
        </div>
      </div>
    </main>
  );
}
