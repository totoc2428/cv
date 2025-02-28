import { Exp } from "../types/exp/exp";

export const ExpService = {
  async getExps(): Promise<Exp[]> {
    try {
      const response = await fetch("/json/exp/exps.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading experiences:", error);
      return [];
    }
  }
};
