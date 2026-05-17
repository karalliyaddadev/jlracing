import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";

export const metadata: Metadata = {
  title: "JL Racing - Sri Lanka’s No.1 High Performance Bike Dealership",
  description:
    "Sri Lanka’s premier destination for high-performance motorcycles, genuine spare parts, and expert services.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <NewsLetter />
        <Footer />
      </body>
    </html>
  );
}
