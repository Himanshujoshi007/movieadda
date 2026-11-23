"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Check, Info, Flame, Sparkles } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";

interface NetflixTop10RowProps {
  title: string;
  items: MediaItem[];
  onSelect: (media: MediaItem) => void;
  onStream: (media: MediaItem) => void;
  isInWatchlist: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
}

export default function NetflixTop10Row({
  title,
  items,
  onSelect,
  onStream,
  isInWatchlist,
  onToggleWatchlist,
}: NetflixTop10RowProps) {
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

  const top10List = items.slice(0, 10);
  if (top10List.length === 0) return null;

  return (
    <div className="py-6 relative group/slider">
      {/* Row Header with Cyber Accent Line */}
      <div className="px-4 sm:px-6 lg:px-10 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#e50914] to-rose-600 shadow-[0_0_12px_#e50914]" />
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>{title}</span>
            <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20 uppercase tracking-widest hidden sm:inline-flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" /> Live
            </span>
          </h3>
        </div>

        <span className="text-xs text-neutral-400 font-mono hidden md:inline">
          Updated 5m ago • Global Rank #1-10
        </span>
      </div>

      {/* Navigation Chevrons with Neon Glow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
        className="absolute left-0 top-14 bottom-6 w-12 z-30 bg-black/70 hover:bg-black/95 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer border-r border-white/10 backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
        className="absolute right-0 top-14 bottom-6 w-12 z-30 bg-black/70 hover:bg-black/95 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer border-l border-white/10 backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Top 10 Row Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-10 py-3 scroll-smooth"
      >
        {top10List.map((media, index) => {
          const rank = index + 1;
          const mediaTitle = media.title || media.name || "Untitled";
          const inList = isInWatchlist(media.id);
          const rating = (media.vote_average || 8.4).toFixed(1);

          return (
            <div
              key={media.id}
              className="relative flex items-center shrink-0 w-48 sm:w-56 md:w-64 group/card select-none"
            >
              {/* Giant 3D Holographic Outlined Rank Number */}
              <div className="netflix-number shrink-0 w-20 sm:w-24 text-right -mr-4 z-0 pointer-events-none">
                {rank}
              </div>

              {/* Poster Card overlapping number */}
              <div
                className="relative aspect-[2/3] w-36 sm:w-40 md:w-48 rounded-xl overflow-hidden bg-neutral-900 shadow-2xl z-10 transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_0_30px_rgba(229,9,20,0.35)] border border-white/10 group-hover/card:border-red-500/50 cursor-pointer"
                onClick={() => onSelect(media)}
              >
                <img
                  src={getImageUrl(media.poster_path, "w500")}
                  alt={mediaTitle}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                />

                {/* Top 10 Badge & Live Viewers */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
                  <div className="px-2 py-0.5 rounded bg-gradient-to-r from-[#e50914] to-rose-600 text-white text-[9px] font-black uppercase tracking-wider shadow">
                    TOP {rank}
                  </div>
                </div>

                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-400 z-20">
                  ★ {rating}
                </div>

                {/* Cyber Hover Quick Action Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 z-30">
                  <h4 className="text-xs font-black text-white line-clamp-1 mb-1">
                    {mediaTitle}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-semibold mb-2">
                    <span className="text-emerald-400">98% Match</span>
                    <span>•</span>
                    <span>4K UHD</span>
                  </div>

                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    {/* Instant Stream Play Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStream(media);
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-[#e50914] to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.5)] transition cursor-pointer active:scale-95"
                      title="Stream Full Movie in 4K"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Stream</span>
                    </button>

                    {/* Quick Watchlist Add */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(media);
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer"
                      title={inList ? "Remove from List" : "Add to List"}
                    >
                      {inList ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Info */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(media);
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer"
                      title="View Details"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
