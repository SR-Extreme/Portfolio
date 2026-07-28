"use client";

import { heroCounters } from "@/data/skills";
import { personal } from "@/data/personal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiReact,
  SiMongodb,
  SiTypescript,
} from "react-icons/si";
import { ArrowRight, Code2 } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { AnimatedCounter } from "./AnimatedCounter";

const floatingIcons = [
  { Icon: SiNodedotjs, className: "top-[8%] left-[4%] text-[#68A063]", delay: 0 },
  { Icon: SiPostgresql, className: "top-[18%] right-[2%] text-[#336791]", delay: 0.4 },
  { Icon: SiRedis, className: "bottom-[28%] left-[0%] text-[#DC382D]", delay: 0.8 },
  { Icon: SiReact, className: "top-[48%] right-[-2%] text-[#61DAFB]", delay: 1.2 },
  { Icon: SiMongodb, className: "bottom-[12%] right-[8%] text-[#47A248]", delay: 1.6 },
  { Icon: SiTypescript, className: "bottom-[8%] left-[12%] text-[#3178C6]", delay: 2 },
  { Icon: Code2, className: "top-[0%] right-[28%] text-primary", delay: 0.6 },
];

function Typewriter() {
  const roles = personal.typingRoles;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 35 : 70;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const tick = setTimeout(() => {
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(tick);
  }, [text, deleting, index, roles]);

  return (
    <span className="inline-flex min-h-[1.2em] items-center text-primary">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="ml-0.5 inline-block h-[1em] w-[2px] bg-primary"
      />
    </span>
  );
}

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center pt-24 pb-16"
    >
      <div className="container-max section-pad grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="order-2 lg:order-1">
          <Badge>{personal.badge}</Badge>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted sm:text-xl"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-xl font-medium text-white/90 sm:text-2xl"
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {personal.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button magnetic size="lg" onClick={() => scrollTo("#projects")}>
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("#contact")}
            >
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-8"
          >
            {heroCounters.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </p>
                <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative order-1 mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px] lg:order-2 lg:max-w-[440px]"
        >
          {floatingIcons.map(({ Icon, className, delay }, i) => (
            <motion.div
              key={i}
              className={`absolute z-20 rounded-xl border border-white/10 bg-card/80 p-2.5 shadow-lg backdrop-blur-md ${className}`}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5 + i * 0.2,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
          ))}

          <div className="relative mx-auto aspect-square w-[82%]">
            <div className="absolute -inset-[3px] rounded-full gradient-border opacity-90" />
            <div className="absolute inset-[3px] overflow-hidden rounded-full border border-white/10 bg-card/60 shadow-[0_0_60px_rgba(16,185,129,0.15)] backdrop-blur-sm">
              <Image
                src={personal.portraitPath}
                alt={personal.name}
                fill
                priority
                sizes="(max-width: 768px) 280px, 400px"
                className="object-cover object-[center_18%] scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_40%)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
