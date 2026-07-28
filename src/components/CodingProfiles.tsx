"use client";

import { codingProfiles } from "@/data/codingProfiles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, Flame, Trophy } from "lucide-react";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { AnimatedCounter } from "./AnimatedCounter";

interface LeetCodeData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number | null;
  contestRating: number | null;
}

interface GfgData {
  codingScore: number;
  problemsSolved: number;
  instituteRank: number;
  profileUrl: string;
}

function StatBox({
  label,
  value,
  animate = true,
}: {
  label: string;
  value: number | string;
  animate?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-background/50 p-3 text-center">
      <p className="text-xl font-bold text-white">
        {animate && typeof value === "number" ? (
          <AnimatedCounter value={value} />
        ) : (
          value
        )}
      </p>
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

function MetricRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-background/50 px-3 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

export function CodingProfiles() {
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [gfg, setGfg] = useState<GfgData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [lc, gf] = await Promise.all([
          fetch("/api/leetcode").then((r) => r.json()),
          fetch("/api/gfg").then((r) => r.json()),
        ]);
        if (!cancelled) {
          setLeetcode(lc);
          setGfg(gf);
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const codeolio = codingProfiles.find((p) => p.name === "Codeolio");

  const gfgStats = gfg ?? {
    codingScore: 348,
    problemsSolved: 130,
    instituteRank: 142,
    profileUrl: codingProfiles[1].url,
  };

  return (
    <section id="coding-profiles" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Coding Profiles"
          title="Live competitive stats"
          description="A snapshot of my programming journey, showcasing consistent problem-solving, algorithmic thinking, and continuous learning across leading coding platforms."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {/* LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-2xl border border-white/5 bg-card p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFA116]/15 text-[#FFA116]">
                  <SiLeetcode className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-white">LeetCode</h3>
                  <p className="text-xs text-muted">
                    {codingProfiles[0].username}
                  </p>
                </div>
              </div>
              <a
                href={codingProfiles[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary"
                data-cursor="button"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {loading && !leetcode ? (
              <div className="mt-6 flex-1 animate-pulse rounded-xl bg-white/5" />
            ) : (
              <div className="mt-6 flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatBox
                    label="Solved"
                    value={leetcode?.totalSolved ?? 600}
                  />
                  <StatBox label="Easy" value={leetcode?.easy ?? 0} />
                  <StatBox label="Medium" value={leetcode?.medium ?? 0} />
                  <StatBox label="Hard" value={leetcode?.hard ?? 0} />
                </div>

                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <MetricRow
                    icon={Trophy}
                    label="Contest Rating"
                    value={leetcode?.contestRating ?? 1795}
                  />
                  <MetricRow
                    icon={Flame}
                    label="Ranking"
                    value={
                      leetcode?.ranking
                        ? `#${leetcode.ranking.toLocaleString()}`
                        : "—"
                    }
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* GFG + Codeolio */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-1 flex-col rounded-2xl border border-white/5 bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8D46]/15 text-[#2F8D46]">
                    <SiGeeksforgeeks className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">GeeksforGeeks</h3>
                    <p className="text-xs text-muted">
                      {codingProfiles[1].username}
                    </p>
                  </div>
                </div>
                <a
                  href={gfgStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary"
                  data-cursor="button"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {loading && !gfg ? (
                <div className="mt-6 flex-1 animate-pulse rounded-xl bg-white/5" />
              ) : (
                <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <StatBox
                    label="Coding Score"
                    value={gfgStats.codingScore}
                  />
                  <StatBox
                    label="Problems Solved"
                    value={gfgStats.problemsSolved}
                  />
                  <StatBox
                    label="Institution Rank"
                    value={gfgStats.instituteRank}
                  />
                </div>
              )}
            </motion.div>

            {codeolio && (
              <motion.a
                href={codeolio.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                whileHover={{ y: -4 }}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-card p-6 transition-colors hover:border-primary/30"
                data-cursor="button"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Image
                      src="/images/codolio.svg"
                      alt="Codeolio"
                      width={20}
                      height={20}
                      className="h-5 w-5 brightness-0 invert"
                    />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">Codeolio</h3>
                    <p className="text-xs text-muted">{codeolio.username}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
