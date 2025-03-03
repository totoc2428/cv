import { Tag } from "../types/exp/tag";

const TAG_CACHE = new Map<string, Tag[]>();

export const TagService = {
  async getTags(retries = 3): Promise<Tag[]> {
    // Return cached tags if available
    if (TAG_CACHE.has("all")) {
      return TAG_CACHE.get("all") || [];
    }

    while (retries > 0) {
      try {
        const response = await fetch("/json/exp/tags.json");
        if (!response.ok) throw new Error("Failed to fetch tags");
        const tags = await response.json();
        TAG_CACHE.set("all", tags);
        return tags;
      } catch (error) {
        console.error(`Error loading tags (${retries} retries left):`, error);
        retries--;
        if (retries === 0) return [];
        // Wait 1 second before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return [];
  },

  async getTagById(id: string): Promise<Tag | undefined> {
    const tags = await this.getTags();
    return tags.find((tag) => tag.id === id);
  },

  async getTagsByIds(ids: string[]): Promise<Tag[]> {
    const allTags = await this.getTags();
    return allTags.filter((tag) => ids.includes(tag.id));
  },
};
