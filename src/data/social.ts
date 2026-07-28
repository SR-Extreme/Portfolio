import type { SocialLink } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/SR-Extreme",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/saurav-kumar-roy-049171297/",
    icon: "linkedin",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/Saurav_Kumar_Roy/",
    icon: "leetcode",
  },
  {
    name: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/profile/saurav0vrf1",
    icon: "gfg",
  },
  {
    name: "Codeolio",
    href: "https://codolio.com/profile/SRExtreme",
    icon: "codeolio",
  },
];

export const contactCards = [
  {
    title: "Email",
    value: "sauravkumar.r23@iiits.in",
    href: "mailto:sauravkumar.r23@iiits.in",
    icon: "mail",
  },
  {
    title: "Phone",
    value: "+91 7842578558",
    href: "tel:+917842578558",
    icon: "phone",
  },
  {
    title: "Location",
    value: "IIIT Sri City, Chittor, AP, India",
    href: "#",
    icon: "map-pin",
  },
  {
    title: "LinkedIn",
    value: "Saurav Kumar Roy",
    href: "https://www.linkedin.com/in/saurav-kumar-roy-049171297/",
    icon: "linkedin",
  },
  {
    title: "GitHub",
    value: "SR-Extreme",
    href: "https://github.com/SR-Extreme",
    icon: "github",
  },
] as const;
