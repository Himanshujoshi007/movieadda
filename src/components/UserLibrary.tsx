"use client";

import React, { useState } from "react";
import { Bookmark, Heart, History, Trash2, Film } from "lucide-react";
import { LibraryItem, MediaItem } from "@/lib/types";
import MovieCard from "./MovieCard";

interface UserLibraryProps {
  watchlist: LibraryItem[];
  favorites: LibraryItem[];
  history: LibraryItem[];
  onSelect: (media: MediaItem) => void;
  onPlayTrailer?: (key: string, title: string) => void;
  isInWatchlist: (id: number) => boolean;
  isFavorite: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  onToggleFavorite: (media: MediaItem) => void;
  onClearHistory: () => void;
  onExplore: () => void;
}

export default function UserLibrary({
  watchlist,
  favorites,
  history,
  onSelect,
  onPlayTrailer,
  isInWatchlist,
  isFavorite,
  onToggleWatchlist,
  onToggleFavorite,
  onClearHistory,
  onExplore,
}: UserLibraryProps) {
  const [activeTab, setActiveTab] = useState<"watchlist" | "favorites" | "history">("watchlist");

  const activeItems =
    activeTab === "watchlist" ? watchlist : activeTab === "favorites" ? favorites : history;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Media Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access your saved watchlist, favorited titles, and viewing history.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab("watchlist")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "watchlist"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Watchlist ({watchlist.length})
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "favorites"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Favorites ({favorites.length})
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === "history"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            History ({history.length})
          </button>
        </div>
      </div>

      {/* History specific actions */}
      {activeTab === "history" && history.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Viewing History
          </button>
        </div>
      )}

      {/* Content Grid / Empty state */}
      {activeItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8">
          <Film className="w-12 h-12 text-slate-600 mb-3" />
          <h3 className="text-base font-semibold text-slate-300">
            Your {activeTab} is empty
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5">
            {activeTab === "watchlist"
              ? "Bookmark upcoming movies or shows you want to watch later."
              : activeTab === "favorites"
              ? "Heart titles to build your personal library of all-time favorites."
              : "Movies and shows you inspect or watch will automatically appear here."}
          </p>
          <button
            onClick={onExplore}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition cursor-pointer"
          >
            Explore Trending Media
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {activeItems.map((item) => (
            <MovieCard
              key={`${item.id}-${item.addedAt}`}
              media={item}
              onSelect={onSelect}
              onPlayTrailer={onPlayTrailer}
              isInWatchlist={isInWatchlist(item.id)}
              isFavorite={isFavorite(item.id)}
              onToggleWatchlist={onToggleWatchlist}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
