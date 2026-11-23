"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Star, Film, Loader2 } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { searchMedia, getImageUrl } from "@/lib/tmdb";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
}

export default function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchMedia(query);
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col text-white">
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV shows, actors, or keywords..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {isLoading && <Loader2 className="w-4 h-4 text-slate-400 animate-spin shrink-0" />}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
          {query && !isLoading && results.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching titles found for &ldquo;{query}&rdquo;.
            </div>
          )}

          {!query && (
            <div className="p-4 text-center text-xs text-slate-500">
              Type at least 2 characters to search across TMDB&apos;s movie and TV database.
            </div>
          )}

          {results.map((item) => {
            const title = item.title || item.name || "Untitled";
            const year = (item.release_date || item.first_air_date || "").slice(0, 4);

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition group"
              >
                <img
                  src={getImageUrl(item.poster_path, "w500")}
                  alt={title}
                  className="w-12 h-16 rounded-lg object-cover bg-slate-950 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition line-clamp-1">
                    {title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="uppercase text-[10px] font-bold text-indigo-400">
                      {item.media_type === "tv" ? "TV Show" : "Movie"}
                    </span>
                    {year && <span>• {year}</span>}
                    {item.vote_average > 0 && (
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {item.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
