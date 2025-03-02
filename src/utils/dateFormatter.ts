import { Language } from "../languages/dic";

export const formatDate = (dateString: string, language: Language): string => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  switch (language) {
    case "fr":
      return `${day}/${month}/${year}`;
    case "en":
      return `${month}/${day}/${year}`;
    default:
      return dateString;
  }
};
