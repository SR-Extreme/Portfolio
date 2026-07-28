import Image from "next/image";
import { SiGeeksforgeeks, SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const iconMap = {
  github: SiGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  gfg: SiGeeksforgeeks,
} as const;

interface SocialIconProps {
  name: string;
  icon: string;
  className?: string;
}

export function SocialIcon({ name, icon, className = "h-4 w-4" }: SocialIconProps) {
  if (icon === "codeolio") {
    return (
      <Image
        src="/images/codolio.svg"
        alt={name}
        width={16}
        height={16}
        className={`${className} brightness-0 invert`}
      />
    );
  }

  const Icon = iconMap[icon as keyof typeof iconMap];
  if (!Icon) return null;
  return <Icon className={className} />;
}
