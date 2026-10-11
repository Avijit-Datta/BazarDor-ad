import { getAllCategories } from "@/lib/api";
import type { Category } from "@/types";
import CategoryLinks from "./CategoryLinks";

/** Fetches categories on the server and hands them to the (client) link row. */
export default async function CategoryNav() {
  let categories: Category[] = [];
  try {
    categories = await getAllCategories();
  } catch (err) {
    // The nav is non-critical; the page itself reports API problems.
    console.error("[CategoryNav] failed to load categories:", err);
  }

  return <CategoryLinks categories={categories} />;
}
