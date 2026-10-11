import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppToaster from "@/components/AppToaster";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর | BazarDor — আজকের বাজারের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "বাজার দর — বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর, দামের পরিবর্তন ও বাজারভিত্তিক তুলনা এক জায়গায়।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={hind.variable}>
      <body>
        <div className="flex min-h-screen flex-col bg-base-200/40 text-base-content">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <AppToaster />
      </body>
    </html>
  );
}
