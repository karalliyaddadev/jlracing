import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Order Motorcycles Sri Lanka | Reserve Your Dream Bike",
  description:
    "Reserve upcoming high-performance motorcycles with JL Racing. Explore available pre-order bikes and secure your next premium imported motorcycle in Sri Lanka.",
};

export default function PreOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
