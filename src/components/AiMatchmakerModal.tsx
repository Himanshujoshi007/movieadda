"use client";

import React, { useState } from "react";
import { X, Sparkles, Play, RefreshCw, Star, Zap, Film } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getImageUrl } from "@/lib/tmdb";

interface AiMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: MediaItem[];
  onStream: (media: MediaItem) => void;
  onOpenDetails: (media: MediaItem) => void;
}

const MOODS = [
  { id: "scifi", label: "Mind-Bending Sci-Fi", icon: "🤖", genreId: 878 },
  { id: "action", label: "Adrenaline Action", icon: "💥", genreId: 28 },
  { id: "thriller", label: "Psychological Thriller", icon: "🧠", genreId: 53 },
  { id: "drama", label: "Award-Winning Drama", icon: "🏆", genreId: 18 },
  { id: "adventure", label: "Epic Adventure", icon: "🌌", genreId: 12 },
  { id: "horror", label: "Late-Night Supernatural", icon: "🩸", genreId: 27 },
];

export default function AiMatchmakerModal({
  isOpen,
  onClose,
  movies,
  onStream,
  onOpenDetails,
}: AiMatchmakerModalProps) {
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedMovie, setMatchedMovie] = useState<MediaItem | null>(null);

  if (!isOpen) return null;

  const handlePickMood = (mood: typeof MOODS[0]) => {
    setSelectedMood(mood);
    setIsAnalyzing(true);

    setTimeout(() => {
      // Find movie matching genre or pick top random
      const pool = movies.filter(
        (m) => m.genre_ids && m.genre_ids.includes(mood.genreId)
      );
      const chosen = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : movies[Math.floor(Math.random() * movies.length)];

      setMatchedMovie(chosen || movies[0]);
      setIsAnalyzing(false);
    }, 450);
  };

  const activeMovie = matchedMovie || movies[0];
  const title = activeMovie?.title || activeMovie?.name || "Dune: Part Two";
  const rating = (activeMovie?.vote_average || 8.7).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0e0f17]/95 border border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.25)] p-5 sm:p-8 space-y-6 text-white overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-600/20 blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-red-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>AI Neural Matchmaker</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 uppercase">
                  v3.5 Engine
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Select your vibe and let our AI stream engine pick your perfect movie.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mood Selection Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Select Tonight&apos;s Atmosphere
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                onClick={() => handlePickMood(m)}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border text-left ${
                  selectedMood.id === m.id
                    ? "bg-gradient-to-r from-purple-600/30 to-red-600/30 border-purple-500 text-white shadow-lg shadow-purple-600/20 scale-102"
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-base">{m.icon}</span>
                <span className="line-clamp-1">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Result Card */}
        {activeMovie && (
          <div className="relative rounded-2xl bg-[#141522] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center overflow-hidden">
            <div className="w-28 sm:w-32 aspect-[2/3] shrink-0 rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
              <img
                src={getImageUrl(activeMovie.poster_path, "w500")}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-black uppercase">
                99.8% AI Match
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {rating}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Instant 4K Play</span>
                <span>•</span>
                <span className="text-neutral-400 font-mono">
                  {activeMovie.release_date?.slice(0, 4) || "2024"}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-white line-clamp-1">
                {title}
              </h4>

              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                {activeMovie.overview}
              </p>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2.5">
                <button
                  onClick={() => {
                    onClose();
                    onStream(activeMovie);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e50914] to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/40 flex items-center gap-2 cursor-pointer transition active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Stream This Title Now</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenDetails(activeMovie);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white font-bold text-xs border border-white/10 transition cursor-pointer"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
