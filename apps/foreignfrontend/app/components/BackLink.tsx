"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  const router = useRouter();
  const canGoBack = typeof window !== "undefined" && window.history.length > 1;

  if (!canGoBack) {
    return (
      <Link href={href} className="bikedetail__back">
        ← Back to {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="bikedetail__back"
      style={{
        background: "none",
        border: "none",
        font: "inherit",
        cursor: "pointer",
        padding: 0,
      }}
    >
      ← Back to {label}
    </button>
  );
}
