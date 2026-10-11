"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

/** Re-runs the server components of the current route (re-fetches the data). */
export default function RetryButton({ className = "btn btn-sm" }: { className?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => router.refresh())}
      className={className}
    >
      {pending ? <span className="loading loading-spinner loading-xs" /> : "আবার চেষ্টা করুন"}
    </button>
  );
}
