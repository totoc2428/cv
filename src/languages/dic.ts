import enTranslations from "../../public/json/language/en.json";
import frTranslations from "../../public/json/language/fr.json";

export type Language = "en" | "fr";

export const isLanguage = (value: unknown): value is Language => {
  return value === "en" || value === "fr";
};

export const getLanguageFromPathname = (pathname: string): Language | null => {
  const matchedLang = pathname.match(/^\/(en|fr)(?=\/|$)/)?.[1];
  return isLanguage(matchedLang) ? matchedLang : null;
};

export const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export const getTranslation = (
  key: string,
  language: Language = "fr",
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
