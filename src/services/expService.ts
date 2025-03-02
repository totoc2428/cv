import { Exp, ExpTranslated } from "../types/exp/exp";
import { TagService } from "./tagService";
import { Language, getTranslation } from "../languages/dic";
import { formatDate } from "../utils/dateFormatter";

export const ExpService = {
  async getExps(language: Language): Promise<ExpTranslated[]> {
    try {
      const response = await fetch("/json/exp/exps.json");
      const exps: Exp[] = await response.json();

      const expsWithTags = await Promise.all(
        exps.map(async (exp) => {
          const tags = await TagService.getTagsByIds(exp.tags);
          const endDate =
            exp.end_date === "null" || exp.end_date === null
              ? getTranslation("exp.date_no", language)
              : getTranslation("exp.date_link_btw") +
                " " +
                formatDate(exp.end_date, language);

          return {
            id: exp.id,
            title: exp.title[language],
            location: exp.location,
            value: exp.subTitle[language],
            description: exp.description[language],
            startDate: formatDate(exp.start_date, language),
            endDate,
            tags,
            skills: exp.skills, // Ajout des skills ici
          } as ExpTranslated;
        })
      );

      return expsWithTags;
    } catch (error) {
      console.error("Error loading experiences:", error);
      return [];
    }
  },
};
