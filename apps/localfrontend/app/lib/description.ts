export function getDescriptionPoints(
  description: string | null | undefined,
): string[] {
  return (description ?? "")
    .replace(/\r/g, "")
    .replace(/\s*•\s*/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^[*-]\s*/, "").trim())
    .filter(Boolean);
}
