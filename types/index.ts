export type SkillCategory = 'Software Development' | 'Security & Networking' | 'Leadership';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 1-5, used for the proficiency bar
}

export interface Certification {
  name: string;
  issuer: string;
  category: SkillCategory;
  year?: string;
}

export interface Project {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  problem: string;
  action: string;
  result: string;
  stack: string[];
  image: string;
  hasArchitecture: boolean;
}
