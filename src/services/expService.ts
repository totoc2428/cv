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
            id: exp.id,
            title: exp.title[language],
            location: exp.location,
            value: exp.subTitle[language], // Using subTitle as value
            specialization: exp.specialization[`${language}`],
            startDate: exp.start_date,
            endDate: exp.end_date,
            tags
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
