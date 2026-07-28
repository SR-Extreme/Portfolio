import type { ExperienceItem, TimelineEvent } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    id: "hostel-cms",
    title: "Hostel Complaint Management System",
    role: "Full-Stack Developer",
    period: "Dec 2025 – May 2026",
    organization: "IIIT Sri City",
    logo: "/images/iiit-sri-city.png",
    description:
      "Production-grade multi-role complaint management platform with automated escalation, lifecycle tracking, and Excel-based onboarding.",
    timeline: [
      "Built a MERN-stack complaint management system with multi-role architecture supporting 7 user roles and 37 REST APIs for authentication, complaint lifecycle, and tracking.",
      "Designed complaint classification with 6 categories and 4 severity levels, plus an automated escalation system for unresolved complaints based on defined timelines.",
      "Engineered a complaint lifecycle pipeline using 4 states and 5 confirmation states for closed-loop tracking.",
      "Built an Excel-based onboarding workflow and enabled media-based complaint tracking using Cloudinary and Multer.",
    ],
    highlights: [
      "MERN Stack architecture",
      "37 REST APIs",
      "7 distinct user roles",
      "Automated escalation engine",
      "Full complaint lifecycle management",
      "Cloudinary media uploads",
      "Excel-based bulk onboarding",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Cloudinary", "JWT"],
    stats: [
      { label: "APIs", value: "37" },
      { label: "Roles", value: "7" },
      { label: "Categories", value: "6" },
    ],
  },
];

export const aboutTimeline: TimelineEvent[] = [
  {
    year: "2023",
    title: "Joined IIIT Sri City",
    description: "Began B.Tech in Computer Science and Engineering",
  },
  {
    year: "2024",
    title: "DSA Deep Dive",
    description: "Built strong foundations; crossed 300+ problems on LeetCode",
  },
  {
    year: "2025",
    title: "Backend Systems & Projects",
    description:
      "Shipped production APIs, Redis caching, and multi-role platforms through projects",
  },
  {
    year: "2026",
    title: "System Design Fundamentals",
    description:
      "Built a strong foundation in scalable system design for real-world applications",
  },
];
