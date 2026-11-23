"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Server,
  Tv,
  Film,
  Sparkles,
  RefreshCw,
  Play,
  Video,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MonitorPlay,
  Zap,
  ExternalLink,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { MediaItem } from "@/lib/types";
import { getStreamUrl, STREAM_PROVIDERS, useSettings } from "@/lib/settings";

interface StreamPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem | null;
  initialTrailerKey?: string;
  initialSeason?: number;
  initialEpisode?: number;
}

export default function StreamPlayerModal({
  isOpen,
  onClose,
  media,
  initialTrailerKey,
  initialSeason = 1,
  initialEpisode = 1,
}: StreamPlayerModalProps) {
  const { settings } = useSettings();
  const [selectedServer, setSelectedServer] = useState<string>("autoembed");
  const [season, setSeason] = useState(initialSeason);
  const [episode, setEpisode] = useState(initialEpisode);
  const [mode, setMode] = useState<"stream" | "trailer" | "direct">("stream");
  const [trailerKey, setTrailerKey] = useState<string>(initialTrailerKey || "");
  const [reloadKey, setReloadKey] = useState(0);
  const [cinemaLights, setCinemaLights] = useState(false);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);

  // Fetch trailer key dynamically from TMDB if not present
  useEffect(() => {
    if (!isOpen || !media) return;

    setSelectedServer(settings.activeProviderId || "autoembed");
    setSeason(initialSeason || 1);
    setEpisode(initialEpisode || 1);
    setReloadKey(Date.now());
    document.body.style.overflow = "hidden";

    // Set initial trailer if present
    if (media.trailer_key) {
      setTrailerKey(media.trailer_key);
    } else {
      // Fetch trailer from TMDB API
      const mediaType = media.media_type || (media.name ? "tv" : "movie");
      const apiKey = settings.tmdbApiKey || "5e49eb749da0a3b26445dc786d0de3df";
      setIsTrailerLoading(true);

      fetch(`https://api.themoviedb.org/3/${mediaType}/${media.id}/videos?api_key=${apiKey}&language=en-US`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const official = data.results.find(
              (v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
            );
            if (official) {
              setTrailerKey(official.key);
            } else if (data.results[0]?.key) {
              setTrailerKey(data.results[0].key);
            }
          }
        })
        .catch((e) => console.log("Trailer lookup note:", e))
        .finally(() => setIsTrailerLoading(false));
    }

    // Default mode: if movie has release year > 2025 (unreleased), default to trailer so user gets working video immediately!
    const year = parseInt((media.release_date || media.first_air_date || "").slice(0, 4) || "2024", 10);
    if (year > 2025) {
      setMode("trailer");
    } else {
      setMode("stream");
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, media, initialSeason, initialEpisode, settings.activeProviderId, settings.tmdbApiKey]);

  if (!isOpen || !media) return null;

  const isTv = media.media_type === "tv" || Boolean(media.name);
  const title = media.title || media.name || "Untitled";
  const releaseYear = (media.release_date || media.first_air_date || "").slice(0, 4) || "2024";
  const isUnreleased = parseInt(releaseYear, 10) > 2025;

  // Active video source resolution
  let currentSrc = "";
  if (mode === "trailer") {
    // If we have a trailer key, play official YouTube nocookie embed
    const key = trailerKey || media.trailer_key || "Way9Dexny3w";
    currentSrc = `https://www.youtube-nocookie.com/embed/${key}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&enablejsapi=1`;
  } else if (mode === "direct") {
    // Direct cinema sample stream fallback
    currentSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else {
    // Full movie / TV stream engine
    currentSrc = getStreamUrl(media.id, isTv ? "tv" : "movie", season, episode, selectedServer);
  }

  const handleNextEpisode = () => {
    setEpisode((prev) => prev + 1);
    setReloadKey(Date.now());
  };

  const handlePrevEpisode = () => {
    if (episode > 1) {
      setEpisode((prev) => prev - 1);
      setReloadKey(Date.now());
    }
  };

  const handleReload = () => {
    setReloadKey(Date.now());
  };

  const handleOpenExternal = () => {
    window.open(currentSrc, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-300 ${
        cinemaLights ? "bg-black" : "bg-[#030407]/94 backdrop-blur-3xl"
      } animate-fade-in`}
    >
      {/* Luxurious Ambient Ambilight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[75%] bg-gradient-to-tr from-red-600/25 via-indigo-600/20 to-cyan-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative w-full max-w-6xl rounded-2xl sm:rounded-3xl bg-[#090a12]/98 border border-white/10 shadow-[0_0_100px_rgba(229,9,20,0.3)] overflow-hidden flex flex-col max-h-[96vh] text-white z-10">
        {/* Top Glass Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02] backdrop-blur-xl gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#e50914] via-rose-600 to-red-600 flex items-center justify-center shadow-lg shadow-red-600/40">
              <MonitorPlay className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-500/15 px-2 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  MovieAdda Cinema Player
                </span>
                <span className="text-xs text-neutral-400">
                  • {isTv ? `TV Series (S${season}:E${episode})` : "Feature Film"} • {releaseYear}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white tracking-tight line-clamp-1">
                {title}
              </h2>
            </div>
          </div>

          {/* Action Buttons: External Player, Cinema Lights, Reload, Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenExternal}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition cursor-pointer flex items-center gap-1"
              title="Open Stream in Dedicated 4K Fullscreen Window"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Popout 4K</span>
            </button>

            <button
              onClick={() => setCinemaLights(!cinemaLights)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                cinemaLights
                  ? "bg-amber-500 text-black border-amber-400 font-bold"
                  : "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
              title="Toggle Cinema Theater Lights"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{cinemaLights ? "Lights On" : "Lights Off"}</span>
            </button>

            <button
              onClick={handleReload}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition cursor-pointer"
              title="Reload Video Buffer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/30 text-white transition cursor-pointer shadow-lg shadow-red-600/30"
              title="Close Cinema Player (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unreleased Movie Alert Banner */}
        {isUnreleased && (
          <div className="px-4 py-2 bg-gradient-to-r from-amber-950/80 via-red-950/60 to-neutral-900 border-b border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Upcoming Theatrical Release ({releaseYear}):</strong> Full movie stream is not yet released digitally. Playing the official <strong>4K Cinema Teaser/Trailer</strong> below!
              </span>
            </div>
          </div>
        )}

        {/* Master Playback Engine Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-2.5 bg-black/60 border-b border-white/5 gap-3 text-xs backdrop-blur-md">
          {/* Primary Stream Engine Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-400 font-semibold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Stream Line:
            </span>

            {/* Server Buttons */}
            {STREAM_PROVIDERS.map((p, idx) => {
              const isActive = mode === "stream" && selectedServer === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setMode("stream");
                    setSelectedServer(p.id);
                    setReloadKey(Date.now());
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-gradient-to-r from-[#e50914] to-rose-600 text-white shadow-lg shadow-red-600/40 border border-red-400/50 scale-105"
                      : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5"
                  }`}
                >
                  <span>Server {idx + 1}</span>
                  <span className="text-[10px] opacity-75 font-normal hidden md:inline">
                    ({p.badge})
                  </span>
                </button>
              );
            })}

            {/* Official 4K Cinema Video Toggle (Guaranteed Playback) */}
            <button
              onClick={() => {
                setMode("trailer");
                setReloadKey(Date.now());
              }}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                mode === "trailer"
                  ? "bg-gradient-to-r from-red-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/50 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5"
              }`}
            >
              <Video className="w-3.5 h-3.5 text-red-400" />
              <span>Official 4K Cinema Video</span>
            </button>
          </div>

          {/* TV Episode Selector */}
          {isTv && mode === "stream" && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevEpisode}
                disabled={episode <= 1}
                className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-40 text-neutral-300"
                title="Previous Episode"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 text-xs">
                <span className="text-neutral-400 font-semibold">S</span>
                <select
                  value={season}
                  onChange={(e) => {
                    setSeason(Number(e.target.value));
                    setReloadKey(Date.now());
                  }}
                  className="bg-neutral-900 border border-neutral-700 rounded-md px-1.5 py-0.5 text-white font-bold"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <span className="text-neutral-400 font-semibold ml-1">E</span>
                <select
                  value={episode}
                  onChange={(e) => {
                    setEpisode(Number(e.target.value));
                    setReloadKey(Date.now());
                  }}
                  className="bg-neutral-900 border border-neutral-700 rounded-md px-1.5 py-0.5 text-white font-bold"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleNextEpisode}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300"
                title="Next Episode"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* High-Impact 4K Cinema Stream Booster Sponsor Bar */}
        {settings.enableAds && (
          <div className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-[#070b14] via-[#0f172a] to-[#070b14] border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  ⚡ 4K Buffer Shield
                </span>
                <span className="text-neutral-300 font-medium text-xs">
                  Bypass ISP speed throttling &amp; stream in Ultra 4K. Sponsored by NordVPN (74% OFF).
                </span>
              </div>
            </div>

            <a
              href={settings.customSponsorUrl || "https://nordvpn.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 shrink-0 transition hover:scale-105 active:scale-95"
            >
              <span>Claim 74% Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Main Video Cinema Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          {mode === "direct" ? (
            <video
              key={`${currentSrc}-${reloadKey}`}
              src={currentSrc}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              key={`${currentSrc}-${reloadKey}`}
              src={currentSrc}
              title={title}
              referrerPolicy="origin"
              className="w-full h-full border-0 absolute inset-0 z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          )}
        </div>

        {/* Cinema Footer Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-black/80 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-neutral-300 font-medium">
              {mode === "trailer"
                ? "Official 4K Cinema Video Playing • High-Bitrate HD"
                : "Live Movie Stream Active • Ultra HD Ready"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <span>
              If a server is slow: switch to <strong>Server 2 (AutoEmbed)</strong> or <strong>Official 4K Cinema Video</strong> above.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
