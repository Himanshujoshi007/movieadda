"use client";

import React from "react";
import { MediaItem } from "@/lib/types";
import MovieCard from "./MovieCard";
import AdBanner from "./ads/AdBanner";

interface MovieGridProps {
  items: MediaItem[];
  onSelect: (media: MediaItem) => void;
  onStreamMedia?: (media: MediaItem) => void;
  onPlayTrailer?: (key: string, title: string) => void;
  isInWatchlist: (id: number) => boolean;
  isFavorite: (id: number) => boolean;
  onToggleWatchlist: (media: MediaItem) => void;
  onToggleFavorite: (media: MediaItem) => void;
  showInFeedAd?: boolean;
}

export default function MovieGrid({
  items,
  onSelect,
  onStreamMedia,
  onPlayTrailer,
  isInWatchlist,
  isFavorite,
  onToggleWatchlist,
  onToggleFavorite,
  showInFeedAd = true,
}: MovieGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-slate-400 font-medium">No titles found.</p>
        <p className="text-xs text-slate-500 mt-1">Try selecting a different filter or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((media, index) => (
        <React.Fragment key={media.id}>
          <MovieCard
            media={media}
            onSelect={onSelect}
            onStreamMedia={onStreamMedia}
            onPlayTrailer={onPlayTrailer}
            isInWatchlist={isInWatchlist(media.id)}
            isFavorite={isFavorite(media.id)}
            onToggleWatchlist={onToggleWatchlist}
            onToggleFavorite={onToggleFavorite}
          />

          {showInFeedAd && index === 4 && (
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 my-2">
              <AdBanner format="leaderboard" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
