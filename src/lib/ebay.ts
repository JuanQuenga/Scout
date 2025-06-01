export interface EbayPrice {
  value: number;
  currency: string;
}

export interface EbaySoldItem {
  itemId: string;
  title: string;
  price: EbayPrice;
  soldDate: string;
  imageUrl?: string;
  condition?: string;
  platform?: string;
}

interface EbayApiResponse {
  itemSummaries: Array<{
    itemId: string;
    title: string;
    price: {
      value: string;
      currency: string;
    };
    soldDate: string;
    image?: {
      imageUrl: string;
    };
    condition?: string;
    platform?: string;
  }>;
}

const EBAY_API_KEY = process.env.NEXT_PUBLIC_EBAY_API_KEY;

if (!EBAY_API_KEY) {
  throw new Error("EBAY_API_KEY environment variable is not set");
}

export async function searchSoldListings(
  query: string,
): Promise<EbaySoldItem[]> {
  try {
    const response = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&filter=soldItems`,
      {
        headers: {
          Authorization: `Bearer ${EBAY_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`eBay API error: ${response.statusText}`);
    }

    const data = (await response.json()) as EbayApiResponse;

    // Transform the eBay API response to our EbaySoldItem type
    return data.itemSummaries.map((item) => ({
      itemId: item.itemId,
      title: item.title,
      price: {
        value: parseFloat(item.price.value),
        currency: item.price.currency,
      },
      soldDate: item.soldDate,
      imageUrl: item.image?.imageUrl,
      condition: item.condition,
      platform: item.platform,
    }));
  } catch (error) {
    console.error("Error searching eBay listings:", error);
    throw error;
  }
}
