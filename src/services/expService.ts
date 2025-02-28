import { Exp, ExpTranslated } from "../types/exp/exp";
import { TagService } from "./tagService";
import { Language } from "../languages/dic";

export const ExpService = {
  async getExps(language: Language): Promise<ExpTranslated[]> {
    try {
      const response = await fetch("/json/exp/exps.json");
      const exps: Exp[] = await response.json();
      
      const expsWithTags = await Promise.all(
        exps.map(async (exp) => {
          const tags = await TagService.getTagsByIds(exp.tags);
          return {
            ...exp,
            tags,
            value: exp.value[`${language}_value`],
            specialization: exp.specialization[`${language}_value`],
            startDate: exp.start_date,
            endDate: exp.end_date
          } as ExpTranslated;
        })
      );
      
      return expsWithTags;
    } catch (error) {
      console.error("Error loading experiences:", error);
      return [];
    }
  }
};
