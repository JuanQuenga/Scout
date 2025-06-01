import axios from "axios";
import * as cheerio from "cheerio";

export interface GamePrice {
  title: string;
  platform: string;
  condition: string;
  price: number;
  imageUrl?: string;
  url: string;
}

export async function searchGamePrices(query: string): Promise<GamePrice[]> {
  try {
    const url = `https://www.pricecharting.com/search-products?q=${encodeURIComponent(query)}&type=prices`;
    console.log(url);

    const response = await axios.get<string>(
      `https://www.pricecharting.com/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      },
    );

    const $ = cheerio.load(response.data);
    const games: GamePrice[] = [];

    $(".product").each((_, element) => {
      const titleElement = $(element).find(".title a");
      const priceElement = $(element).find(".price");
      const platformElement = $(element).find(".platform");
      const imageElement = $(element).find("img");

      games.push({
        title: titleElement.text().trim(),
        platform: platformElement.text().trim(),
        condition: "Used",
        price: parseFloat(priceElement.text().replace("$", "")) ?? 0,
        imageUrl: imageElement.attr("src"),
        url: titleElement.attr("href") ?? "",
      });
    });

    return games;
  } catch (error) {
    console.error("Error scraping game prices:", error);
    throw error;
  }
}

export async function getGameDetails(url: string): Promise<GamePrice> {
  try {
    const response = await axios.get<string>(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const titleElement = $("h1");
    const priceElement = $(".price");
    const platformElement = $(".platform");
    const imageElement = $(".product-image img");

    return {
      title: titleElement.text().trim(),
      platform: platformElement.text().trim(),
      condition: "Used",
      price: parseFloat(priceElement.text().replace("$", "")) ?? 0,
      imageUrl: imageElement.attr("src"),
      url: url,
    };
  } catch (error) {
    console.error("Error scraping game details:", error);
    throw error;
  }
}
