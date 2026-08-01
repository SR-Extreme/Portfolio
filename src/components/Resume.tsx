"use client";

import { personal } from "@/data/personal";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, X, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { useLenis } from "./SmoothScroll";

export function Resume() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  const modal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key="resume-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-card"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                <p className="text-sm font-medium text-white">Resume Preview</p>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white"
                  data-cursor="button"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <iframe
                src={personal.resumePath}
                title="Resume PDF"
                className="h-full w-full flex-1 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <section id="resume" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Resume"
          title="One-pager, ready to share"
          description="Get a comprehensive view of my technical journey, projects, skills, and professional experience."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mx-auto max-w-3xl overflow-hidden rounded-3xl"
        >
          <div className="relative border-b border-white/5 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-8 md:p-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <FileText className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                    {personal.name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" onClick={() => setOpen(true)} magnetic>
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </Button>
                <a href={personal.resumePath} download data-cursor="button">
                  <Button size="sm" variant="outline">
                    <Download className="h-3.5 w-3.5" />
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="hidden aspect-[8.5/5] bg-[#0a0c10] p-4 md:block">
            <iframe
              src={`${personal.resumePath}#toolbar=0&navpanes=0`}
              title="Resume preview"
              className="h-full w-full rounded-xl border border-white/5"
            />
          </div>
        </motion.div>
      </div>

      {modal}
    </section>
  );
}
