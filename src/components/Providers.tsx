"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollProgress } from "./ScrollProgress";

const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), {
  ssr: false,
});

const Background = dynamic(
  () => import("./Background").then((m) => m.Background),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Background />
      <Cursor />
      <ScrollProgress />
      <div className="relative z-10">{children}</div>
    </SmoothScroll>
  );
}
