export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  stats: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  period: string;
  organization?: string;
  logo?: string;
  description: string;
  timeline?: string[];
  highlights: string[];
  tech: string[];
  stats: { label: string; value: string }[];
}

export interface TechCategory {
  name: string;
  items: { name: string; icon: string }[];
}

export interface CodingProfile {
  name: string;
  username: string;
  url: string;
  icon: string;
  color: string;
}

export interface CounterStat {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export interface Specialization {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
