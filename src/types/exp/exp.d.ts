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
  description: {
    en: string;
    fr: string;
  };
  start_date: string;
  end_date: string | null;
  tags: string[];
  skills?: ExpSkill;
}

export interface ExpTranslated {
  skills: any;
  id: string;
  title: string;
  location: string;
  value: string;
  description: string;
  startDate: string;
  endDate: string;
  tags: Tag[];
}
