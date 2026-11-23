"use client";

import React from "react";
import { GENRES } from "@/lib/tmdb";

interface GenreFilterProps {
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
  mediaType: "all" | "movie" | "tv";
  onSelectMediaType: (type: "all" | "movie" | "tv") => void;
}

export default function GenreFilter({
  selectedGenreId,
  onSelectGenre,
  mediaType,
  onSelectMediaType,
}: GenreFilterProps) {
  return (
    <div className="py-4 space-y-3">
      {/* Media Type Switcher & Genres */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Type pills (All, Movies, TV Series) */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit shrink-0">
          {(
            [
              { id: "all", label: "All Titles" },
              { id: "movie", label: "Movies" },
              { id: "tv", label: "TV Shows" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectMediaType(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                mediaType === t.id
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Genre Pill Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => onSelectGenre(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition ${
              selectedGenreId === null
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            All Genres
          </button>

          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onSelectGenre(genre.id === selectedGenreId ? null : genre.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition ${
                selectedGenreId === genre.id
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
