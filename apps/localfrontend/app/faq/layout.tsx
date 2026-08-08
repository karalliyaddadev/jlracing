import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JL Racing FAQ | Motorcycle Import & Sales Questions Sri Lanka",
  description:
    "Get answers to common questions about motorcycle imports, purchases, pre-orders, spare parts, and services provided by JL Racing Sri Lanka.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
