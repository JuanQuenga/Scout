import axios from "axios";
import EbayAuthToken from "ebay-oauth-nodejs-client";

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
  env: "PRODUCTION" | "SANDBOX";
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

interface OAuthToken {
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
  private oauthClient: EbayAuthToken;
  private accessToken: string | null = null;
  private tokenExpiry = 0;
  private retryCount = 0;
  private readonly MAX_RETRIES = 2;

  constructor(private config: EbayConfig) {
    this.oauthClient = new EbayAuthToken({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      env: config.env,
    });
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const token = (await this.oauthClient.getApplicationToken(
        this.config.env,
      )) as unknown as OAuthToken;
      this.accessToken = token.access_token;
      this.tokenExpiry = Date.now() + token.expires_in * 1000;
      return this.accessToken;
    } catch (error) {
      console.error("Error getting eBay OAuth token:", error);
      throw new Error("Failed to get eBay OAuth token");
    }
  }

  private async makeRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status >= 500 &&
        this.retryCount < this.MAX_RETRIES
      ) {
        this.retryCount++;
        console.log(
          `Retrying request (attempt ${this.retryCount}/${this.MAX_RETRIES})`,
        );
        return this.makeRequest(requestFn);
      }
      throw error;
    } finally {
      this.retryCount = 0;
    }
  }

  async searchSoldItems(query: string): Promise<EbayItem[]> {
    try {
      const token = await this.getAccessToken();
      console.log(`Searching for ${query} on eBay`);

      return await this.makeRequest(async () => {
        const response = await axios.get<EbaySearchResponse>(
          "https://api.ebay.com/buy/marketplace_insights/v1_beta/item_sales/search",
          {
            params: {
              q: query,
              limit: 50,
              sort: "lastSoldDate",
              fieldgroups: "CONDITION_REFINEMENTS,MATCHING_ITEMS",
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
              Accept: "application/json",
              "Accept-Charset": "UTF-8",
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
      });
    } catch (error) {
      console.error("Error searching eBay:", error);
      if (axios.isAxiosError(error)) {
        throw new Error(
          `eBay API error: ${error.response?.data?.message || error.message}`,
        );
      }
      throw error;
    }
  }
}
