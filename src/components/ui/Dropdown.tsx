"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  size?: "sm" | "md" | "lg";
}

export function Dropdown({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  className = "",
  buttonClassName = "",
  size = "md",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currIdx = options.findIndex((o) => o.value === value);
        const nextIdx = (currIdx + 1) % options.length;
        onChange(options[nextIdx].value);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currIdx = options.findIndex((o) => o.value === value);
        const prevIdx = (currIdx - 1 + options.length) % options.length;
        onChange(options[prevIdx].value);
      }
    }
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-xl",
    md: "px-3.5 py-2.5 text-xs sm:text-sm rounded-xl",
    lg: "px-4 py-3 text-sm rounded-2xl",
  };

  return (
    <div className={`relative space-y-1 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block">
          {label} {required && <span className="text-brand-800">*</span>}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between text-left transition-all border font-medium ${
          sizeClasses[size]
        } ${
          disabled
            ? "bg-natural-surface/50 text-natural-muted cursor-not-allowed border-natural-border/60"
            : isOpen
            ? "border-brand-900 bg-white ring-2 ring-brand-800/10 shadow-xs"
            : error
            ? "border-red-400 bg-white hover:border-red-500"
            : "border-natural-border bg-natural-warmWhite hover:bg-white hover:border-brand-700/60 shadow-2xs"
        } ${buttonClassName}`}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="shrink-0">{selectedOption.icon}</span>}
              <span className="font-semibold text-natural-text truncate">
                {selectedOption.label}
              </span>
              {selectedOption.badge !== undefined && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-brand-50 text-brand-900 border border-brand-100 shrink-0">
                  {selectedOption.badge}
                </span>
              )}
            </>
          ) : (
            <span className="text-natural-muted font-normal">{placeholder}</span>
          )}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-natural-muted transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-brand-900" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white rounded-2xl border border-natural-border shadow-elevated p-1.5 animate-scale-in scrollbar-thin">
          <div role="listbox" className="space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between gap-2 ${
                    opt.disabled
                      ? "opacity-40 cursor-not-allowed"
                      : isSelected
                      ? "bg-brand-50 text-brand-950 font-bold"
                      : "hover:bg-natural-surface/80 text-natural-text"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <span className="shrink-0 opacity-80">{opt.icon}</span>}
                    <div className="truncate">
                      <span className="block truncate">{opt.label}</span>
                      {opt.description && (
                        <span className="text-[11px] text-natural-muted font-normal block truncate">
                          {opt.description}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {opt.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                          isSelected
                            ? "bg-brand-900 text-white"
                            : "bg-natural-surface text-natural-muted border border-natural-border"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-4 h-4 text-brand-900 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="text-[11px] text-red-600 font-medium mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-[11px] text-natural-muted mt-1">{helperText}</p>
      )}
    </div>
  );
}
