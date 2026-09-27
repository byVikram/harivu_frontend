import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light" | "auto";
  size?: "sm" | "md" | "lg";
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
  const isLight = variant === "light";

  const heightClasses = {
    sm: "h-7",
    md: "h-9",
    lg: "h-12",
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official Emblem Mark */}
      <div className={`relative ${size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10"} shrink-0`}>
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          {/* Semicircle Arch */}
          <path
            d="M0 0 H20 C75.228 0 120 44.772 120 100 C120 111.046 111.046 120 100 120 H0 V0 Z"
            fill={isLight ? "#F4F1EA" : "#14532D"}
          />
          {/* Leaf Veins */}
          <path d="M0 80 Q 25 25 50 18 Q 40 45 10 90 Z" fill={isLight ? "#0B3B24" : "#F4F1EA"} />
          <path d="M0 100 Q 35 40 70 36 Q 55 65 15 110 Z" fill={isLight ? "#0B3B24" : "#F4F1EA"} />
          <path d="M0 115 Q 45 55 90 60 Q 70 85 20 120 Z" fill={isLight ? "#0B3B24" : "#F4F1EA"} />
          <path d="M10 120 Q 55 80 105 92 Q 85 110 35 120 Z" fill={isLight ? "#0B3B24" : "#F4F1EA"} />
        </svg>
      </div>

      {/* Official Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif tracking-[0.22em] font-bold leading-none ${
            isLight ? "text-white" : "text-brand-950"
          } ${size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"}`}
        >
          HARIVU
        </span>
        {showTagline && (
          <span
            className={`text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold uppercase mt-0.5 ${
              isLight ? "text-brand-300" : "text-brand-900"
            }`}
          >
            Fresh Microgreens
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="focus:outline-none group">
        {content}
      </Link>
    );
  }

  return content;
}
