"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Check, Link as LinkIcon } from "lucide-react";
import { uploadAdminImage } from "@/lib/adminApi";

export interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Upload Image / Media",
  helperText = "PNG, JPG, WEBP or direct image URL up to 5MB",
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadAdminImage(file);
      if (res.success && res.url) {
        onChange(res.url);
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-natural-muted block">
          {label}
        </label>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Current Image Preview or Upload Dropzone */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-natural-border bg-natural-surface group aspect-[16/9] max-h-48">
          <img
            src={value}
            alt="Asset Preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white text-natural-text text-xs font-bold shadow-md hover:bg-natural-surface flex items-center gap-1"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-md hover:bg-red-700"
              title="Remove Image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-natural-border hover:border-indigo-400 rounded-2xl p-5 text-center bg-natural-warmWhite/70 hover:bg-indigo-50/30 transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold text-natural-text">
              {isUploading ? "Uploading image..." : "Click or drag image to upload"}
            </p>
            <p className="text-[11px] text-natural-muted mt-0.5">{helperText}</p>
          </div>
        </div>
      )}

      {/* Optional URL Input Toggle */}
      <div className="flex items-center justify-end pt-1 text-xs">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 underline"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? "Hide URL Input" : "Paste image URL directly"}</span>
        </button>
      </div>

      {/* Direct URL input bar */}
      {showUrlInput && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-xl border border-natural-border bg-natural-warmWhite text-xs focus:outline-none focus:border-indigo-600"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 rounded-xl bg-indigo-700 text-white text-xs font-bold hover:bg-indigo-800 transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
