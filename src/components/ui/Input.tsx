import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-natural-text uppercase tracking-wider"
          >
            {label}
            {props.required && <span className="text-emerald-700 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border bg-natural-warmWhite text-natural-text text-sm transition-all duration-150",
            "border-natural-border placeholder:text-natural-muted/60",
            "focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-natural-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
