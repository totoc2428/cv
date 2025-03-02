import { Tag } from "./tag";
import { ExpSkill } from "./skill";

export interface ExpTranslated {
  id: string;
  title: string;
  location: string;
  value: string;
  description: string;
  startDate: string;
  endDate: string | null;
  tags: Tag[];
  skills?: ExpSkill;
}
