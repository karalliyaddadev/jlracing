import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motorcycle Blog Sri Lanka | News, Reviews & Guides | JL Racing",
  description:
    "Read JL Racing's motorcycle blog for the latest bike news, reviews, maintenance tips, buying guides, and high-performance motorcycle updates.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
