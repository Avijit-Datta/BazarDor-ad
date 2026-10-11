"use client";

import { useSignOut } from "@/lib/use-sign-out";

export default function SignOutButton() {
  const signOut = useSignOut();

  return (
    <button onClick={() => void signOut()} className="btn btn-outline btn-error btn-sm sm:btn-md">
      ↩ সাইন আউট
    </button>
  );
}
