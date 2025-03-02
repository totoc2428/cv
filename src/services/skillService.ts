import { Language } from "../languages/dic";

interface SkillData {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
}

export const SkillService = {
  async getSkillTitle(skillId: string, language: Language): Promise<string> {
    try {
      const response = await fetch("/json/exp/skills.json");
      const skills: SkillData[] = await response.json();
      const skill = skills.find((s) => s.id === skillId);
      return skill?.title[language] || skillId;
    } catch (error) {
      console.error("Error loading skill:", error);
      return skillId;
    }
  },
};
