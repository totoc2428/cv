import { ExpTranslated, Exp } from "../types/exp/exp";
import { TagService } from "./tagService";
import { Language, getTranslation } from "../languages/dic";
import { formatDate } from "../utils/dateFormatter";

const EXP_CACHE = new Map<Language, ExpTranslated[]>();
const LOADING_PROMISE = new Map<Language, Promise<ExpTranslated[]>>();

export const ExpService = {
  clearCache() {
    EXP_CACHE.clear();
  },

  async getExps(language: Language): Promise<ExpTranslated[]> {
    // Check cache first
    if (EXP_CACHE.has(language)) {
      return EXP_CACHE.get(language) || [];
    }

    // Prevent multiple simultaneous requests for the same language
    if (LOADING_PROMISE.has(language)) {
      return LOADING_PROMISE.get(language)!;
    }

    const promise = (async () => {
      try {
        const response = await fetch("/json/exp/exps.json");
        if (!response.ok) throw new Error("Failed to fetch experiences");

        const exps: Exp[] = await response.json();
        const tagsPromises = exps.map((exp) =>
          TagService.getTagsByIds(exp.tags)
        );

        // Load all tags in parallel
        const allTags = await Promise.all(tagsPromises);

        const expsWithTags = exps.map((exp, index) => ({
          id: exp.id,
          title: exp.title[language],
          location: exp.location,
          value: exp.subTitle[language],
          description: exp.description[language],
          startDate: formatDate(exp.start_date, language),
          endDate:
            exp.end_date === "null" || exp.end_date === null
              ? getTranslation("exp.date_no", language)
              : `${getTranslation("exp.date_link_btw")} ${formatDate(
                  exp.end_date,
                  language
                )}`,
          tags: allTags[index],
          skills: exp.skills,
        }));

        EXP_CACHE.set(language, expsWithTags);
        return expsWithTags;
      } catch (error) {
        console.error("Error loading experiences:", error);
        return [];
      } finally {
        LOADING_PROMISE.delete(language);
      }
    })();

    LOADING_PROMISE.set(language, promise);
    return promise;
  },
};
