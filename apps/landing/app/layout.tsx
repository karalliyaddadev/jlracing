import "./globals.css";
import type { Metadata } from "next";

const TITLE = "JL Racing | High-Performance Motorcycles & Worldwide Vehicle Imports";
const DESCRIPTION =
  "Explore JL Racing. Discover high-performance motorcycles, track bikes, and precision parts, alongside our end-to-end worldwide vehicle import and shipping services.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: "/logo.png" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
