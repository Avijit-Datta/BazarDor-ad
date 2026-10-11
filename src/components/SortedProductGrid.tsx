"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

type SortOption = "default" | "asc" | "desc";

/** Sort dropdown + product grid for a category page (sorting is client-side). */
export default function SortedProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const items = useMemo(() => {
    if (sort === "asc") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-base-content/10 bg-base-100 px-4 py-3 sm:px-5">
        <label htmlFor="sort" className="text-sm text-base-content/60">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="select select-bordered select-sm appearance-none pr-8 sm:select-md"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-base-content/55">মোট {items.length}টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
