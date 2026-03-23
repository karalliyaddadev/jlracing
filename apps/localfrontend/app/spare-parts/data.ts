export type PartCategory =
  | "Engine"
  | "Brakes"
  | "Suspension"
  | "Electrical"
  | "Body & Frame"
  | "Drivetrain"
  | "Exhaust"
  | "Tyres";

export type PartBrand =
  | "Yamaha"
  | "Honda"
  | "Suzuki"
  | "Kawasaki"
  | "KTM"
  | "Generic"
  | "Brembo"
  | "Öhlins"
  | "Michelin"
  | "NGK";

export interface SparePart {
  id: number;
  name: string;
  brand: PartBrand;
  category: PartCategory;
  partNumber: string;
  compatibility: string;
  price: number;
  status: "In Stock" | "Pre Order" | "Low Stock";
  image: string;
  description: string;
}

export const SPARE_PARTS: SparePart[] = [
  {
    id: 1,
    name: "Piston Kit (Standard)",
    brand: "Yamaha",
    category: "Engine",
    partNumber: "YM-PKT-R3-STD",
    compatibility: "Yamaha R3, MT-03 (2015–2026)",
    price: 18_500,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "OEM-spec standard bore piston kit for the Yamaha R3 and MT-03. Includes piston, rings, pin, and circlips. Precision machined for optimal compression and longevity.",
  },
  {
    id: 2,
    name: "Front Brake Caliper",
    brand: "Brembo",
    category: "Brakes",
    partNumber: "BRB-FC-M4-34",
    compatibility: "Universal — 4-pot radial mount",
    price: 42_000,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Brembo M4 4-piston radial-mount front caliper. Delivers outstanding braking feel and fade resistance. A direct upgrade over OEM calipers for sports and naked bikes.",
  },
  {
    id: 3,
    name: "Rear Shock Absorber",
    brand: "Öhlins",
    category: "Suspension",
    partNumber: "OHL-RS-CBR-600",
    compatibility: "Honda CBR 600RR (2007–2026)",
    price: 98_000,
    status: "Pre Order",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Öhlins S46HR1C1L rear shock absorber for Honda CBR600RR. Full adjustability for preload, compression, and rebound damping. A direct bolt-on upgrade for track and road use.",
  },
  {
    id: 4,
    name: "Spark Plug (Iridium)",
    brand: "NGK",
    category: "Electrical",
    partNumber: "NGK-CR9EIX",
    compatibility: "Universal — M12×1.25 thread",
    price: 1_200,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "NGK Iridium IX spark plug for superior ignitability and long service life. Works with most 125–1000cc four-stroke motorcycles. Sold individually.",
  },
  {
    id: 5,
    name: "Chain & Sprocket Kit",
    brand: "Generic",
    category: "Drivetrain",
    partNumber: "CSK-525-43-15",
    compatibility: "Kawasaki Z650, Z900 (2017–2026)",
    price: 14_500,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Heavy-duty 525 DID chain with front and rear sprocket set. Pre-stretched and X-ring sealed for reduced maintenance. Suitable for street and light touring use.",
  },
  {
    id: 6,
    name: "Full Fairing Kit (ABS)",
    brand: "Suzuki",
    category: "Body & Frame",
    partNumber: "SZ-FK-GSXR-600",
    compatibility: "Suzuki GSX-R 600 (2011–2020)",
    price: 68_000,
    status: "Low Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Complete injection-moulded ABS plastic fairing set for Suzuki GSX-R 600. Includes upper, mid, lower fairings, nose piece, and heat shields. Unpainted — ready for custom finish.",
  },
  {
    id: 7,
    name: "Exhaust Mid Pipe",
    brand: "Honda",
    category: "Exhaust",
    partNumber: "HN-MP-CBR500R",
    compatibility: "Honda CBR 500R (2013–2026)",
    price: 22_000,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "OEM replacement stainless steel mid exhaust pipe for Honda CBR 500R. Heat resistant coating, bolt-on fitment, and correct emission compliance for road use.",
  },
  {
    id: 8,
    name: "Sport Tyre (Front) 120/70-17",
    brand: "Michelin",
    category: "Tyres",
    partNumber: "MCH-PP5-FT-120",
    compatibility: "Universal — 120/70 ZR17",
    price: 29_500,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Michelin Pilot Power 5 front tyre in 120/70 ZR17. Dual compound construction for maximum wet and dry grip. Factory fitment on many European superbikes.",
  },
  {
    id: 9,
    name: "Air Filter Element",
    brand: "Kawasaki",
    category: "Engine",
    partNumber: "KW-AF-Z400-26",
    compatibility: "Kawasaki Z400, Ninja 400 (2018–2026)",
    price: 3_800,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Genuine OEM paper air filter element for Kawasaki Z400 and Ninja 400. Recommended replacement every 12,000 km or 12 months. Easy DIY installation.",
  },
  {
    id: 10,
    name: "Brake Pads (Front) Sintered",
    brand: "Brembo",
    category: "Brakes",
    partNumber: "BRB-BP-SA-7407",
    compatibility: "Multi-fit — see compatibility chart",
    price: 8_500,
    status: "In Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Brembo SA sintered compound front brake pads. Superior heat resistance and bite with minimal fade under hard braking. Sold as a pair.",
  },
  {
    id: 11,
    name: "Fork Seal Kit",
    brand: "Generic",
    category: "Suspension",
    partNumber: "GN-FSK-43MM",
    compatibility: "Universal — 43 mm inner diameter forks",
    price: 4_200,
    status: "Low Stock",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "High-quality polyurethane fork seal and dust wiper kit for 43 mm inverted forks. Prevents oil leaks and dirt ingress. Includes two seals and two wipers.",
  },
  {
    id: 12,
    name: "Clutch Lever Assembly",
    brand: "KTM",
    category: "Drivetrain",
    partNumber: "KTM-CL-390-ADV",
    compatibility: "KTM Duke 390, Adventure 390 (2020–2026)",
    price: 6_800,
    status: "Pre Order",
    image:
      "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "OEM adjustable clutch lever and perch assembly for KTM 390 series. CNC-machined aluminium with 6-position reach adjustment. Direct bolt-on replacement.",
  },
];

export const PART_CATEGORIES: PartCategory[] = [
  "Engine",
  "Brakes",
  "Suspension",
  "Electrical",
  "Body & Frame",
  "Drivetrain",
  "Exhaust",
  "Tyres",
];

export const PART_BRANDS: PartBrand[] = [
  "Yamaha",
  "Honda",
  "Suzuki",
  "Kawasaki",
  "KTM",
  "Generic",
  "Brembo",
  "Öhlins",
  "Michelin",
  "NGK",
];

export const MAX_PART_PRICE = 100_000;
