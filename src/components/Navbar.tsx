import { Suspense } from "react";
import Link from "next/link";
import { formatBnDate } from "@/lib/bn";
import { getCurrentUser } from "@/lib/session";
import CategoryNav from "./CategoryNav";
import PriceMarquee from "./PriceMarquee";
import UserMenu from "./UserMenu";
import { CategoryNavSkeleton, MarqueeSkeleton } from "./Skeletons";

export default async function Navbar() {
  const user = await getCurrentUser();
  const today = formatBnDate();

  return (
    <header className="sticky top-0 z-40 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-xl shadow-sm sm:h-11 sm:w-11">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-base-content sm:text-lg">বাজার দর</span>
            <span className="block text-[11px] text-base-content/55 sm:text-xs">{today}</span>
          </span>
        </Link>

        <UserMenu user={user} />
      </div>

      <Suspense fallback={<CategoryNavSkeleton />}>
        <CategoryNav />
      </Suspense>

      <Suspense fallback={<MarqueeSkeleton />}>
        <PriceMarquee />
      </Suspense>
    </header>
  );
}
