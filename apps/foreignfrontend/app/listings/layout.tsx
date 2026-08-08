import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japanese Vehicles for Export | Cars, Bikes & Machinery",
  description:
    "Browse available Japanese vehicles for export, including automobiles, motorcycles, and heavy machinery. Find quality vehicles ready for global delivery through JLR International.",
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
