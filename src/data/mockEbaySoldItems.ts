export interface MockEbaySoldItem {
  id: string;
  title: string;
  price: string;
  date: string;
  image: string;
}

export const mockEbaySoldItems: MockEbaySoldItem[] = [
  {
    id: "1",
    title: "Apple iPhone 13 Pro Max 256GB - Sierra Blue (Unlocked)",
    price: "$799.99",
    date: "2024-05-30",
    image: "https://i.ebayimg.com/images/g/iphone13promax.jpg", // Replace with actual or better placeholder
  },
  {
    id: "2",
    title: "Apple iPhone 13 Pro Max 128GB - Graphite (Unlocked)",
    price: "$720.00",
    date: "2024-05-28",
    image: "https://i.ebayimg.com/images/g/iphone13promax2.jpg", // Replace with actual or better placeholder
  },
  {
    id: "3",
    title: "Apple iPhone 13 Pro Max 512GB - Gold (Unlocked)",
    price: "$899.00",
    date: "2024-05-27",
    image: "https://i.ebayimg.com/images/g/iphone13promax3.jpg", // Replace with actual or better placeholder
  },
  {
    id: "4",
    title: "Samsung Galaxy S22 Ultra 128GB - Phantom Black (Verizon)",
    price: "$550.00",
    date: "2024-05-29",
    image: "https://i.ebayimg.com/images/g/samsungs22ultra.jpg", // Replace with actual or better placeholder
  },
  {
    id: "5",
    title: "Google Pixel 7 Pro 256GB - Obsidian (Unlocked)",
    price: "$480.50",
    date: "2024-05-26",
    image: "https://i.ebayimg.com/images/g/pixel7pro.jpg", // Replace with actual or better placeholder
  },
];
