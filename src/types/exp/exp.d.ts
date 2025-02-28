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
  title: string;
  location: string;
  value: Translation;
  specialization: TranslationArray;
  description?: string;
  start_date: string;  // Changed from startDate
  end_date: string;    // Changed from endDate
  tags: string[];      // Changed from Tag[] to string[]
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
