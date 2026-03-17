import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JL Racing — Choose Your Destination",
  description:
    "Select your regional experience — Local (Colombo) or International (Japan)",
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
