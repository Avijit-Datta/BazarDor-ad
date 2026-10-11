"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

/** Signs the user out, then sends them home and re-renders server components. */
export function useSignOut() {
  const router = useRouter();

  return useCallback(async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
      return;
    }
    toast.success("আপনি সাইন আউট হয়েছেন।");
    router.replace("/");
    router.refresh();
  }, [router]);
}
