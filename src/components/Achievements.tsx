"use client";

import { specializations } from "@/data/skills";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { TechIcon } from "./TechIcon";

export function Achievements() {
  return (
    <section id="specialize" className="relative z-10 py-24 md:py-28">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Focus"
          title="What I Specialize In"
          description="Three pillars that define how I build and solve problems."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {specializations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card p-6"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-50" />
              <span className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <TechIcon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="relative font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
