export interface PreOrderBike {
  id: number;
  brand: string;
  model: string;
  year: number;
  cc: string;
  color: string;
  availability: string;
  expectedArrival: string;
  depositRequired: string;
  status: "In Stock" | "Pre Order";
  price: number;
  image: string;
  description: string;
}

export const PRE_ORDER_BIKES: PreOrderBike[] = [
  {
    id: 1,
    brand: "Yamaha",
    model: "MT-15 V2",
    year: 2026,
    cc: "155cc",
    color: "Metallic Black",
    availability: "Pre Order",
    expectedArrival: "April 2026",
    depositRequired: "Rs. 150,000",
    status: "Pre Order",
    price: 1_250_000,
    image:
      "https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The all-new Yamaha MT-15 V2 brings hyper-naked aggression to the 155cc segment. Featuring a liquid-cooled single-cylinder engine with VVA technology, LED lighting, and a fully digital instrument cluster. Perfect for riders who want razor-sharp street performance.",
  },
  {
    id: 2,
    brand: "Honda",
    model: "CB500F",
    year: 2026,
    cc: "471cc",
    color: "Grand Prix Red",
    availability: "In Stock",
    expectedArrival: "Available Now",
    depositRequired: "Rs. 200,000",
    status: "In Stock",
    price: 1_850_000,
    image:
      "https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Honda CB500F is the perfect middleweight naked bike for riders stepping up from 150cc. A smooth parallel-twin engine, comfortable ergonomics, and Honda reliability make this a best-seller in Sri Lanka.",
  },
  {
    id: 3,
    brand: "Kawasaki",
    model: "Z400",
    year: 2026,
    cc: "399cc",
    color: "Candy Lime Green",
    availability: "Pre Order",
    expectedArrival: "May 2026",
    depositRequired: "Rs. 180,000",
    status: "Pre Order",
    price: 1_650_000,
    image:
      "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Kawasaki Z400 delivers Supernaked thrills in a lightweight package. The parallel-twin engine produces exciting power, while the aggressive Z DNA styling gives you that unmistakable street presence.",
  },
  {
    id: 4,
    brand: "Suzuki",
    model: "GSX-S750",
    year: 2026,
    cc: "749cc",
    color: "Glass Sparkle Black",
    availability: "In Stock",
    expectedArrival: "Available Now",
    depositRequired: "Rs. 250,000",
    status: "In Stock",
    price: 2_100_000,
    image:
      "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Suzuki GSX-S750 packs a punchy 749cc inline-four engine derived from the legendary GSX-R750. With a torque-heavy powerband and sharp handling, it's built for riders who crave performance on every ride.",
  },
  {
    id: 5,
    brand: "KTM",
    model: "Duke 390",
    year: 2026,
    cc: "373cc",
    color: "Orange",
    availability: "Pre Order",
    expectedArrival: "March 2026",
    depositRequired: "Rs. 160,000",
    status: "Pre Order",
    price: 1_400_000,
    image:
      "https://images.pexels.com/photos/163210/motorcycles-racing-race-helmet-163210.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The KTM 390 Duke is the embodiment of Ready to Race DNA in everyday clothing. A high-revving single-cylinder 373cc engine, TFT display, cornering ABS, and traction control make it the most feature-packed 390 ever.",
  },
  {
    id: 6,
    brand: "BMW",
    model: "G 310 R",
    year: 2026,
    cc: "313cc",
    color: "Style Sport",
    availability: "In Stock",
    expectedArrival: "Available Now",
    depositRequired: "Rs. 220,000",
    status: "In Stock",
    price: 1_980_000,
    image:
      "https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The BMW G 310 R brings Bavarian engineering to the entry-level segment. A liquid-cooled single-cylinder engine, inverted front forks, and premium BMW build quality make this the ultimate beginner-to-intermediate motorcycle.",
  },
  {
    id: 7,
    brand: "Ducati",
    model: "Monster 937",
    year: 2026,
    cc: "937cc",
    color: "Ducati Red",
    availability: "Pre Order",
    expectedArrival: "June 2026",
    depositRequired: "Rs. 350,000",
    status: "Pre Order",
    price: 2_750_000,
    image:
      "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Ducati Monster 937 — an icon reborn. A lightweight Testastretta 11° V-twin engine, single-sided swingarm, and muscular Italian styling make this the most exciting naked bike in its class. An unforgettable ride.",
  },
  {
    id: 8,
    brand: "Triumph",
    model: "Street Triple RS",
    year: 2026,
    cc: "765cc",
    color: "Sapphire Black",
    availability: "Pre Order",
    expectedArrival: "May 2026",
    depositRequired: "Rs. 300,000",
    status: "Pre Order",
    price: 2_450_000,
    image:
      "https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Triumph Street Triple RS is the most dynamically capable Street Triple ever. A race-bred 765cc inline-three engine with 123 PS, Öhlins suspension, Brembo brakes, and a full suite of electronics deliver an unrivalled street and track experience.",
  },
];
