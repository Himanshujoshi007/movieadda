"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
import { MediaItem } from "@/lib/types";
import MovieCard from "./MovieCard";

interface MovieCarouselProps {
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
  items: MediaItem[];
  onSelect: (media: MediaItem) => void;
  onStreamMedia?: (media: MediaItem) => void;
  onPlayTrailer?: (key: string, title: string) => void;
  isInWatchlist: (id: number) => boolean;
  isFavorite: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  onToggleFavorite: (media: MediaItem) => void;
}

export default function MovieCarousel({
  title,
  icon: Icon,
  subtitle,
  items,
  onSelect,
  onStreamMedia,
  onPlayTrailer,
  isInWatchlist,
  isFavorite,
  onToggleWatchlist,
  onToggleFavorite,
}: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="py-6 relative group/carousel">
      {/* Header */}
      <div className="flex items-end justify-between px-4 sm:px-6 lg:px-8 mb-4">
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-red-500" />}
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h2>
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Navigation arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll Left"
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll Right"
            className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 py-2 scroll-smooth"
      >
        {items.map((media) => (
          <div key={media.id} className="w-40 sm:w-48 md:w-56 shrink-0">
            <MovieCard
              media={media}
              onSelect={onSelect}
              onStreamMedia={onStreamMedia}
              onPlayTrailer={onPlayTrailer}
              isInWatchlist={isInWatchlist(media.id)}
              isFavorite={isFavorite(media.id)}
              onToggleWatchlist={onToggleWatchlist}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
