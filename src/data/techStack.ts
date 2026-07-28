import type { TechCategory } from "@/types";

export const techStack: TechCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "C", icon: "c" },
      { name: "C++", icon: "cpp" },
      { name: "Java", icon: "java" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Redux", icon: "redux" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", icon: "api" },
      { name: "JWT", icon: "jwt" },
      { name: "Socket.IO", icon: "socketio" },
    ],
  },
  {
    name: "Database",
    items: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "Redis", icon: "redis" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    name: "Cloud",
    items: [
      { name: "Cloudinary", icon: "cloudinary" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    name: "Developer Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Postman", icon: "postman" },
      { name: "Docker", icon: "docker" },
      { name: "BullMQ", icon: "bullmq" },
      { name: "Judge0", icon: "judge0" },
    ],
  },
];
