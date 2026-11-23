"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Play,
  Plus,
  Check,
  ThumbsUp,
  Download,
  Film,
  Volume2,
  Calendar,
  Clock,
  Star,
  Tv,
} from "lucide-react";
import { MediaDetails, MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";
import AdBanner from "./ads/AdBanner";

interface NetflixDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaDetails | null;
  onStream: (media: MediaItem, season?: number, episode?: number) => void;
  onPlayTrailer: (key: string, title: string) => void;
  onOpenRewardedAd: (media: MediaItem) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  onSelectSimilar: (media: MediaItem) => void;
}

export default function NetflixDetailModal({
  isOpen,
  onClose,
  media,
  onStream,
  onPlayTrailer,
  onOpenRewardedAd,
  isInWatchlist,
  onToggleWatchlist,
  onSelectSimilar,
}: NetflixDetailModalProps) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      setSelectedSeason(1);
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
  const seasonsCount = media.number_of_seasons || 1;

  // Mock episode generator for TV series
  const episodes = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    episodeNumber: i + 1,
    title: `Episode ${i + 1}`,
    duration: "52m",
    overview: `Key plot developments unfold as the tension escalates in Chapter ${i + 1} of this season.`,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-xl bg-[#181818] shadow-2xl overflow-y-auto hide-scrollbar text-white border border-neutral-800">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-[#181818] hover:bg-[#282828] text-white flex items-center justify-center transition cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Video / Backdrop Banner */}
        <div className="relative w-full aspect-video sm:h-96 md:h-[420px] overflow-hidden bg-black select-none">
          <img
            src={getImageUrl(media.backdrop_path, "original")}
            alt={title}
            className="w-full h-full object-cover object-top"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Floating Actions on Top Banner */}
          <div className="absolute bottom-8 left-6 sm:left-10 right-6 flex items-end justify-between">
            <div className="space-y-3 max-w-lg">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                {title}
              </h2>

              <div className="flex items-center gap-3">
                {/* Big White Play Button */}
                <button
                  onClick={() => onStream(media)}
                  className="flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded bg-white hover:bg-neutral-200 text-black font-extrabold text-sm sm:text-base transition cursor-pointer active:scale-95 shadow-xl"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Play
                </button>

                {/* Add to My List */}
                <button
                  onClick={() => onToggleWatchlist(media)}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/40 hover:border-white text-white flex items-center justify-center transition cursor-pointer"
                  title={isInWatchlist ? "Remove from List" : "Add to My List"}
                >
                  {isInWatchlist ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
                </button>

                {/* Rewarded Download */}
                <button
                  onClick={() => onOpenRewardedAd(media)}
                  className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/40 hover:border-white text-emerald-400 flex items-center justify-center transition cursor-pointer"
                  title="Download File via Ad"
                >
                  <Download className="w-4 h-4" />
                </button>

                {media.trailer_key && (
                  <button
                    onClick={() => onPlayTrailer(media.trailer_key!, title)}
                    className="px-3.5 py-2 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold border border-white/20 transition cursor-pointer"
                  >
                    Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#181818]">
          {/* Two-Column Metadata & Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left 2 Columns: Match, Badges, Overview */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
                <span className="text-[#46d369] font-bold">98% Match</span>
                <span className="text-neutral-400">{releaseYear || "2024"}</span>
                <span className="px-1.5 py-0.5 border border-neutral-600 rounded text-[10px] font-mono">
                  U/A 16+
                </span>
                {media.runtime ? (
                  <span className="text-neutral-300">{Math.floor(media.runtime / 60)}h {media.runtime % 60}m</span>
                ) : (
                  <span className="text-neutral-300">{seasonsCount} Season{seasonsCount > 1 ? "s" : ""}</span>
                )}
                <span className="px-1 border border-neutral-600 rounded text-[9px] text-neutral-400 font-bold">
                  HD
                </span>
                <span className="px-1 border border-neutral-600 rounded text-[9px] text-neutral-400 font-bold">
                  5.1
                </span>
              </div>

              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                {media.overview}
              </p>
            </div>

            {/* Right 1 Column: Cast, Genres, Mood */}
            <div className="space-y-3 text-xs text-neutral-400 border-l border-neutral-800 pl-4">
              {media.cast && media.cast.length > 0 && (
                <div>
                  <span className="text-neutral-500 font-medium">Cast: </span>
                  <span className="text-neutral-300">
                    {media.cast.slice(0, 4).map((c) => c.name).join(", ")}
                  </span>
                </div>
              )}

              {media.genres && media.genres.length > 0 && (
                <div>
                  <span className="text-neutral-500 font-medium">Genres: </span>
                  <span className="text-neutral-300">
                    {media.genres.map((g) => g.name).join(", ")}
                  </span>
                </div>
              )}

              <div>
                <span className="text-neutral-500 font-medium">This title is: </span>
                <span className="text-neutral-300">Suspenseful, Gritty, Mind-Bending, Exciting</span>
              </div>

              <div>
                <span className="text-neutral-500 font-medium">Audio: </span>
                <span className="text-neutral-300">English [Original], Hindi, Spanish, French</span>
              </div>
            </div>
          </div>

          {/* Sponsored Ad Banner */}
          <AdBanner format="leaderboard" />

          {/* TV Shows: Episodes Section */}
          {isTv && (
            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Episodes</h3>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-[#242424] border border-neutral-700 rounded px-3 py-1.5 text-xs text-white font-semibold focus:outline-none"
                >
                  {Array.from({ length: seasonsCount }, (_, i) => i + 1).map((s) => (
                    <option key={s} value={s}>
                      Season {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Episodes List */}
              <div className="divide-y divide-neutral-800">
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => onStream(media, selectedSeason, ep.episodeNumber)}
                    className="py-3 px-3 rounded-lg hover:bg-[#222222] transition flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-neutral-500 w-6 text-center">
                        {ep.episodeNumber}
                      </span>
                      <div className="w-24 sm:w-32 aspect-video rounded overflow-hidden relative bg-black shrink-0">
                        <img
                          src={getImageUrl(media.backdrop_path, "w500")}
                          alt={ep.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <Play className="w-6 h-6 fill-white text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#e50914] transition">
                            {ep.title}
                          </h4>
                          <span className="text-xs text-neutral-500">{ep.duration}</span>
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-0.5 max-w-lg">
                          {ep.overview}
                        </p>
                      </div>
                    </div>

                    <Play className="w-5 h-5 text-neutral-400 group-hover:text-white shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Like This Recommendations */}
          {media.similar && media.similar.length > 0 && (
            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <h3 className="text-xl font-bold text-white">More Like This</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {media.similar.slice(0, 6).map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar(sim)}
                    className="rounded overflow-hidden bg-[#242424] hover:bg-[#2d2d2d] transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="aspect-video relative overflow-hidden bg-black">
                      <img
                        src={getImageUrl(sim.backdrop_path || sim.poster_path, "w500")}
                        alt={sim.title || sim.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-2 right-2 text-xs font-bold text-neutral-300 bg-black/60 px-1.5 py-0.5 rounded">
                        ★ {sim.vote_average ? sim.vote_average.toFixed(1) : "8.1"}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#e50914]">
                        {sim.title || sim.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-snug">
                        {sim.overview}
                      </p>
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
