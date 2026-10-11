import { Suspense } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import RetryButton from "@/components/RetryButton";
import { HomeSectionsSkeleton } from "@/components/Skeletons";
import { getAllProducts } from "@/lib/api";
import { formatBnDate } from "@/lib/bn";
import { getFallers, getRisers } from "@/lib/products";
import type { Product } from "@/types";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 rounded-3xl border border-base-content/10 bg-gradient-to-br from-base-100 via-base-100 to-primary/10 p-6 sm:p-10 lg:flex-row lg:gap-12">
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
            {formatBnDate()}
          </span>
          <h1 className="text-3xl font-extrabold leading-tight text-base-content sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mx-auto max-w-xl text-sm text-base-content/65 sm:text-base lg:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/images/hero-basket.png"
            alt="তাজা শাকসবজির ঝুড়ি"
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
            className="h-auto w-56 drop-shadow-xl sm:w-72 lg:w-80"
          />
        </div>
      </section>

      {/* The hero renders instantly; product data streams in behind a skeleton. */}
      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeSections />
      </Suspense>
    </div>
  );
}

async function HomeSections() {
  let products: Product[];
  try {
    products = await getAllProducts();
  } catch (err) {
    console.error("[Home] failed to load products:", err);
    return (
      <div className="alert alert-error flex items-center justify-between rounded-2xl text-sm">
        <span>তথ্য লোড করতে সমস্যা হয়েছে।</span>
        <RetryButton />
      </div>
    );
  }

  const risers = getRisers(products);
  const fallers = getFallers(products);

  return (
    <>
      {/* Risers */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-base-content sm:text-2xl">
          <span className="text-error">▲</span> আজ দাম বেড়েছে
        </h2>
        {risers.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/55">আজ কোনো পণ্যের দাম বাড়েনি।</p>
        )}
      </section>

      {/* Fallers */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-base-content sm:text-2xl">
          <span className="text-success">▼</span> আজ দাম কমেছে
        </h2>
        {fallers.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/55">আজ কোনো পণ্যের দাম কমেনি।</p>
        )}
      </section>

      {/* All products */}
      <section id="সব-পণ্য" className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-base-content sm:text-2xl">সব পণ্য</h2>
          <p className="text-sm text-base-content/55">মোট {products.length} টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
