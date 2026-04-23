import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sign In — JL Racing Local CMS",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
