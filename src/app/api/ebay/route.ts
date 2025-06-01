import { NextResponse } from "next/server";
import { EbayService } from "~/lib/ebay";

const ebayService = new EbayService({
  clientId: process.env.EBAY_CLIENT_ID ?? "",
  clientSecret: process.env.EBAY_CLIENT_SECRET ?? "",
  env: (process.env.EBAY_ENV as "PRODUCTION" | "SANDBOX") ?? "SANDBOX",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const items = await ebayService.searchSoldItems(query);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error searching eBay:", error);
    return NextResponse.json(
      { error: "Failed to search eBay listings" },
      { status: 500 },
    );
  }
}
