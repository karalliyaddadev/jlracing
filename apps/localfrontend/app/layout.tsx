import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";

export const metadata: Metadata = {
  title: "JL Racing — Premium Motorcycles Sri Lanka",
  description:
    "Sri Lanka's premier destination for high-performance motorcycles, genuine spare parts, and expert services.",
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
