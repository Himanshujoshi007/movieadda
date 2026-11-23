"use client";

import React, { useState, useEffect } from "react";
import { Play, Bookmark, Info, Star, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";

interface HeroBannerProps {
  items: MediaItem[];
  onSelect: (media: MediaItem) => void;
  onStreamMedia: (media: MediaItem) => void;
  onPlayTrailer: (key: string, title: string) => void;
  isInWatchlist: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
}

export default function HeroBanner({
  items,
  onSelect,
  onStreamMedia,
  onPlayTrailer,
  isInWatchlist,
  onToggleWatchlist,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  const current = items[currentIndex] || items[0];
  const title = current.title || current.name || "Untitled";
  const releaseYear = (current.release_date || current.first_air_date || "").slice(0, 4);
  const inWatchlist = isInWatchlist(current.id);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] overflow-hidden bg-[#07080c]">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          key={current.id}
          src={getImageUrl(current.backdrop_path, "original")}
          alt={title}
          className="w-full h-full object-cover object-top filter brightness-70 animate-fade-in"
        />
      </div>

      {/* Cinematic Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/70 to-transparent w-full md:w-3/4" />

      {/* Hero Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 z-10">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-widest text-[10px] font-bold">
              Featured {current.media_type === "tv" ? "Series" : "Movie"}
            </span>

            {releaseYear && (
              <span className="px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                {releaseYear}
              </span>
            )}

            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 text-amber-400 border border-white/10 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {current.vote_average ? current.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md line-clamp-2">
            {title}
          </h1>

          {/* Synopsis */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 drop-shadow">
            {current.overview}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* PRIMARY STREAM BUTTON */}
            <button
              onClick={() => onStreamMedia(current)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/40 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Stream in HD
            </button>

            {current.trailer_key && (
              <button
                onClick={() => onPlayTrailer(current.trailer_key!, title)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700/60 backdrop-blur-md transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                Trailer
              </button>
            )}

            <button
              onClick={() => onToggleWatchlist(current)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border backdrop-blur-md transition cursor-pointer ${
                inWatchlist
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${inWatchlist ? "fill-amber-400" : ""}`} />
              {inWatchlist ? "In Watchlist" : "Watchlist"}
            </button>

            <button
              onClick={() => onSelect(current)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700/60 backdrop-blur-md transition cursor-pointer"
            >
              <Info className="w-4 h-4" />
              Details
            </button>
          </div>
        </div>

        {/* Carousel Indicators & Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            {items.slice(0, 6).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? "w-6 bg-red-500" : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition backdrop-blur-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition backdrop-blur-sm cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
