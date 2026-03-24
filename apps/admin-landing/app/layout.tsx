import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JL Racing — Admin Portal",
  description:
    "Admin portal for managing POS, Local & International websites, and employees",
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
