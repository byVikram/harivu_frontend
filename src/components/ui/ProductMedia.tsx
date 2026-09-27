"use client";

import React, { useState, useRef, useEffect } from "react";

interface ProductMediaProps {
  src?: string | null;
  videoSrc?: string | null;
  alt: string;
  className?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  priority?: boolean;
  onHoverPlayOnly?: boolean;
}

export function ProductMedia({
  src,
  videoSrc,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  autoPlay = true,
  priority = false,
  onHoverPlayOnly = false,
}: ProductMediaProps) {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Fallback image if src is empty
  const fallbackImage =
    src ||
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80";

  useEffect(() => {
    if (!videoRef.current || !videoSrc || videoError) return;

    if (onHoverPlayOnly) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    } else if (autoPlay) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some browsers
      });
    }
  }, [isHovered, autoPlay, onHoverPlayOnly, videoSrc, videoError]);

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio} bg-natural-surface ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {videoSrc && !videoError ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={fallbackImage}
          autoPlay={autoPlay && !onHoverPlayOnly}
          loop
          muted
          playsInline
          preload={priority ? "auto" : "metadata"}
          onError={() => setVideoError(true)}
          onPlaying={() => setIsPlaying(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          aria-label={alt}
        />
      ) : (
        <img
          src={fallbackImage}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
    </div>
  );
}
