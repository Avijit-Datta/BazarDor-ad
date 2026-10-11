"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

export default function CategoryLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav className="scrollbar-none mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
      {categories.map((c) => {
        const href = `/category/${c.slug}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={c.slug}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
