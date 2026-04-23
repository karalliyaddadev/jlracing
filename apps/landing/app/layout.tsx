import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JL Racing",
  description: "Welcome to JL Racing — choose your destination",
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
