import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/personal";
import { Providers } from "@/components/Providers";

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || personal.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} | Backend Engineer & DSA Enthusiast`,
    template: `%s | ${personal.name}`,
  },
  description:
    "Backend Engineer at IIIT Sri City specializing in scalable systems, Data Structures & Algorithms, REST APIs, and production-ready software. 600+ problems solved. Builder of OmniPrep.",
  keywords: [
    "Saurav Kumar Roy",
    "Backend Engineer",
    "DSA",
    "System Design",
    "Node.js",
    "IIIT Sri City",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: personal.name, url: siteUrl }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: personal.name,
    title: `${personal.name} | Backend Engineer`,
    description:
      "Building scalable backend systems. DSA enthusiast. IIIT Sri City — CGPA 8.85.",
    images: [
      {
        url: "/images/omniprep.png",
        width: 1200,
        height: 630,
        alt: personal.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | Backend Engineer`,
    description:
      "Scalable systems · DSA · System Design · Production backends",
    images: ["/images/omniprep.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteUrl,
  email: personal.email,
  telephone: personal.phone,
  jobTitle: "Backend Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: personal.institute,
  },
  knowsAbout: [
    "Backend Development",
    "Data Structures and Algorithms",
    "System Design",
    "Node.js",
    "PostgreSQL",
    "Redis",
  ],
  sameAs: [
    "https://github.com/SR-Extreme",
    "https://www.linkedin.com/in/saurav-kumar-roy-049171297/",
    "https://leetcode.com/u/Saurav_Kumar_Roy/",
    "https://www.geeksforgeeks.org/profile/saurav0vrf1",
    "https://codolio.com/profile/SRExtreme",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
