import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { socialProviders } from "@/lib/auth";
import { firstParam, safeRedirect } from "@/lib/redirect";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SignInPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const redirectTo = safeRedirect(sp.redirect);

  // Already signed in? Nothing to do here.
  if (await getCurrentUser()) redirect(redirectTo);

  return (
    <SignInForm
      redirectTo={redirectTo}
      providers={socialProviders}
      reason={firstParam(sp.reason)}
      oauthError={firstParam(sp.error)}
    />
  );
}
