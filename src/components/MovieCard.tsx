"use client";

import React from "react";
import { Play, Bookmark, Heart, Star, Radio } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";

interface MovieCardProps {
  media: MediaItem;
  onSelect: (media: MediaItem) => void;
  onStreamMedia?: (media: MediaItem) => void;
  onPlayTrailer?: (key: string, title: string) => void;
  isInWatchlist: boolean;
  isFavorite: boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  onToggleFavorite: (media: MediaItem) => void;
}

export default function MovieCard({
  media,
  onSelect,
  onStreamMedia,
  onPlayTrailer,
  isInWatchlist,
  isFavorite,
  onToggleWatchlist,
  onToggleFavorite,
}: MovieCardProps) {
  const title = media.title || media.name || "Untitled";
  const releaseYear = (media.release_date || media.first_air_date || "").slice(0, 4);

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-600/15 transition-all duration-300">
      {/* Poster Image Container */}
      <div
        onClick={() => onSelect(media)}
        className="relative aspect-[2/3] w-full overflow-hidden bg-[#07080c] cursor-pointer"
      >
        <img
          src={getImageUrl(media.poster_path, "w500")}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";
          }}
        />

        {/* Dark Gradient Overlay on Hover with Stream Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-2">
          {onStreamMedia && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStreamMedia(media);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-xl shadow-red-600/50 transform scale-90 group-hover:scale-100 transition duration-300 cursor-pointer active:scale-95"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Stream Now
            </button>
          )}

          {media.trailer_key && onPlayTrailer && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayTrailer(media.trailer_key!, title);
              }}
              className="px-3 py-1 rounded-lg bg-black/60 hover:bg-black/80 text-slate-300 text-[11px] font-semibold border border-white/20 transition cursor-pointer"
            >
              Trailer
            </button>
          )}
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-red-400 border border-red-500/20">
            {media.media_type === "tv" ? "TV" : "Movie"}
          </span>

          {media.vote_average > 0 && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-white/10">
              <Star className="w-3 h-3 fill-amber-400" />
              {media.vote_average.toFixed(1)}
            </span>
          )}
        </div>

        {/* Quick Action Overlay Buttons (Top Right on Hover) */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(media);
            }}
            className={`p-1.5 rounded-lg backdrop-blur-md border transition cursor-pointer ${
              isInWatchlist
                ? "bg-amber-500 text-black border-amber-400"
                : "bg-black/70 hover:bg-black text-white/90 border-white/20"
            }`}
            title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isInWatchlist ? "fill-black" : ""}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(media);
            }}
            className={`p-1.5 rounded-lg backdrop-blur-md border transition cursor-pointer ${
              isFavorite
                ? "bg-rose-500 text-white border-rose-400"
                : "bg-black/70 hover:bg-black text-white/90 border-white/20"
            }`}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-white" : ""}`} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div
        onClick={() => onSelect(media)}
        className="p-3 flex flex-col justify-between flex-1 cursor-pointer bg-slate-900/90"
      >
        <h4 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-red-400 transition">
          {title}
        </h4>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
          <span>{releaseYear || "N/A"}</span>
          <span className="text-red-400/80 hover:text-red-400 font-semibold text-[10px]">
            Watch →
          </span>
        </div>
      </div>
    </div>
  );
}
