"use client";

import { skills } from "@/data/skills";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";
import { TechIcon } from "./TechIcon";

function SkillBar({
  name,
  level,
  icon,
  delay,
}: {
  name: string;
  level: number;
  icon: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="rounded-2xl border border-white/5 bg-card/50 p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TechIcon name={icon} className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium text-white">{name}</span>
        </div>
        <span className="text-sm font-semibold text-primary">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: delay + 0.1 }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Skills"
          title="Proficiency map"
          description="Self-assessed depth across languages, backend, databases, and core CS fundamentals."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              icon={skill.icon}
              delay={(i % 6) * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
