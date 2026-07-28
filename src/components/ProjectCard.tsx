"use client";

import type { Project } from "@/types";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Button } from "./Button";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const displayTech = project.techStack.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
    >
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        glareEnable
        glareMaxOpacity={0.12}
        glareColor="#10B981"
        glarePosition="all"
        scale={1.01}
        transitionSpeed={1200}
        className="h-full"
      >
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-card transition-colors hover:border-primary/25">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0c10]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-primary">{project.description}</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.longDescription}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {project.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/5 bg-background/60 px-2 py-2 text-center"
                >
                  <p className="text-sm font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.features.slice(0, 5).map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {displayTech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-muted"
                >
                  {t}
                </span>
              ))}
              {project.techStack.length > 6 && (
                <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] text-muted">
                  +{project.techStack.length - 6}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
              >
                <Button size="sm" magnetic>
                  <ExternalLink className="h-3.5 w-3.5" />
                  {project.liveUrl === "#" ? "Coming Soon" : "Live Demo"}
                </Button>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
              >
                <Button size="sm" variant="outline">
                  <FaGithub className="h-3.5 w-3.5" />
                  GitHub
                </Button>
              </a>
            </div>
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
}
