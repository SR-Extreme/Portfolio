"use client";

import { aboutTimeline } from "@/data/experience";
import { personal } from "@/data/personal";
import { motion } from "framer-motion";
import { GraduationCap, Percent, Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Timeline } from "./Timeline";

const eduCards = [
  {
    icon: GraduationCap,
    label: "Degree",
    value: personal.degree,
    sub: personal.institute,
  },
  {
    icon: Award,
    label: "CGPA",
    value: String(personal.cgpa),
    sub: "B.Tech CSE",
  },
  {
    icon: Percent,
    label: "Class X / XII",
    value: `${personal.classX} / ${personal.classXII}`,
    sub: "Academic excellence",
  },
];

export function About() {
  return (
    <section id="about" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="About"
          title="The Mind behind the Machine"
          description="Backend development, DSA, and system design — with a bias toward clean code and production reliability."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              {personal.name}
            </h3>
            <p className="mt-2 text-sm text-primary">{personal.role}</p>

            <div className="mt-5 space-y-4">
              {personal.aboutParagraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-1">
              {eduCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/5 bg-card/60 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {card.label}
                    </p>
                    <p className="mt-0.5 font-medium text-white">{card.value}</p>
                    <p className="text-sm text-muted">{card.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div>
            <h3 className="mb-8 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              Journey
            </h3>
            <Timeline events={aboutTimeline} />
          </div>
        </div>
      </div>
    </section>
  );
}
