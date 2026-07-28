import type { CounterStat, Skill, Specialization } from "@/types";

export const skills: Skill[] = [
  { name: "C++", level: 94, icon: "cpp", category: "Language" },
  { name: "JavaScript", level: 86, icon: "javascript", category: "Language" },
  { name: "TypeScript", level: 80, icon: "typescript", category: "Language" },
  { name: "Node.js", level: 91, icon: "nodejs", category: "Backend" },
  { name: "Express.js", level: 89, icon: "express", category: "Backend" },
  { name: "React.js", level: 84, icon: "react", category: "Frontend" },
  { name: "Next.js", level: 82, icon: "nextjs", category: "Frontend" },
  { name: "MongoDB", level: 90, icon: "mongodb", category: "Database" },
  { name: "PostgreSQL", level: 87, icon: "postgresql", category: "Database" },
  { name: "Redis", level: 85, icon: "redis", category: "Database" },
  { name: "Prisma ORM", level: 83, icon: "prisma", category: "Database" },
  {
    name: "Data Structures & Algorithms",
    level: 92,
    icon: "dsa",
    category: "Core",
  },
  { name: "Communication", level: 86, icon: "communication", category: "Soft" },
  { name: "System Design", level: 82, icon: "systemdesign", category: "Core" },
];

export const heroCounters: CounterStat[] = [
  { value: 600, suffix: "+", label: "Problems Solved" },
  { value: 6, suffix: "+", label: "Projects Created" },
  { value: 8.85, suffix: "", label: "CGPA", decimals: 2 },
];

export const specializations: Specialization[] = [
  {
    title: "Scalable Backend Systems",
    description:
      "Building RESTful APIs, authentication systems, background workers, caching layers, and distributed architectures.",
    icon: "server",
  },
  {
    title: "Data Structures & Algorithms",
    description:
      "Solving algorithmic challenges with strong foundations in data structures, optimization techniques, and time-space complexity analysis.",
    icon: "brain",
  },
  {
    title: "Incorporating System Design",
    description:
      "Designing scalable, reliable, and fault-tolerant systems with a focus on architecture, databases, load balancing, and distributed systems to cater the mass.",
    icon: "sparkles",
  },
];
