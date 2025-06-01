import axios from "axios";

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

interface EbayConfig {
  clientId: string;
  clientSecret: string;
}

interface EbayItem {
  title: string;
  price: {
    value: string;
    currency: string;
  };
  condition: string;
  imageUrl?: string;
  itemId: string;
}

interface EbayTokenResponse {
  access_token: string;
  expires_in: number;
}

interface EbaySearchResponse {
  items: Array<{
    title: string;
    price: {
      value: string;
      currency: string;
    };
    condition: string;
    image?: {
      imageUrl: string;
    };
    itemId: string;
  }>;
}

export class EbayService {
  private accessToken: string | null = null;
  private tokenExpiry = 0;

  constructor(private config: EbayConfig) {}

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await axios.post<EbayTokenResponse>(
      "https://api.ebay.com/identity/v1/oauth2/token",
      "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString("base64")}`,
        },
      },
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
    return this.accessToken;
  }

  async searchSoldItems(query: string): Promise<EbayItem[]> {
    const token = await this.getAccessToken();

    const response = await axios.get<EbaySearchResponse>(
      "https://api.ebay.com/buy/marketplace_insights/v1_beta/item_sales/search",
      {
        params: {
          q: query,
          limit: 50,
          filter: "soldItems",
          fieldgroups: "ASPECT_REFINEMENTS,MATCHING_ITEMS",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
          "X-EBAY-C-ENDUSERCTX":
            "affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>",
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.items.map((item) => ({
      title: item.title,
      price: {
        value: item.price.value,
        currency: item.price.currency,
      },
      condition: item.condition,
      imageUrl: item.image?.imageUrl,
      itemId: item.itemId,
    }));
  }
}
