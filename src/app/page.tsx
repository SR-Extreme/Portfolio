import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const About = dynamic(() =>
  import("@/components/About").then((m) => m.About)
);
const Achievements = dynamic(() =>
  import("@/components/Achievements").then((m) => m.Achievements)
);
const TechStack = dynamic(() =>
  import("@/components/TechStack").then((m) => m.TechStack)
);
const Skills = dynamic(() =>
  import("@/components/Skills").then((m) => m.Skills)
);
const Experience = dynamic(() =>
  import("@/components/Experience").then((m) => m.Experience)
);
const Projects = dynamic(() =>
  import("@/components/Projects").then((m) => m.Projects)
);
const CodingProfiles = dynamic(() =>
  import("@/components/CodingProfiles").then((m) => m.CodingProfiles)
);
const Resume = dynamic(() =>
  import("@/components/Resume").then((m) => m.Resume)
);
const Contact = dynamic(() =>
  import("@/components/Contact").then((m) => m.Contact)
);

function SectionFallback() {
  return (
    <div className="mx-auto my-16 h-40 max-w-6xl animate-pulse rounded-2xl bg-white/5" />
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TechStack />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CodingProfiles />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Resume />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
