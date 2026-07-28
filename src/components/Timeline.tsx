"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/types";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent md:left-1/2 md:-translate-x-px" />
      <ul className="space-y-8">
        {events.map((event, i) => (
          <motion.li
            key={`${event.year}-${event.title}`}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`relative flex flex-col gap-2 pl-10 md:w-1/2 md:pl-0 ${
              i % 2 === 0
                ? "md:pr-10 md:text-right md:ml-0"
                : "md:pl-10 md:ml-auto"
            }`}
          >
            <span
              className={`absolute top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(16,185,129,0.6)] ${
                i % 2 === 0
                  ? "left-1.5 md:left-auto md:right-[-6.5px]"
                  : "left-1.5 md:left-[-6.5px]"
              }`}
            />
            <span className="text-sm font-semibold text-primary">
              {event.year}
            </span>
            <h4 className="text-lg font-semibold text-white">{event.title}</h4>
            <p className="text-sm text-muted">{event.description}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
