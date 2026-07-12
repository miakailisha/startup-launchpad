export type Product = {
  id: string;
  name: string;
  category: ProductCategoryId;
  description: string;
  price: number; // NGN
  image: string;
  inStock: boolean;
  featured: boolean;
};

export const productCategories = [
  { id: "electronics", label: "Electronics" },
  { id: "home", label: "Home Essentials" },
  { id: "kitchen", label: "Kitchen" },
  { id: "cleaning", label: "Cleaning Supplies" },
  { id: "office", label: "Office" },
  { id: "improvement", label: "Home Improvement" },
  { id: "fashion", label: "Fashion Accessories" },
] as const;

export type ProductCategoryId = (typeof productCategories)[number]["id"];

export const products: Product[] = [
  {
    id: "p-01",
    name: "Wireless Bluetooth Earbuds",
    category: "electronics",
    description: "Crisp sound, 24-hour battery with charging case, sweat-resistant for daily wear.",
    price: 28500,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: true,
  },
  {
    id: "p-02",
    name: "Smart LED Desk Lamp",
    category: "electronics",
    description: "Adjustable brightness and colour temperature with USB charging port.",
    price: 19500,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: true,
  },
  {
    id: "p-03",
    name: "Non-Stick Cookware Set (5-piece)",
    category: "kitchen",
    description: "Durable non-stick coating, oven safe, easy to clean — everything a home cook needs.",
    price: 42000,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: true,
  },
  {
    id: "p-04",
    name: "Stainless Steel Kettle",
    category: "kitchen",
    description: "1.7L fast-boil kettle with auto shut-off and dry-boil protection.",
    price: 15500,
    image: "https://images.unsplash.com/photo-1585237017125-24baf8d7406f?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
  {
    id: "p-05",
    name: "Cordless Vacuum Cleaner",
    category: "cleaning",
    description: "Lightweight stick vacuum with HEPA filter and 45-minute runtime.",
    price: 72000,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: true,
  },
  {
    id: "p-06",
    name: "Multi-Surface Cleaning Kit",
    category: "cleaning",
    description: "Concentrates, microfibre cloths and a spray bottle — enough for a full deep clean.",
    price: 8500,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
  {
    id: "p-07",
    name: "Cotton Bath Towel Set (4-piece)",
    category: "home",
    description: "Absorbent 100% cotton, quick-drying, hotel-quality feel.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
  {
    id: "p-08",
    name: "Storage Baskets (Set of 3)",
    category: "home",
    description: "Woven storage baskets for wardrobes, shelves and open spaces.",
    price: 9800,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=70",
    inStock: false,
    featured: false,
  },
  {
    id: "p-09",
    name: "Ergonomic Office Chair",
    category: "office",
    description: "Mesh back, lumbar support and adjustable armrests for long work days.",
    price: 89500,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: true,
  },
  {
    id: "p-10",
    name: "A4 Paper Ream (500 sheets)",
    category: "office",
    description: "Premium 80gsm bright white paper for printers and everyday use.",
    price: 4500,
    image: "https://images.unsplash.com/photo-1568871391090-9de1cd6b28f4?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
  {
    id: "p-11",
    name: "18-Piece Home Tool Kit",
    category: "improvement",
    description: "Compact toolkit with hammer, screwdrivers, pliers and a tape measure — the essentials.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: true,
  },
  {
    id: "p-12",
    name: "Cordless Power Drill",
    category: "improvement",
    description: "20V lithium-ion drill with 2 batteries and 24-piece bit set.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
  {
    id: "p-13",
    name: "Leather Wallet",
    category: "fashion",
    description: "Slim genuine-leather bifold with RFID protection.",
    price: 11500,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
  {
    id: "p-14",
    name: "Classic Sunglasses",
    category: "fashion",
    description: "Polarised UV400 lenses with a lightweight metal frame.",
    price: 8900,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=70",
    inStock: true,
    featured: false,
  },
];

export function formatNGN(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}
