"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Experience"
          title="Building for production"
          description="Systems shipped for real users, multi-role workflows, and measurable scale."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:left-1/2" />

          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative mb-10 pl-12 md:pl-0"
            >
              <span className="absolute left-[10px] top-6 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background shadow-[0_0_14px_rgba(16,185,129,0.7)] md:left-1/2 md:-translate-x-1/2" />

              <div className="rounded-2xl border border-white/5 bg-card p-6 md:mx-auto md:max-w-xl">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {exp.logo && (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white p-1">
                        <Image
                          src={exp.logo}
                          alt={exp.organization ?? exp.title}
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                    )}
                    <div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {exp.period}
                      </span>
                      {exp.organization && (
                        <p className="mt-1.5 text-xs text-muted">{exp.organization}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted">{exp.role}</span>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  {exp.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {exp.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/5 bg-background/50 px-3 py-2 text-center"
                    >
                      <p className="text-lg font-bold text-primary">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {exp.timeline && (
                  <div className="relative mt-6 space-y-4 border-l border-primary/20 pl-5">
                    {exp.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[22px] top-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <p className="text-sm leading-relaxed text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
