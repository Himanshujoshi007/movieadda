"use client";

import React, { useState, useEffect } from "react";
import { Play, Info, Plus, Check, Sparkles, Video, Flame, ChevronRight, Zap } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";

interface NetflixHeroProps {
  items: MediaItem[];
  onStream: (media: MediaItem) => void;
  onMoreInfo: (media: MediaItem) => void;
  isInWatchlist: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  onPlayTrailer?: (key: string, title: string) => void;
}

export default function NetflixHero({
  items,
  onStream,
  onMoreInfo,
  isInWatchlist,
  onToggleWatchlist,
  onPlayTrailer,
}: NetflixHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  const current = items[currentIndex] || items[0];
  const title = current.title || current.name || "Untitled";
  const releaseYear = (current.release_date || current.first_air_date || "").slice(0, 4);
  const inList = isInWatchlist(current.id);
  const rating = (current.vote_average || 8.6).toFixed(1);

  return (
    <div className="relative w-full h-[78vh] sm:h-[86vh] md:h-[94vh] overflow-hidden bg-[#07070a] select-none">
      {/* Background Backdrop Image with Ambient Lighting */}
      <div className="absolute inset-0">
        <img
          key={current.id}
          src={getImageUrl(current.backdrop_path, "original")}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] scale-100 transition-all duration-1000 ease-out"
        />
      </div>

      {/* Futuristic Multi-layer Cinema Vignettes & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070a] via-[#07070a]/80 to-transparent w-full md:w-3/5" />
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#07070a]/90 via-[#07070a]/40 to-transparent" />

      {/* Cyberpunk Radial Glow Behind Text */}
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-end pb-24 sm:pb-28 md:pb-36 z-10">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          {/* Futuristic AI Recommendation Chip & Live Trends */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600/30 to-purple-600/30 border border-red-500/40 backdrop-blur-md shadow-lg shadow-red-500/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-red-300">
                AI Neural Match 99.4%
              </span>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-bold text-white">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>#1 Trending Global</span>
            </div>
          </div>

          {/* Title with Cyber Glow Drop Shadow */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
            {title}
          </h1>

          {/* Futuristic Audio/Video Metadata Specs */}
          <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-300 flex-wrap">
            <span className="text-emerald-400 flex items-center gap-1">
              ★ {rating} Rating
            </span>
            <span>•</span>
            <span>{releaseYear || "2024"}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] tracking-wider text-white">
              4K ULTRA HD
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] tracking-wider text-neutral-200">
              DOLBY VISION
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] tracking-wider text-neutral-200">
              ATMOS 7.1
            </span>
            <span className="px-1.5 py-0.5 rounded border border-neutral-600 text-[10px] text-neutral-400">
              U/A 16+
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-neutral-300/90 text-sm sm:text-base leading-relaxed line-clamp-3 drop-shadow max-w-xl font-normal">
            {current.overview}
          </p>

          {/* Futuristic Action Deck (Glowing Stream Button, Trailer, Watchlist, Info) */}
          <div className="flex items-center gap-3 pt-3 flex-wrap">
            {/* Play Movie Stream Button */}
            <button
              onClick={() => onStream(current)}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#e50914] via-red-600 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-[0_0_30px_rgba(229,9,20,0.5)] active:scale-95 border border-red-400/40"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Watch Movie</span>
            </button>

            {/* Official Trailer Button */}
            {current.trailer_key && onPlayTrailer && (
              <button
                onClick={() => onPlayTrailer(current.trailer_key!, title)}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition cursor-pointer backdrop-blur-md border border-white/20 active:scale-95"
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>Trailer</span>
              </button>
            )}

            {/* More Details Button */}
            <button
              onClick={() => onMoreInfo(current)}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm transition cursor-pointer backdrop-blur-md border border-white/10 active:scale-95"
            >
              <Info className="w-4 h-4 text-neutral-300" />
              <span className="hidden sm:inline">Details</span>
            </button>

            {/* Watchlist Add */}
            <button
              onClick={() => onToggleWatchlist(current)}
              className="p-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/15 text-white transition cursor-pointer backdrop-blur-md active:scale-95"
              title={inList ? "Remove from VIP Watchlist" : "Add to VIP Watchlist"}
            >
              {inList ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Slide Pagination Indicator on Bottom Right */}
        <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 flex items-center gap-2 z-20">
          {items.slice(0, 5).map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx ? "w-8 bg-[#e50914] shadow-[0_0_10px_#e50914]" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              title={`Switch to ${m.title || m.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
