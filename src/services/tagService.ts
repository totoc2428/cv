import { Tag } from "../types/exp/tag";

export const TagService = {
  async getTags(): Promise<Tag[]> {
    try {
      const response = await fetch("/json/exp/tags.json");
      return await response.json();
    } catch (error) {
      console.error("Error loading tags:", error);
      return [];
    }
  },

  async getTagById(id: string): Promise<Tag | undefined> {
    const tags = await this.getTags();
    return tags.find(tag => tag.id === id);
  },

  async getTagsByIds(ids: string[]): Promise<Tag[]> {
    const allTags = await this.getTags();
    return allTags.filter(tag => ids.includes(tag.id));
  }
};
