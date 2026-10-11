"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

/** Shown when a page's data cannot be loaded (e.g. the price API is down). */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-base-content/15 bg-base-100 px-6 py-16 text-center">
        <span className="text-5xl">⚠️</span>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-base-content">তথ্য লোড করতে সমস্যা হয়েছে।</h3>
          <p className="text-sm text-base-content/60">
            কিছুক্ষণ পরে আবার চেষ্টা করুন। সমস্যা থাকলে ইন্টারনেট সংযোগ পরীক্ষা করুন।
          </p>
        </div>
        <button
          className="btn btn-primary btn-sm sm:btn-md mt-2"
          onClick={() =>
            startTransition(() => {
              router.refresh();
              reset();
            })
          }
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    </div>
  );
}
