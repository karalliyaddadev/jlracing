"use client";
import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      className="bikedetail__back"
    >
      ← Back to {label}
    </Link>
  );
}
