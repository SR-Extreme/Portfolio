"use client";

import { navigation } from "@/data/navigation";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils";
import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";
import { BrandMark } from "./BrandMark";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-[#050505]/70 py-2 backdrop-blur-xl"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-max section-pad flex items-center justify-between gap-4">
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="group"
          data-cursor="button"
        >
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-white"
              data-cursor="button"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href={personal.resumePath} download data-cursor="button">
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" />
              Download Resume
            </Button>
          </a>
        </div>

        <button
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-cursor="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="section-pad flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3">
                <a href={personal.resumePath} download>
                  <Button variant="outline" size="sm" className="w-full">
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
