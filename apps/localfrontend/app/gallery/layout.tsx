import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motorcycle Gallery | High-Performance Bikes Sri Lanka | JL Racing",
  description:
    "Explore JL Racing's motorcycle gallery featuring videos of the latest high-performance bikes, premium imports, and exciting riding experiences in Sri Lanka.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
