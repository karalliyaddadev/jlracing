import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";

export const metadata: Metadata = {
  title: "JL Racing International — Global Vehicle Export",
  description:
    "Japanese licensed direct auction export service. We source, bid, and deliver vehicles to any country worldwide.",
  icons: { icon: "/images/international-logo.png" },
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
