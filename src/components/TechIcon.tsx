"use client";

import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiPrisma,
  SiCloudinary,
  SiVercel,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  } from "react-icons/si";
import {
  Code2,
  Coffee,
  Database,
  Server,
  Brain,
  Sparkles,
  MessageCircle,
  Network,
  KeyRound,
  Workflow,
  Boxes,
  Terminal,
} from "lucide-react";
import type { IconType } from "react-icons";

const map: Record<string, IconType> = {
  c: SiC,
  cpp: SiCplusplus,
  java: Coffee,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  redux: SiRedux,
  nodejs: SiNodedotjs,
  express: SiExpress,
  api: Server,
  jwt: KeyRound,
  socketio: SiSocketdotio,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  redis: SiRedis,
  prisma: SiPrisma,
  cloudinary: SiCloudinary,
  vercel: SiVercel,
  git: SiGit,
  github: SiGithub,
  vscode: Terminal,
  postman: SiPostman,
  docker: SiDocker,
  bullmq: Workflow,
  judge0: Boxes,
  dsa: Code2,
  communication: MessageCircle,
  systemdesign: Network,
  server: Server,
  brain: Brain,
  sparkles: Sparkles,
  database: Database,
};

export function TechIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Code2;
  return <Icon className={className} />;
}
