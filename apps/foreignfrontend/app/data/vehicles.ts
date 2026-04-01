export type VehicleCategory = "2-Wheelers" | "Automobiles" | "Heavy Machinery";

export interface Vehicle {
  id: number;
  name: string;
  year: number;
  price: string;
  category: VehicleCategory;
  image: string;
  pdfUrl?: string;
}

export const vehicles: Vehicle[] = [
  // ── Automobiles ──
  {
    id: 1,
    name: "Honda City",
    year: 2025,
    price: "LKR 10,000,000",
    category: "Automobiles",
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Toyota Corolla",
    year: 2025,
    price: "LKR 12,500,000",
    category: "Automobiles",
    image:
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Nissan Leaf",
    year: 2024,
    price: "LKR 14,200,000",
    category: "Automobiles",
    image:
      "https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Mazda CX-5",
    year: 2025,
    price: "LKR 16,800,000",
    category: "Automobiles",
    image:
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Honda Vezel",
    year: 2024,
    price: "LKR 11,500,000",
    category: "Automobiles",
    image:
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Toyota RAV4",
    year: 2025,
    price: "LKR 19,000,000",
    category: "Automobiles",
    image:
      "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // ── 2-Wheelers ──
  {
    id: 7,
    name: "Honda CB500",
    year: 2025,
    price: "LKR 3,200,000",
    category: "2-Wheelers",
    image:
      "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    name: "Yamaha MT-07",
    year: 2024,
    price: "LKR 4,500,000",
    category: "2-Wheelers",
    image:
      "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    name: "Kawasaki Z400",
    year: 2025,
    price: "LKR 3,800,000",
    category: "2-Wheelers",
    image:
      "https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // ── Heavy Machinery ──
  {
    id: 10,
    name: "Komatsu PC200",
    year: 2023,
    price: "LKR 45,000,000",
    category: "Heavy Machinery",
    image:
      "https://images.pexels.com/photos/1267336/pexels-photo-1267336.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 11,
    name: "Caterpillar 320",
    year: 2024,
    price: "LKR 52,000,000",
    category: "Heavy Machinery",
    image:
      "https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 12,
    name: "Hitachi ZX200",
    year: 2023,
    price: "LKR 48,000,000",
    category: "Heavy Machinery",
    image:
      "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
