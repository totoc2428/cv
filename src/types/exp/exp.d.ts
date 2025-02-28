import { Tag } from "./tag";

interface Translation {
  en_value: string;
  fr_value: string;
}

interface TranslationArray {
  en_value: string[];
  fr_value: string[];
}

export interface Exp {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  location: string;
  subTitle: {
    en: string;
    fr: string;
  };
  specialization: {
    en: string[];
    fr: string[];
  };
  start_date: string;
  end_date: string;
  tags: string[];
}

export interface ExpTranslated {
  id: string;
  title: string;
  location: string;
  value: string;
  specialization: string[];
  description?: string;
  startDate: string;
  endDate: string;
  tags: Tag[];
}
