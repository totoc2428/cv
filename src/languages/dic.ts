import enTranslations from "../../public/json/language/en.json";
import frTranslations from "../../public/json/language/fr.json";

export type Language = "en" | "fr";

export const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export const getTranslation = (
  key: string,
  language: Language = "fr"
): string => {
  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    if (!value || typeof value !== "object") {
      return key;
    }
    value = value[k];
  }

  return typeof value === "string" ? value : key;
};
