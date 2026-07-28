"use client";

import { contactCards } from "@/data/social";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";

const iconMap = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  linkedin: FaLinkedin,
  github: FaGithub,
} as const;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Email service is not configured. Please email saurav0808roy@gmail.com directly."
      );
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: `[Portfolio] ${form.subject}`,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("success");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 md:py-32">
      <div className="container-max section-pad">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Amazing"
          description="Open to backend roles, internships, and collaborations on scalable systems."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            {contactCards.map((card, i) => {
              const Icon = iconMap[card.icon as keyof typeof iconMap] ?? Mail;
              const content = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {card.title}
                    </p>
                    <p className="text-sm font-medium text-white">{card.value}</p>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  {card.href === "#" ? (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-4">
                      {content}
                    </div>
                  ) : (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        card.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-4 rounded-2xl border border-white/5 bg-card p-4 transition-colors hover:border-primary/30"
                      data-cursor="button"
                    >
                      {content}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/5 bg-card p-6 md:p-8"
          >
            {(["name", "email", "subject"] as const).map((field) => (
              <div key={field} className="relative mb-5">
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field]: e.target.value }))
                  }
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/10 bg-background/60 px-4 pb-2.5 pt-5 text-sm text-white outline-none transition focus:border-primary/50"
                />
                <label
                  htmlFor={field}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-400">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="relative mb-6">
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                placeholder=" "
                className="peer w-full resize-none rounded-xl border border-white/10 bg-background/60 px-4 pb-2.5 pt-6 text-sm text-white outline-none transition focus:border-primary/50"
              />
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-4 top-4 text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Message
              </label>
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              magnetic
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </Button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent successfully!
                </motion.div>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-red-400"
                >
                  {errorMessage || "Something went wrong. Try again or email me directly."}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
