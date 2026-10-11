import { getAllProducts } from "@/lib/api";
import { formatBnNumber, unitShort } from "@/lib/bn";
import type { Product } from "@/types";
import PriceChangeBadge from "./PriceChangeBadge";

export default async function PriceMarquee() {
  let products: Product[] = [];
  try {
    products = await getAllProducts();
  } catch (err) {
    console.error("[PriceMarquee] failed to load products:", err);
  }

  if (!products.length) return null;

  const items = products.slice(0, 20);
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-base-content/10 bg-base-200/70 py-2">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {track.map((p, i) => (
          <div key={`${p.id}-${i}`} className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-base">{p.image || p.categoryIcon}</span>
            <span className="font-medium text-base-content/90">{p.nameBn}</span>
            <span className="text-base-content/70">
              {formatBnNumber(p.today)} টাকা/{unitShort(p.unit)}
            </span>
            <PriceChangeBadge change={p.change} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
