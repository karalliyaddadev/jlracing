import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motorcycles for Sale Sri Lanka | Imported Bikes | JL Racing",
  description:
    "Browse JL Racing's available stock of high-performance motorcycles. Find premium imported bikes ready for purchase from Sri Lanka's trusted motorcycle importer.",
};

export default function BikesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
