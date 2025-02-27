import { tag } from "./tag";

export interface Exp {
  id: string;
  title: string;
  location: string;
  value: string;
  specialization: string[];
  description: string;
  startDate: string;
  endDate: string;
  tags: tag[];
}
