"use client";

import { navigation } from "@/data/navigation";
import { socialLinks } from "@/data/social";
import { personal } from "@/data/personal";
import { BrandMark } from "./BrandMark";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#050505]/80 py-12">
      <div className="container-max section-pad">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0">
            <BrandMark size="sm" />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Backend Engineer · DSA Enthusiast · Building scalable systems
            </p>
          </div>

          <nav className="flex flex-nowrap items-center gap-x-4 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 text-sm text-muted transition-colors hover:text-white"
                data-cursor="button"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-muted transition-colors hover:border-primary/40 hover:text-primary"
                data-cursor="button"
              >
                <SocialIcon name={link.name} icon={link.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-muted">
          © {year} {personal.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
