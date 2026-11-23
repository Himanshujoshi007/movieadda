"use client";

import React, { useEffect } from "react";
import { X, Play, Bookmark, Heart, Star, Clock, Calendar, Download, Film, Radio } from "lucide-react";
import { MediaDetails, MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";
import AdBanner from "./ads/AdBanner";

interface MovieDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaDetails | null;
  onPlayTrailer: (key: string, title: string) => void;
  onStreamMedia: (item: MediaItem) => void;
  onOpenRewardedAd: (item: MediaItem) => void;
  isInWatchlist: boolean;
  isFavorite: boolean;
  onToggleWatchlist: (item: MediaItem) => void;
  onToggleFavorite: (item: MediaItem) => void;
  onSelectSimilar: (item: MediaItem) => void;
}

export default function MovieDetailModal({
  isOpen,
  onClose,
  media,
  onPlayTrailer,
  onStreamMedia,
  onOpenRewardedAd,
  isInWatchlist,
  isFavorite,
  onToggleWatchlist,
  onToggleFavorite,
  onSelectSimilar,
}: MovieDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !media) return null;

  const title = media.title || media.name || "Untitled";
  const isTv = media.media_type === "tv" || Boolean(media.name);
  const releaseYear = (media.release_date || media.first_air_date || "").slice(0, 4);
  const runtimeDisplay = media.runtime
    ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
    : media.number_of_seasons
    ? `${media.number_of_seasons} Season${media.number_of_seasons > 1 ? "s" : ""}`
    : null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-y-auto hide-scrollbar text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition backdrop-blur-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Backdrop Section */}
        <div className="relative w-full h-72 sm:h-84 md:h-96 overflow-hidden">
          <img
            src={getImageUrl(media.backdrop_path, "original")}
            alt={title}
            className="w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />

          {/* Floating Actions on Backdrop */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300 mb-2">
                <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 uppercase tracking-wider text-[10px] font-bold">
                  {isTv ? "TV Series" : "Feature Film"}
                </span>
                {releaseYear && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {releaseYear}
                  </span>
                )}
                {runtimeDisplay && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {runtimeDisplay}
                  </span>
                )}
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {media.vote_average ? media.vote_average.toFixed(1) : "N/A"}
                  <span className="text-slate-400 font-normal">({media.vote_count})</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {title}
              </h1>
              {media.tagline && (
                <p className="italic text-sm text-slate-400 mt-1">&ldquo;{media.tagline}&rdquo;</p>
              )}
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center flex-wrap gap-2">
              {/* PRIMARY STREAM BUTTON */}
              <button
                onClick={() => onStreamMedia(media)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-600/40 transition active:scale-95 cursor-pointer"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                Stream in HD
              </button>

              {media.trailer_key && (
                <button
                  onClick={() => onPlayTrailer(media.trailer_key!, title)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Trailer
                </button>
              )}

              <button
                onClick={() => onToggleWatchlist(media)}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  isInWatchlist
                    ? "bg-amber-500/20 border-amber-500 text-amber-400"
                    : "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200"
                }`}
                title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                <Bookmark className={`w-4 h-4 ${isInWatchlist ? "fill-amber-400" : ""}`} />
              </button>

              <button
                onClick={() => onToggleFavorite(media)}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  isFavorite
                    ? "bg-rose-500/20 border-rose-500 text-rose-400"
                    : "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200"
                }`}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-400" : ""}`} />
              </button>

              <button
                onClick={() => onOpenRewardedAd(media)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-semibold transition cursor-pointer"
                title="Download / Offline Info"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Storyline
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {media.overview || "No overview available for this title."}
            </p>
          </div>

          {/* Cast & Crew */}
          {media.cast && media.cast.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Top Cast
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {media.cast.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <img
                      src={getImageUrl(actor.profile_path, "w500")}
                      alt={actor.name}
                      className="w-16 h-16 rounded-full object-cover mb-2 border border-slate-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80";
                      }}
                    />
                    <span className="font-semibold text-xs text-slate-200 line-clamp-1">{actor.name}</span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{actor.character}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sponsored Ad Banner */}
          <AdBanner format="leaderboard" className="my-4" />

          {/* Similar Recommendations */}
          {media.similar && media.similar.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                More Like This
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {media.similar.slice(0, 4).map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar(sim)}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="aspect-[2/3] overflow-hidden relative">
                      <img
                        src={getImageUrl(sim.poster_path, "w500")}
                        alt={sim.title || sim.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-red-400">
                        {sim.title || sim.name}
                      </p>
                      <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5 mt-0.5">
                        ★ {sim.vote_average ? sim.vote_average.toFixed(1) : "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
