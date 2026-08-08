import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About JL Racing | Trusted Motorcycle Importer in Sri Lanka",
  description:
    "Discover JL Racing's journey as Sri Lanka's trusted high-performance motorcycle importer, delivering premium bikes, quality service, and unmatched expertise.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
