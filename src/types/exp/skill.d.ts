export interface skill {
  id: string;
  link: string;
  value: string;
  description: string;
}

export interface SkillTranslations {
  en: string;
  fr: string;
}

export interface Skill {
  id: string;
  title: SkillTranslations;
  description: SkillTranslations;
}

export interface ExpSkill {
  [key: string]: SkillTranslations;
}
