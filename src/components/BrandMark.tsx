import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  size?: "sm" | "md";
}

export function BrandMark({ className, size = "md" }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-colors hover:border-primary/30",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative font-mono font-semibold tracking-tight">
        <span className="text-white/95">roysaurav</span>
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          .me
        </span>
      </span>
    </span>
  );
}
