"use client";

import React, { useState, useEffect } from "react";
import { Film, Search, Bookmark, Compass, Tv, Clapperboard, Sparkles, Play } from "lucide-react";
import { useSettings } from "@/lib/settings";

interface NavbarProps {
  activeView: "home" | "movies" | "tv" | "library";
  onSelectView: (view: "home" | "movies" | "tv" | "library") => void;
  onOpenSearch: () => void;
  libraryCount: number;
}

export default function Navbar({
  activeView,
  onSelectView,
  onOpenSearch,
  libraryCount,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07080c]/90 backdrop-blur-xl border-b border-red-950/40 shadow-xl shadow-black/50"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* MovieAdda Brand Logo */}
        <div
          onClick={() => onSelectView("home")}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-105 transition duration-300">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
              MOVIE<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 font-extrabold ml-0.5">ADDA</span>
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-1">
              HD Streaming Hub
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
          <button
            onClick={() => onSelectView("home")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              activeView === "home"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Discover
          </button>

          <button
            onClick={() => onSelectView("movies")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              activeView === "movies"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            Movies
          </button>

          <button
            onClick={() => onSelectView("tv")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              activeView === "tv"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            TV Series
          </button>

          <button
            onClick={() => onSelectView("library")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              activeView === "library"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            My Library
            {libraryCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-500/30 text-red-300 text-[10px] flex items-center justify-center font-bold">
                {libraryCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Search & Mobile Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-medium transition cursor-pointer shadow-sm hover:border-slate-700"
          >
            <Search className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Search titles...</span>
            <kbd className="hidden lg:inline text-[10px] bg-slate-800 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              /
            </kbd>
          </button>

          {/* Mobile Library Trigger */}
          <button
            onClick={() => onSelectView("library")}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 relative"
            title="My Library"
          >
            <Bookmark className="w-4 h-4" />
            {libraryCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">
                {libraryCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
