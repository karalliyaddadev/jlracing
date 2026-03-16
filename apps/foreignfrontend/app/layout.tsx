import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bike Foreign Frontend",
  description: "Foreign market frontend for Bike Project"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
