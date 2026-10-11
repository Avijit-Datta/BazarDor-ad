import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SortedProductGrid from "@/components/SortedProductGrid";
import EmptyState from "@/components/EmptyState";
import { getAllCategories, getAllProducts } from "@/lib/api";
import { safeDecode } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = safeDecode((await params).slug);
  try {
    const category = (await getAllCategories()).find((c) => c.slug === slug);
    if (category) return { title: category.nameBn };
  } catch {
    /* fall through to the default title */
  }
  return { title: "ক্যাটাগরি" };
}

export default async function CategoryPage({ params }: Props) {
  const slug = safeDecode((await params).slug);
  const [categories, products] = await Promise.all([getAllCategories(), getAllProducts()]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = products.filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex items-center gap-4 rounded-2xl border border-base-content/10 bg-base-100 p-5 sm:p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {category.icon}
        </div>
        <div>
          <h1 className="text-xl font-bold text-base-content sm:text-2xl">{category.nameBn}</h1>
          <p className="text-sm text-base-content/55">{items.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          emoji="📦"
          title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
          subtitle="অন্য কোনো ক্যাটাগরি থেকে পণ্য দেখুন।"
        />
      ) : (
        <SortedProductGrid products={items} />
      )}
    </div>
  );
}
