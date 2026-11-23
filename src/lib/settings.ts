"use client";

import { useState, useEffect } from "react";

export interface StreamProvider {
  id: string;
  name: string;
  movieUrl: string;
  tvUrl: string;
  badge: string;
}

export const STREAM_PROVIDERS: StreamProvider[] = [
  {
    id: "autoembed",
    name: "Server 1 (AutoEmbed 4K Ultra)",
    movieUrl: "https://autoembed.me/movie/tmdb/{id}",
    tvUrl: "https://autoembed.me/tv/tmdb/{id}-{season}-{episode}",
    badge: "⚡ 100% Unblocked 4K",
  },
  {
    id: "vidlink",
    name: "Server 2 (VidLink Pro)",
    movieUrl: "https://vidlink.pro/movie/{id}",
    tvUrl: "https://vidlink.pro/tv/{id}/{season}/{episode}",
    badge: "🚀 Fast 1080p",
  },
  {
    id: "2embed",
    name: "Server 3 (2Embed Global)",
    movieUrl: "https://www.2embed.cc/embed/{id}",
    tvUrl: "https://www.2embed.cc/embedtv/{id}&s={season}&e={episode}",
    badge: "🌐 Worldwide Mirror",
  },
  {
    id: "vidsrc_xyz",
    name: "Server 4 (VidSrc Stream)",
    movieUrl: "https://vidsrc.xyz/embed/movie?tmdb={id}",
    tvUrl: "https://vidsrc.xyz/embed/tv?tmdb={id}&s={season}&e={episode}",
    badge: "🎬 Multi-Audio",
  },
  {
    id: "smashy",
    name: "Server 5 (SmashyStream)",
    movieUrl: "https://player.smashy.stream/movie/{id}",
    tvUrl: "https://player.smashy.stream/tv/{id}?s={season}&e={episode}",
    badge: "⭐ HD Fast",
  },
];

export interface AppSettings {
  appName: string;
  appTagline: string;
  tmdbApiKey: string;
  tmdbLanguage: string;
  activeProviderId: string;
  customMovieTemplate: string;
  customTvTemplate: string;
  adsenseClientId: string;
  enableAds: boolean;
  enableHeaderAd: boolean;
  enableInFeedAd: boolean;
  enableRewardedAd: boolean;
  themeAccent: "red" | "indigo" | "emerald" | "amber" | "cyan";
  heroRotateInterval: number; // seconds
  showTop10Row: boolean;
  showContinueWatching: boolean;
}

const SETTINGS_KEY = "movieadda_settings";

export const DEFAULT_SETTINGS: AppSettings = {
  appName: "MovieAdda",
  appTagline: "Watch Movies & TV Shows in 4K Ultra HD",
  tmdbApiKey: "5e49eb749da0a3b26445dc786d0de3df", // User's approved TMDB API Key
  tmdbLanguage: "en-US",
  activeProviderId: "autoembed",
  customMovieTemplate: "",
  customTvTemplate: "",
  adsenseClientId: "",
  enableAds: true,
  enableHeaderAd: true,
  enableInFeedAd: true,
  enableRewardedAd: true,
  themeAccent: "red",
  heroRotateInterval: 10,
  showTop10Row: true,
  showContinueWatching: true,
};

export function getStoredSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error("Failed to load MovieAdda settings", e);
  }
  return DEFAULT_SETTINGS;
}

export function saveStoredSettings(settings: AppSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("movieadda_settings_updated"));
  } catch (e) {
    console.error("Failed to save MovieAdda settings", e);
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(getStoredSettings());
    setIsLoaded(true);

    const handleUpdate = () => {
      setSettings(getStoredSettings());
    };

    window.addEventListener("movieadda_settings_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("movieadda_settings_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    saveStoredSettings(merged);
  };

  return {
    settings,
    isLoaded,
    updateSettings,
    providers: STREAM_PROVIDERS,
  };
}

export function getStreamUrl(
  mediaId: number,
  type: "movie" | "tv",
  season: number = 1,
  episode: number = 1,
  providerId?: string
): string {
  const settings = getStoredSettings();
  const activeId = providerId || settings.activeProviderId;

  if (activeId === "custom" && settings.customMovieTemplate) {
    const template = type === "movie" ? settings.customMovieTemplate : settings.customTvTemplate;
    return template
      .replace("{id}", String(mediaId))
      .replace("{season}", String(season))
      .replace("{episode}", String(episode));
  }

  const provider = STREAM_PROVIDERS.find((p) => p.id === activeId) || STREAM_PROVIDERS[0];
  if (type === "movie") {
    return provider.movieUrl.replace("{id}", String(mediaId));
  } else {
    return provider.tvUrl
      .replace("{id}", String(mediaId))
      .replace("{season}", String(season))
      .replace("{episode}", String(episode));
  }
}
