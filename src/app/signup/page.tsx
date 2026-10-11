import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";
import { socialProviders } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন আপ" };

export default async function SignUpPage() {
  if (await getCurrentUser()) redirect("/");

  return <SignUpForm providers={socialProviders} />;
}
