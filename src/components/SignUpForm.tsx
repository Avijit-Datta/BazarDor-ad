"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { avatarFor } from "@/lib/avatar";
import SocialButtons, { type SocialProvider } from "./SocialButtons";

export default function SignUpForm({
  providers,
}: {
  providers: { google: boolean; github: boolean };
}) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (!trimmedName || !email || !password || !confirm) {
      setError("সব ঘর পূরণ করুন।");
      return;
    }
    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }
    if (password !== confirm) {
      setError("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setBusy(true);
    try {
      const { error: authError } = await authClient.signUp.email({
        name: trimmedName,
        email,
        password,
        image: avatarFor(trimmedName),
      });
      if (authError) {
        const msg = authErrorMessage(authError, "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
      router.replace("/signin");
    } catch {
      const msg = "রেজিস্ট্রেশন ব্যর্থ হয়েছে।";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function handleSocial(provider: SocialProvider) {
    setBusy(true);
    try {
      const { error: authError } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
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
        <h1 className="text-2xl font-extrabold text-base-content sm:text-3xl">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-base-content/60">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-base-content/10 bg-base-100 p-6 sm:p-7"
      >
        {error && <div className="alert alert-error text-sm">{error}</div>}

        <div className="form-control">
          <label htmlFor="name" className="label pb-1 text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="input input-bordered w-full"
          />
        </div>

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="confirm" className="label pb-1 text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="আবার লিখুন"
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <SocialButtons providers={providers} disabled={busy} onSelect={handleSocial} />

        <p className="text-center text-sm text-base-content/60">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            সাইন ইন করুন
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
