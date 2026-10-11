"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { avatarFor, isGeneratedAvatar } from "@/lib/avatar";
import type { AppUser } from "@/types";

export default function UpdateProfileForm({ user }: { user: AppUser }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }
    setBusy(true);
    try {
      const { error } = await authClient.updateUser({
        name: trimmed,
        // Re-generate the initials avatar, but never overwrite a real
        // Google / GitHub profile picture.
        ...(isGeneratedAvatar(user.avatar) ? { image: avatarFor(trimmed) } : {}),
      });
      if (error) {
        toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-base-content/10 bg-base-100 p-5 sm:p-6"
    >
      <h2 className="text-lg font-bold text-base-content">তথ্য</h2>
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
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" disabled={busy} className="btn btn-primary w-full">
        {busy ? <span className="loading loading-spinner loading-sm" /> : "আপডেট"}
      </button>
    </form>
  );
}
