import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { avatarFor } from "@/lib/avatar";
import type { AppUser } from "@/types";

/**
 * Current user for this request (null when signed out). Memoised per request,
 * so the layout and the page can both call it for the price of one DB lookup.
 */
export const getCurrentUser = cache(async (): Promise<AppUser | null> => {
  // Read headers OUTSIDE the try/catch: Next.js signals "this route is dynamic"
  // by throwing from headers(), and that signal must not be swallowed.
  const requestHeaders = await headers();
  try {
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session) return null;
    const { id, name, email, image } = session.user;
    return { id, name, email, avatar: image || avatarFor(name) };
  } catch (err) {
    console.error("[auth] getSession failed:", err);
    return null;
  }
});

/**
 * Server-side route guard. Use at the top of every protected page — the
 * proxy only checks that a session cookie exists, this verifies it for real.
 */
export async function requireUser(returnTo: string): Promise<AppUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/signin?redirect=${encodeURIComponent(returnTo)}&reason=protected`);
  }
  return user;
}