"use client";

import { techStack } from "@/data/techStack";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { TechIcon } from "./TechIcon";

export function TechStack() {
  return (
    <section id="tech-stack" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I deal with"
          description="A carefully chosen stack for building performant, scalable, and maintainable applications."
        />

        <div className="space-y-10">
          {techStack.map((category, ci) => (
            <div key={category.name}>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted"
              >
                {category.name}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: (ci * 0.05 + i * 0.04) % 0.4 }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    className="group flex items-center gap-2.5 rounded-2xl border border-white/5 bg-card px-4 py-3 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
                    data-cursor="button"
                  >
                    <span className="text-primary transition-transform group-hover:scale-110">
                      <TechIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-white">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
