"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const [stretch, setStretch] = useState({ scaleX: 1, scaleY: 1, rotate: 0 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const move = (e: MouseEvent) => {
      setVisible(true);
      const now = performance.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dt = Math.max(now - lastPos.current.t, 1);
      const speed = Math.min(Math.hypot(dx, dy) / dt, 2);

      x.set(e.clientX);
      y.set(e.clientY);

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setStretch({
        scaleX: 1 + speed * 0.45,
        scaleY: 1 - speed * 0.18,
        rotate: angle,
      });

      lastPos.current = { x: e.clientX, y: e.clientY, t: now };

      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor='button'], [data-magnetic='true'], input, textarea"
      );
      setHovering(Boolean(target));

      const magnetic = (e.target as HTMLElement)?.closest(
        "[data-magnetic='true']"
      ) as HTMLElement | null;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const mx = rect.left + rect.width / 2;
        const my = rect.top + rect.height / 2;
        x.set(e.clientX + (mx - e.clientX) * 0.22);
        y.set(e.clientY + (my - e.clientY) * 0.22);
      }
    };

    const down = (e: MouseEvent) => {
      setClicking(true);
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((r) => r.filter((item) => item.id !== id));
      }, 600);
    };
    const up = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_rgba(16,185,129,0.9)]"
        style={{ left: x, top: y }}
        animate={{
          scale: clicking ? 0.6 : hovering ? 0.5 : 1,
        }}
      />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70"
        style={{
          left: ringX,
          top: ringY,
          scaleX: stretch.scaleX,
          scaleY: stretch.scaleY,
          rotate: stretch.rotate,
        }}
        animate={{
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          borderRadius: hovering ? 14 : 999,
          opacity: clicking ? 0.45 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
          style={{ left: r.x, top: r.y }}
          initial={{ scale: 0.4, opacity: 0.7 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
