"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Check, Info, Sparkles, Star } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";

interface NetflixRowProps {
  title: string;
  items: MediaItem[];
  onSelect: (media: MediaItem) => void;
  onStream: (media: MediaItem) => void;
  isInWatchlist: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  cardFormat?: "portrait" | "landscape";
}

export default function NetflixRow({
  title,
  items,
  onSelect,
  onStream,
  isInWatchlist,
  onToggleWatchlist,
  cardFormat = "portrait",
}: NetflixRowProps) {
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
    <div className="py-5 relative group/slider">
      {/* Row Header with Cyber Neon Line */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-red-500 to-rose-600 shadow-[0_0_10px_#e50914]" />
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2 group/title cursor-pointer">
            <span>{title}</span>
            <span className="text-[11px] font-bold text-red-500 opacity-0 group-hover/title:opacity-100 transition-opacity flex items-center">
              Browse All →
            </span>
          </h3>
        </div>

        <span className="text-xs text-neutral-400 font-medium">
          {items.length} Titles
        </span>
      </div>

      {/* Futuristic Floating Navigation Chevrons */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll Left"
        className="absolute left-0 top-14 bottom-4 w-12 z-30 bg-black/70 hover:bg-black/95 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer border-r border-white/10 backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={() => scroll("right")}
        aria-label="Scroll Right"
        className="absolute right-0 top-14 bottom-4 w-12 z-30 bg-black/70 hover:bg-black/95 text-white opacity-0 group-hover/slider:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer border-l border-white/10 backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Scrollable Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-10 py-3 scroll-smooth"
      >
        {items.map((media) => {
          const mediaTitle = media.title || media.name || "Untitled";
          const inList = isInWatchlist(media.id);
          const isLandscape = cardFormat === "landscape";
          const imagePath = isLandscape && media.backdrop_path ? media.backdrop_path : media.poster_path;
          const rating = (media.vote_average || 8.2).toFixed(1);

          return (
            <div
              key={media.id}
              className={`shrink-0 netflix-card rounded-xl overflow-hidden bg-[#111219] border border-white/5 hover:border-red-500/40 group/item cursor-pointer select-none transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(229,9,20,0.25)] ${
                isLandscape ? "w-60 sm:w-72 md:w-80" : "w-40 sm:w-48 md:w-56"
              }`}
              onClick={() => onSelect(media)}
            >
              {/* Media Poster / Backdrop Image */}
              <div
                className={`relative w-full overflow-hidden bg-neutral-950 ${
                  isLandscape ? "aspect-video" : "aspect-[2/3]"
                }`}
              >
                <img
                  src={getImageUrl(imagePath, "w500")}
                  alt={mediaTitle}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-108"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";
                  }}
                />

                {/* Floating Rating Badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-black text-amber-400 flex items-center gap-1 z-10 border border-white/10">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                </div>

                {/* Media Type Tag */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-black text-neutral-300 uppercase tracking-wider z-10 border border-white/10">
                  {media.media_type === "tv" ? "TV Series" : "Cinema 4K"}
                </div>

                {/* Cyber Hover Play Icon Center */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#e50914] to-rose-600 flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.6)] transform scale-90 group-hover/item:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Meta Deck */}
              <div className="p-3 bg-gradient-to-b from-[#14151f] to-[#0c0d14]">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-white line-clamp-1 group-hover/item:text-red-400 transition">
                    {mediaTitle}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                    <span className="text-emerald-400">98% Match</span>
                    <span>•</span>
                    <span className="px-1 py-0.2 rounded border border-white/10 text-[9px]">4K HDR</span>
                  </div>

                  {/* Quick Action Icons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStream(media);
                      }}
                      className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-white transition cursor-pointer"
                      title="Play Immediately"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWatchlist(media);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition cursor-pointer"
                      title={inList ? "Remove from List" : "Add to List"}
                    >
                      {inList ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
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
