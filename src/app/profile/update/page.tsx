import type { Metadata } from "next";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট করুন" };

export default async function UpdateProfilePage() {
  const user = await requireUser("/profile/update");

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-2xl font-extrabold text-base-content sm:text-3xl">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-base-content/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-base-content/10 bg-base-100 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
          <div>
            <p className="text-lg font-bold text-base-content">{user.name}</p>
            <p className="text-sm text-base-content/55">{user.email}</p>
          </div>
        </div>
      </div>

      <UpdateProfileForm user={user} />
    </div>
  );
}
