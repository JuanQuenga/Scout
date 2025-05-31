const PRICECHARTING_API_URL = "https://www.pricecharting.com/api";
const API_TOKEN = process.env.PRICECHARTING_API_TOKEN;

export interface GameSearchResult {
  status: "success" | "error";
  id: string;
  "product-name": string;
  "console-name": string;
  "loose-price": number;
  "complete-price": number;
  "new-price": number;
  "graded-price": number;
  "box-only-price": number;
  "manual-only-price": number;
  "product-type": string;
  "genre-name": string;
  "release-date": string;
  "image-url": string;
}

export interface SearchResponse {
  status: "success" | "error";
  products: GameSearchResult[];
}

export async function searchGames(query: string): Promise<GameSearchResult[]> {
  if (!API_TOKEN) {
    throw new Error("PriceCharting API token not configured");
  }

  const response = await fetch(
    `${PRICECHARTING_API_URL}/products?t=${API_TOKEN}&q=${encodeURIComponent(query)}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }

  const data = (await response.json()) as SearchResponse;

  if (data.status === "error") {
    throw new Error("API returned an error");
  }

  return data.products || [];
}

export async function getGameDetails(
  gameId: string,
): Promise<GameSearchResult> {
  if (!API_TOKEN) {
    throw new Error("PriceCharting API token not configured");
  }

  const response = await fetch(
    `${PRICECHARTING_API_URL}/product?t=${API_TOKEN}&id=${gameId}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }

  const data = (await response.json()) as GameSearchResult;

  if (data.status === "error") {
    throw new Error("API returned an error");
  }

  return data;
}

// Helper function to get console ID from name
export function getConsoleId(consoleName: string): string {
  const consoleMap: Record<string, string> = {
    "Nintendo NES": "G6",
    "Super Nintendo": "G13",
    "Nintendo 64": "G8",
    Gamecube: "G7",
    Wii: "G11",
    "Wii U": "G47",
    Switch: "G87",
    GameBoy: "G73",
    "GameBoy Color": "G77",
    "GameBoy Advance": "G80",
    "Nintendo DS": "G78",
    "Nintendo 3DS": "G94",
    PlayStation: "G6",
    "PlayStation 2": "G7",
    "PlayStation 3": "G12",
    "PlayStation 4": "G53",
    "PlayStation 5": "G7468",
    PSP: "G9",
    "PlayStation Vita": "G43",
    Xbox: "G8",
    "Xbox 360": "G10",
    "Xbox One": "G54",
    "Xbox Series X": "G7585",
  };

  return consoleMap[consoleName] ?? "";
}
