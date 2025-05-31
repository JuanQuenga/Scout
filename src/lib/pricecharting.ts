const PRICECHARTING_API_URL = "https://www.pricecharting.com/api";
const API_TOKEN = process.env.PRICECHARTING_API_TOKEN;

export interface GameSearchResult {
  id: string;
  "product-name": string;
  "console-name": string;
  "loose-price": number;
  "complete-price": number;
  "new-price": number;
  "graded-price": number;
  "box-only-price": number;
  "manual-only-price": number;
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

  const data = await response.json();
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

  return response.json();
}
