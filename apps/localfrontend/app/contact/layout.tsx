import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact JL Racing | Premium Motorcycle Dealer Sri Lanka",
  description:
    "Contact JL Racing for high-performance motorcycle sales, pre-orders, spare parts, and inquiries. Our team is ready to help you find your ideal bike.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
