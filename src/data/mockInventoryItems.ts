export interface InventoryItem {
  id: string;
  name: string;
  purchaseDate: string; // YYYY-MM-DD for easier date math
  cost: number;
  category: string;
  // Future fields: serialNumber, condition, customerId, notes etc.
}

export const mockInventoryItems: InventoryItem[] = [
  {
    id: "INV001",
    name: "Apple iPhone 12 Pro 256GB",
    purchaseDate: "2024-05-28", // Example: Older, should be ready
    cost: 450,
    category: "Phone",
  },
  {
    id: "INV002",
    name: "Sony PlayStation 5 Disc Edition",
    purchaseDate: "2024-05-29", // Example: Should be ready
    cost: 250,
    category: "Console",
  },
  {
    id: "INV003",
    name: "MacBook Air M1 13-inch (2020)",
    purchaseDate: "2024-05-30", // Example: Should be ready
    cost: 600,
    category: "Laptop",
  },
  {
    id: "INV004",
    name: "Samsung Galaxy S21 Ultra 128GB",
    purchaseDate: "2024-05-31", // Example: Borderline, check today's date for exact status
    cost: 380,
    category: "Phone",
  },
  {
    id: "INV005",
    name: "Nintendo Switch OLED",
    purchaseDate: "2024-06-01", // Example: Still on hold
    cost: 180,
    category: "Console",
  },
  {
    id: "INV006",
    name: "Dell XPS 15 9510",
    purchaseDate: "2024-06-01", // Example: Still on hold
    cost: 700,
    category: "Laptop",
  },
  {
    id: "INV007",
    name: "Apple Watch Series 7 GPS",
    purchaseDate: "2024-06-02", // Example: Still on hold
    cost: 150,
    category: "Wearable",
  },
  {
    id: "INV008",
    name: "Google Pixel 6 Pro 128GB",
    purchaseDate: "2024-06-02", // Example: Still on hold
    cost: 320,
    category: "Phone",
  },
  {
    id: "INV009",
    name: "Microsoft Xbox Series S",
    purchaseDate: "2024-05-27", // Example: Older, definitely ready
    cost: 130,
    category: "Console",
  },
  {
    id: "INV010",
    name: "iPad Pro 11-inch (2021)",
    purchaseDate: "2024-06-01", // Example: Still on hold
    cost: 550,
    category: "Tablet",
  },
];
