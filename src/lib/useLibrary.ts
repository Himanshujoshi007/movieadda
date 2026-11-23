"use client";

import { useState, useEffect } from "react";
import { MediaItem, LibraryItem } from "./types";

const WATCHLIST_KEY = "cineverse_watchlist";
const FAVORITES_KEY = "cineverse_favorites";
const HISTORY_KEY = "cineverse_history";

export function useLibrary() {
  const [watchlist, setWatchlist] = useState<LibraryItem[]>([]);
  const [favorites, setFavorites] = useState<LibraryItem[]>([]);
  const [history, setHistory] = useState<LibraryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem(WATCHLIST_KEY);
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      const storedHistory = localStorage.getItem(HISTORY_KEY);

      if (storedWatchlist) setWatchlist(JSON.parse(storedWatchlist));
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    } catch (e) {
      console.error("Failed to load user library from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = (key: string, data: LibraryItem[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const toLibraryItem = (media: MediaItem): LibraryItem => ({
    ...media,
    title: media.title || media.name || "Untitled",
    overview: media.overview || "",
    vote_count: media.vote_count || 0,
    vote_average: media.vote_average || 0,
    media_type: media.media_type || (media.name ? "tv" : "movie"),
    addedAt: Date.now(),
  });

  const toggleWatchlist = (media: MediaItem) => {
    setWatchlist((prev) => {
      const exists = prev.some((i) => i.id === media.id);
      const next = exists ? prev.filter((i) => i.id !== media.id) : [toLibraryItem(media), ...prev];
      saveToStorage(WATCHLIST_KEY, next);
      return next;
    });
  };

  const toggleFavorite = (media: MediaItem) => {
    setFavorites((prev) => {
      const exists = prev.some((i) => i.id === media.id);
      const next = exists ? prev.filter((i) => i.id !== media.id) : [toLibraryItem(media), ...prev];
      saveToStorage(FAVORITES_KEY, next);
      return next;
    });
  };

  const addToHistory = (media: MediaItem) => {
    setHistory((prev) => {
      const filtered = prev.filter((i) => i.id !== media.id);
      const next = [toLibraryItem(media), ...filtered].slice(0, 30); // keep recent 30
      saveToStorage(HISTORY_KEY, next);
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return {
    watchlist,
    favorites,
    history,
    isLoaded,
    isInWatchlist: (id: number) => watchlist.some((i) => i.id === id),
    isFavorite: (id: number) => favorites.some((i) => i.id === id),
    toggleWatchlist,
    toggleFavorite,
    addToHistory,
    clearHistory,
  };
}
