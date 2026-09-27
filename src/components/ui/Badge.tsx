import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "natural" | "earth" | "outline" | "subtle";
}

export function Badge({
  className,
  variant = "brand",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    brand: "bg-brand-100 text-brand-900 border border-brand-200/60 font-medium",
    natural: "bg-natural-surface text-natural-text border border-natural-border font-medium",
    earth: "bg-amber-100/60 text-amber-900 border border-amber-200/50 font-medium",
    outline: "border border-natural-border text-natural-muted font-normal",
    subtle: "bg-brand-50 text-brand-800 border border-brand-100 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
