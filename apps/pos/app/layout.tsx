import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JL Racing POS",
  description: "POS admin portal for JL Racing operations"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
