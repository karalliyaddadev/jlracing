import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact JLR International | Japanese Vehicle Export Experts",
  description:
    "Contact JLR International for Japanese vehicle exports, inquiries, and support. Find answers about purchasing, shipping, and global vehicle delivery.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
