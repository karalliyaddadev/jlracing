import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Export Gallery | Japanese Cars & Machinery | JLR",
  description:
    "Explore JLR International's gallery showcasing Japanese automobiles, motorcycles, heavy machinery, and successful vehicle exports delivered worldwide.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
