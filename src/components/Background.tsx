"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Particles } from "./Particles";

export function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <motion.div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
        style={{ left: glowX, top: glowY }}
      />

      <Particles />

      {/* Network / graph traversal + DB silhouettes */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        aria-hidden
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tree / graph nodes */}
        <g stroke="url(#lineGrad)" strokeWidth="1" fill="none">
          <path d="M120 180 L220 260 L320 180" />
          <path d="M220 260 L220 360 L140 440" />
          <path d="M220 360 L300 440" />
          <path d="M80% 30% L70% 45% L85% 55%" />
        </g>
        <g fill="#10B981">
          <circle cx="120" cy="180" r="3" className="animate-pulse-glow" />
          <circle cx="220" cy="260" r="4" />
          <circle cx="320" cy="180" r="3" />
          <circle cx="140" cy="440" r="3" />
          <circle cx="300" cy="440" r="3" />
        </g>

        {/* Database cylinders (bottom-right) */}
        <g
          transform="translate(78%, 68%)"
          stroke="#10B981"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        >
          <ellipse cx="0" cy="0" rx="28" ry="10" />
          <path d="M-28 0 V40" />
          <path d="M28 0 V40" />
          <ellipse cx="0" cy="40" rx="28" ry="10" />
          <ellipse cx="0" cy="20" rx="28" ry="10" opacity="0.4" />
        </g>

        {/* Server rack silhouette (bottom-left) */}
        <g
          transform="translate(8%, 72%)"
          stroke="#34D399"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        >
          <rect x="0" y="0" width="48" height="90" rx="2" />
          <line x1="8" y1="16" x2="40" y2="16" />
          <line x1="8" y1="28" x2="40" y2="28" />
          <line x1="8" y1="40" x2="40" y2="40" />
          <line x1="8" y1="52" x2="40" y2="52" />
          <circle cx="12" cy="70" r="2" fill="#10B981" />
          <circle cx="22" cy="70" r="2" fill="#10B981" opacity="0.5" />
        </g>

        {/* Animated API request dashed line */}
        <path
          d="M10% 20% Q40% 10%, 55% 35% T90% 25%"
          stroke="#22C55E"
          strokeWidth="1"
          strokeDasharray="6 10"
          fill="none"
          opacity="0.35"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-64"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
