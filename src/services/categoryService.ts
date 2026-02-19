import { Category } from "../types/exp/category";

const CATEGORY_CACHE: Category[] | null = null;
let cache: Category[] | null = CATEGORY_CACHE;

export const CategoryService = {
  async getCategories(): Promise<Category[]> {
    if (cache) return cache;

    const response = await fetch("/json/exp/category.json");
    if (!response.ok) throw new Error("Failed to fetch categories");
    const categories: Category[] = await response.json();
    cache = categories;
    return categories;
  },

  async getCategoriesByTag(tag: string): Promise<Category[]> {
    const all = await this.getCategories();
    return all.filter((c) => c.tag === tag);
  },

  clearCache() {
    cache = null;
  },
};
