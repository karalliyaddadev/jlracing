/** Converts a stored ratio like "16:9" into a CSS aspect-ratio value ("16 / 9"). */
export function toCssAspectRatio(
  ratio: string | null | undefined,
  fallback = "16 / 9",
): string {
  const match = /^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/.exec(
    ratio ?? "",
  );
  if (!match) return fallback;
  const [, w, h] = match;
  return Number(w) > 0 && Number(h) > 0 ? `${w} / ${h}` : fallback;
}
