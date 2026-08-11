import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motorcycle Spare Parts Sri Lanka | Genuine Parts | JL Racing",
  description:
    "Find genuine motorcycle spare parts and accessories from JL Racing. Quality components and reliable support for high-performance motorcycles in Sri Lanka.",
};

export default function SparePartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
