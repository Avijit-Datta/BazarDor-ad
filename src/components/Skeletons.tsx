export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-base-content/10 bg-base-100 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton-shimmer h-12 w-12 rounded-xl sm:h-14 sm:w-14" />
        <div className="flex-1 space-y-2">
          <div className="skeleton-shimmer h-4 w-3/4 rounded" />
          <div className="skeleton-shimmer h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 border-t border-base-content/10 pt-3">
        <div className="space-y-2">
          <div className="skeleton-shimmer h-3 w-14 rounded" />
          <div className="skeleton-shimmer h-5 w-20 rounded" />
        </div>
        <div className="skeleton-shimmer h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function MarqueeSkeleton() {
  return <div className="skeleton-shimmer h-9 w-full" />;
}

export function CategoryNavSkeleton() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-hidden px-4 pb-2 sm:px-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-shimmer h-8 w-24 shrink-0 rounded-lg" />
      ))}
    </div>
  );
}

/** Placeholder for the Home page's three product sections while data streams in. */
export function HomeSectionsSkeleton() {
  return (
    <>
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-base-content sm:text-2xl">
          <span className="text-error">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGridSkeleton count={6} />
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-base-content sm:text-2xl">
          <span className="text-success">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGridSkeleton count={6} />
      </section>

      <section id="সব-পণ্য" className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-base-content sm:text-2xl">সব পণ্য</h2>
          <p className="text-sm text-base-content/55">পণ্য লোড হচ্ছে...</p>
        </div>
        <ProductGridSkeleton count={12} />
      </section>
    </>
  );
}

/** Generic page-level skeleton used by loading.tsx files. */
export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      <div className="skeleton-shimmer h-24 w-full rounded-2xl" />
      <ProductGridSkeleton count={8} />
    </div>
  );
}
