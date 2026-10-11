"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import SocialButtons, { type SocialProvider } from "./SocialButtons";

interface Props {
  /** Where to go after a successful sign in (already validated on the server). */
  redirectTo: string;
  providers: { google: boolean; github: boolean };
  /** "protected" when the user was bounced from a protected page. */
  reason?: string;
  /** Set by BetterAuth when an OAuth round-trip failed. */
  oauthError?: string;
}

export default function SignInForm({ redirectTo, providers, reason, oauthError }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Fixed ids keep React StrictMode's double effect from showing duplicates.
    if (reason === "protected") {
      toast.error("এই পেজ দেখতে প্রথমে সাইন ইন করুন।", { id: "auth-required" });
    }
    if (oauthError) {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।", { id: "oauth-error" });
    }
  }, [reason, oauthError]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("ইমেইল এবং পাসওয়ার্ড দিন।");
      return;
    }
    setBusy(true);
    try {
      const { error: authError } = await authClient.signIn.email({ email, password });
      if (authError) {
        const msg = authErrorMessage(authError, "সাইন ইন ব্যর্থ হয়েছে।");
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.replace(redirectTo);
      router.refresh();
    } catch {
      const msg = "সাইন ইন ব্যর্থ হয়েছে।";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function handleSocial(provider: SocialProvider) {
    setBusy(true);
    try {
      // On success the browser is redirected to the provider, so we leave
      // `busy` on until the page unloads.
      const { error: authError } = await authClient.signIn.social({
        provider,
        callbackURL: redirectTo,
        errorCallbackURL: "/signin",
      });
      if (authError) {
        toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।");
        setBusy(false);
      }
    } catch {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-base-content sm:text-3xl">সাইন ইন</h1>
        <p className="mt-2 text-sm text-base-content/60">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-base-content/10 bg-base-100 p-6 sm:p-7"
      >
        {error && <div className="alert alert-error text-sm">{error}</div>}

        <div className="form-control">
          <label htmlFor="email" className="label pb-1 text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="password" className="label pb-1 text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>

        <SocialButtons providers={providers} disabled={busy} onSelect={handleSocial} />

        <p className="text-center text-sm text-base-content/60">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-base-content/50 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
