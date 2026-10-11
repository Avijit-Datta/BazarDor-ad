import type { Product } from "@/types";

/** Top 6 products whose price went up today (largest rise first). */
export function getRisers(products: Product[]): Product[] {
  return [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

/** Top 6 products whose price dropped today (largest drop first). */
export function getFallers(products: Product[]): Product[] {
  return [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
}

/** Decode a dynamic route segment without throwing on malformed input. */
export function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
