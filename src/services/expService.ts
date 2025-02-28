import { Exp } from "../types/exp/exp";
import { TagService } from "./tagService";

export const ExpService = {
  async getExps(): Promise<Exp[]> {
    try {
      const response = await fetch("/json/exp/exps.json");
      const exps = await response.json();
      
      // Pour chaque expérience, charger les tags complets
      const expWithTags = await Promise.all(
        exps.map(async (exp: Exp) => {
          const tags = await TagService.getTagsByIds(exp.tags);
          return { ...exp, tags };
        })
      );
      
      return expWithTags;
    } catch (error) {
      console.error("Error loading experiences:", error);
      return [];
    }
  }
};
