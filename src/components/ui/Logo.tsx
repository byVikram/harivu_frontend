import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light" | "auto" | "original";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  linkToHome?: boolean;
}

export function Logo({
  variant = "dark",
  size = "md",
  showTagline = true,
  className = "",
  linkToHome = true,
}: LogoProps) {
  // Select the appropriate brand logo asset:
  // - "light": White/cream transparent version for dark backgrounds (footer, admin command hub)
  // - "original": The exact user-placed logo file with warm stone/sage background
  // - "dark" / "auto": Transparent green version for light navigation bars and content pages
  const logoSrc =
    variant === "light"
      ? "/logo/harivu-logo-white-transparent.png"
      : variant === "original"
      ? "/logo/harivu-logo-horizontal.png"
      : "/logo/harivu-logo-transparent.png";

  const sizeClasses = {
    sm: "h-8 sm:h-9 w-auto max-h-9",
    md: "h-10 sm:h-12 w-auto max-h-12",
    lg: "h-14 sm:h-16 w-auto max-h-18",
    xl: "h-20 sm:h-24 w-auto max-h-28",
  };

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={logoSrc}
        alt="Harivu — Where Freshness Flows"
        width={1871}
        height={511}
        priority
        className={`${sizeClasses[size] || sizeClasses.md} object-contain transition-opacity duration-200 group-hover:opacity-90`}
      />
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex items-center focus:outline-none group" aria-label="Harivu Home">
        {content}
      </Link>
    );
  }

  return content;
}
