export type Customer = {
  name: string;
  contact?: string;
  address?: string;
};

export type InventoryItem = {
  orderNumber: number;
  customer: Customer;
  purchaseDate: string; // Stored as 'yyyy-MM-dd'
  purchaseAmount: number;
  estimatedSellPrice: number;
  employee: string;
  location: string;
  notes: string;
  status: "In Stock" | "Listed" | "Sold" | "For Parts" | "Processing";
  device: {
    name: string;
    brand: string;
    model: string;
    condition: string;
  };
};

// Helper function to format a date as 'yyyy-MM-dd'
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Get dates for today and previous days using native Date
const today = new Date();
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(today.getDate() - 3);
const fourDaysAgo = new Date(today);
fourDaysAgo.setDate(today.getDate() - 4);
const fiveDaysAgo = new Date(today);
fiveDaysAgo.setDate(today.getDate() - 5);
const sixDaysAgo = new Date(today);
sixDaysAgo.setDate(today.getDate() - 6);
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 7);

export const mockInventoryData: InventoryItem[] = [
  {
    orderNumber: 1001,
    customer: { name: "John Smith", contact: "john@example.com" },
    purchaseDate: formatDate(threeDaysAgo),
    purchaseAmount: 250,
    estimatedSellPrice: 450,
    employee: "Alice",
    location: "A1",
    notes: "Mint condition, original box.",
    status: "In Stock",
    device: {
      name: "PlayStation 5 Disc",
      brand: "Sony",
      model: "PS5 Disc",
      condition: "Used - Like New",
    },
  },
  {
    orderNumber: 1002,
    customer: { name: "Jane Doe", contact: "555-1234" },
    purchaseDate: formatDate(threeDaysAgo),
    purchaseAmount: 600,
    estimatedSellPrice: 950,
    employee: "Bob",
    location: "B3",
    notes: "Unlocked, 256GB model.",
    status: "Processing",
    device: {
      name: "iPhone 15 Pro",
      brand: "Apple",
      model: "15 Pro",
      condition: "Used - Good",
    },
  },
  {
    orderNumber: 1003,
    customer: { name: "Ben Awad" },
    purchaseDate: formatDate(threeDaysAgo),
    purchaseAmount: 750,
    estimatedSellPrice: 1200,
    employee: "Alice",
    location: "C2",
    notes: "Includes original charger and case. M3 Pro chip.",
    status: "Listed",
    device: {
      name: 'MacBook Pro 14"',
      brand: "Apple",
      model: 'MacBook Pro 14"',
      condition: "Open Box",
    },
  },
  {
    orderNumber: 1004,
    customer: { name: "Nakaia", contact: "nakaia@email.com" },
    purchaseDate: formatDate(threeDaysAgo),
    purchaseAmount: 150,
    estimatedSellPrice: 220,
    employee: "Charlie",
    location: "F1-Shelf",
    notes: "No controller included.",
    status: "Sold",
    device: {
      name: "Xbox Series S",
      brand: "Microsoft",
      model: "Series S",
      condition: "Used - Acceptable",
    },
  },
  {
    orderNumber: 1005,
    customer: { name: "Previous Customer", contact: "fb-marketplace-id" },
    purchaseDate: formatDate(threeDaysAgo),
    purchaseAmount: 30,
    estimatedSellPrice: 0,
    employee: "Bob",
    location: "D5",
    notes: "Screen is cracked, does not power on.",
    status: "For Parts",
    device: {
      name: "Samsung Galaxy S21",
      brand: "Samsung",
      model: "S21",
      condition: "For Parts/Not Working",
    },
  },
  // 4 days old
  {
    orderNumber: 1006,
    customer: { name: "Mike Johnson" },
    purchaseDate: formatDate(fourDaysAgo),
    purchaseAmount: 800,
    estimatedSellPrice: 1100,
    employee: "Charlie",
    location: "A2",
    notes: "New, in box.",
    status: "In Stock",
    device: {
      name: 'MacBook Air 15"',
      brand: "Apple",
      model: "MacBook Air 15",
      condition: "New",
    },
  },
  {
    orderNumber: 1007,
    customer: { name: "Sarah Lee" },
    purchaseDate: formatDate(fourDaysAgo),
    purchaseAmount: 300,
    estimatedSellPrice: 450,
    employee: "Alice",
    location: "A3",
    notes: "Light scratches on screen.",
    status: "In Stock",
    device: {
      name: "iPad Pro 11",
      brand: "Apple",
      model: "iPad Pro 11",
      condition: "Used - Good",
    },
  },
  {
    orderNumber: 1008,
    customer: { name: "David Chen" },
    purchaseDate: formatDate(fourDaysAgo),
    purchaseAmount: 120,
    estimatedSellPrice: 200,
    employee: "Bob",
    location: "B1",
    notes: "Includes 2 controllers.",
    status: "Processing",
    device: {
      name: "Nintendo Switch",
      brand: "Nintendo",
      model: "Switch",
      condition: "Used - Very Good",
    },
  },
  {
    orderNumber: 1009,
    customer: { name: "Emily White" },
    purchaseDate: formatDate(fourDaysAgo),
    purchaseAmount: 400,
    estimatedSellPrice: 600,
    employee: "Charlie",
    location: "B2",
    notes: "Unlocked, 128GB.",
    status: "Listed",
    device: {
      name: "Google Pixel 8 Pro",
      brand: "Google",
      model: "Pixel 8 Pro",
      condition: "Used - Like New",
    },
  },
  {
    orderNumber: 1010,
    customer: { name: "Chris Green" },
    purchaseDate: formatDate(fourDaysAgo),
    purchaseAmount: 550,
    estimatedSellPrice: 800,
    employee: "Alice",
    location: "C1",
    notes: "Gaming laptop, RTX 3060.",
    status: "In Stock",
    device: {
      name: "Dell G15 Gaming Laptop",
      brand: "Dell",
      model: "G15",
      condition: "Used - Good",
    },
  },
  // 5 days old
  {
    orderNumber: 1011,
    customer: { name: "Laura Blue" },
    purchaseDate: formatDate(fiveDaysAgo),
    purchaseAmount: 220,
    estimatedSellPrice: 350,
    employee: "Bob",
    location: "D1",
    notes: "500GB SSD.",
    status: "Listed",
    device: {
      name: "PlayStation 4 Pro",
      brand: "Sony",
      model: "PS4 Pro",
      condition: "Used - Very Good",
    },
  },
  {
    orderNumber: 1012,
    customer: { name: "Kevin Black" },
    purchaseDate: formatDate(fiveDaysAgo),
    purchaseAmount: 90,
    estimatedSellPrice: 150,
    employee: "Charlie",
    location: "E1",
    notes: "Noise-cancelling.",
    status: "In Stock",
    device: {
      name: "Sony WH-1000XM4",
      brand: "Sony",
      model: "WH-1000XM4",
      condition: "Used - Good",
    },
  },
  {
    orderNumber: 1013,
    customer: { name: "Jessica Brown" },
    purchaseDate: formatDate(fiveDaysAgo),
    purchaseAmount: 180,
    estimatedSellPrice: 280,
    employee: "Alice",
    location: "F1",
    notes: "OLED model.",
    status: "Processing",
    device: {
      name: "Nintendo Switch OLED",
      brand: "Nintendo",
      model: "Switch OLED",
      condition: "Used - Like New",
    },
  },
  {
    orderNumber: 1014,
    customer: { name: "Daniel Yellow" },
    purchaseDate: formatDate(fiveDaysAgo),
    purchaseAmount: 70,
    estimatedSellPrice: 120,
    employee: "Bob",
    location: "G1",
    notes: "Wireless earbuds.",
    status: "In Stock",
    device: {
      name: "Apple AirPods Pro",
      brand: "Apple",
      model: "AirPods Pro",
      condition: "Used - Good",
    },
  },
  {
    orderNumber: 1015,
    customer: { name: "Amanda Purple" },
    purchaseDate: formatDate(fiveDaysAgo),
    purchaseAmount: 1500,
    estimatedSellPrice: 2200,
    employee: "Charlie",
    location: "H1",
    notes: "High-end gaming PC, RTX 4080.",
    status: "Listed",
    device: {
      name: "Alienware Aurora R15",
      brand: "Dell",
      model: "Aurora R15",
      condition: "Used - Excellent",
    },
  },
  // 6 days old
  {
    orderNumber: 1016,
    customer: { name: "Steven Orange" },
    purchaseDate: formatDate(sixDaysAgo),
    purchaseAmount: 350,
    estimatedSellPrice: 500,
    employee: "Alice",
    location: "I1",
    notes: "1TB model.",
    status: "In Stock",
    device: {
      name: "Xbox Series X",
      brand: "Microsoft",
      model: "Series X",
      condition: "Used - Very Good",
    },
  },
  {
    orderNumber: 1017,
    customer: { name: "Olivia Gray" },
    purchaseDate: formatDate(sixDaysAgo),
    purchaseAmount: 60,
    estimatedSellPrice: 100,
    employee: "Bob",
    location: "J1",
    notes: "4K streaming stick.",
    status: "In Stock",
    device: {
      name: "Amazon Fire TV Stick 4K Max",
      brand: "Amazon",
      model: "Fire TV Stick 4K Max",
      condition: "Used - Like New",
    },
  },
  {
    orderNumber: 1018,
    customer: { name: "William Pink" },
    purchaseDate: formatDate(sixDaysAgo),
    purchaseAmount: 200,
    estimatedSellPrice: 320,
    employee: "Charlie",
    location: "K1",
    notes: "With GPS.",
    status: "Processing",
    device: {
      name: "Apple Watch Series 8",
      brand: "Apple",
      model: "Watch Series 8",
      condition: "Used - Good",
    },
  },
  {
    orderNumber: 1019,
    customer: { name: "Sophia Teal" },
    purchaseDate: formatDate(sixDaysAgo),
    purchaseAmount: 1100,
    estimatedSellPrice: 1500,
    employee: "Alice",
    location: "L1",
    notes: "M2 chip, 16GB RAM.",
    status: "Listed",
    device: {
      name: 'MacBook Pro 13"',
      brand: "Apple",
      model: 'MacBook Pro 13"',
      condition: "Used - Excellent",
    },
  },
  {
    orderNumber: 1020,
    customer: { name: "James Indigo" },
    purchaseDate: formatDate(sixDaysAgo),
    purchaseAmount: 900,
    estimatedSellPrice: 1300,
    employee: "Bob",
    location: "M1",
    notes: "Foldable phone.",
    status: "In Stock",
    device: {
      name: "Samsung Galaxy Z Fold 4",
      brand: "Samsung",
      model: "Z Fold 4",
      condition: "Used - Good",
    },
  },
  // 7 days old
  {
    orderNumber: 1021,
    customer: { name: "Charlotte Crimson" },
    purchaseDate: formatDate(sevenDaysAgo),
    purchaseAmount: 80,
    estimatedSellPrice: 130,
    employee: "Charlie",
    location: "N1",
    notes: "Mechanical keyboard.",
    status: "In Stock",
    device: {
      name: "Logitech G Pro X Keyboard",
      brand: "Logitech",
      model: "G Pro X",
      condition: "Used - Very Good",
    },
  },
  {
    orderNumber: 1022,
    customer: { name: "Henry Magenta" },
    purchaseDate: formatDate(sevenDaysAgo),
    purchaseAmount: 70,
    estimatedSellPrice: 110,
    employee: "Alice",
    location: "O1",
    notes: "Wireless gaming mouse.",
    status: "Processing",
    device: {
      name: "Razer DeathAdder V2 Pro",
      brand: "Razer",
      model: "DeathAdder V2 Pro",
      condition: "Used - Like New",
    },
  },
  {
    orderNumber: 1023,
    customer: { name: "Evelyn Gold" },
    purchaseDate: formatDate(sevenDaysAgo),
    purchaseAmount: 250,
    estimatedSellPrice: 400,
    employee: "Bob",
    location: "P1",
    notes: "Mirrorless camera.",
    status: "Listed",
    device: {
      name: "Sony Alpha a6400",
      brand: "Sony",
      model: "a6400",
      condition: "Used - Good",
    },
  },
  {
    orderNumber: 1024,
    customer: { name: "Liam Silver" },
    purchaseDate: formatDate(sevenDaysAgo),
    purchaseAmount: 130,
    estimatedSellPrice: 200,
    employee: "Charlie",
    location: "Q1",
    notes: "VR headset.",
    status: "In Stock",
    device: {
      name: "Oculus Quest 2",
      brand: "Meta",
      model: "Quest 2",
      condition: "Used - Very Good",
    },
  },
  {
    orderNumber: 1025,
    customer: { name: "Mia Bronze" },
    purchaseDate: formatDate(sevenDaysAgo),
    purchaseAmount: 180,
    estimatedSellPrice: 260,
    employee: "Alice",
    location: "R1",
    notes: "Special edition.",
    status: "In Stock",
    device: {
      name: "Xbox Elite Series 2 Controller",
      brand: "Microsoft",
      model: "Elite Series 2",
      condition: "Used - Like New",
    },
  },
];
