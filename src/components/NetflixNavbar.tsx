"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  X,
  Film,
  Flame,
  Shield,
  Zap,
  SlidersHorizontal,
} from "lucide-react";
import { useSettings } from "@/lib/settings";

interface NetflixNavbarProps {
  activeView: "home" | "movies" | "tv" | "popular" | "library";
  onSelectView: (view: "home" | "movies" | "tv" | "popular" | "library") => void;
  onSearchQuery: (query: string) => void;
  searchQuery: string;
  libraryCount: number;
  onOpenAiSuggest?: () => void;
}

export default function NetflixNavbar({
  activeView,
  onSelectView,
  onSearchQuery,
  searchQuery,
  libraryCount,
  onOpenAiSuggest,
}: NetflixNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenSearch = () => {
    setIsSearchExpanded(true);
    setTimeout(() => searchInputRef.current?.focus(), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07070a]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-[#07070a]/95 via-[#07070a]/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left Side: Cyber Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-10">
          {/* Futuristic Brand Logo */}
          <div
            onClick={() => onSelectView("home")}
            className="cursor-pointer select-none group flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#e50914] via-red-600 to-rose-600 flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.6)] group-hover:scale-105 transition-transform">
              <Film className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#e50914] uppercase drop-shadow-[0_0_12px_rgba(229,9,20,0.4)] flex items-center gap-1 font-sans">
                MOVIE<span className="text-white">ADDA</span>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 border border-cyan-500/30 px-1 rounded-sm bg-cyan-500/10 hidden sm:inline">
                  AI 4K
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
            <button
              onClick={() => onSelectView("home")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "home"
                  ? "bg-white/15 text-white shadow-inner border border-white/20 font-black"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onSelectView("movies")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "movies"
                  ? "bg-white/15 text-white shadow-inner border border-white/20 font-black"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Movies
            </button>

            <button
              onClick={() => onSelectView("tv")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeView === "tv"
                  ? "bg-white/15 text-white shadow-inner border border-white/20 font-black"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              TV Series
            </button>

            <button
              onClick={() => onSelectView("popular")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                activeView === "popular"
                  ? "bg-white/15 text-white shadow-inner border border-white/20 font-black"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => onSelectView("library")}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === "library"
                  ? "bg-white/15 text-white shadow-inner border border-white/20 font-black"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>VIP Watchlist</span>
              {libraryCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#e50914] text-white text-[10px] font-black shadow-[0_0_8px_#e50914]">
                  {libraryCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Side: AI Matchmaker, Search, Notifications & VIP Profile */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-white">
          {/* AI Matchmaker Trigger Button */}
          {onOpenAiSuggest && (
            <button
              onClick={onOpenAiSuggest}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-red-600/30 border border-purple-500/40 hover:border-purple-400 text-xs font-bold text-purple-200 hover:text-white transition shadow-lg shadow-purple-500/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>AI Matchmaker</span>
            </button>
          )}

          {/* Futuristic Expanding Search Bar */}
          <div className="relative flex items-center">
            {isSearchExpanded ? (
              <div className="flex items-center bg-black/90 border border-red-500/50 shadow-[0_0_20px_rgba(229,9,20,0.3)] rounded-full px-3 py-1.5 transition-all duration-300 w-52 sm:w-72 backdrop-blur-xl">
                <Search className="w-4 h-4 text-red-500 shrink-0 mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQuery(e.target.value)}
                  placeholder="Search movies, TV, actors..."
                  className="bg-transparent text-xs text-white placeholder-neutral-400 focus:outline-none w-full font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchQuery("")}
                    className="text-neutral-400 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="text-neutral-400 hover:text-white ml-2 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleOpenSearch}
                aria-label="Search"
                className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer text-neutral-300 hover:text-white"
                title="Search Cinema Catalog"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="p-2 rounded-full hover:bg-white/10 transition relative cursor-pointer text-neutral-300 hover:text-white"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]" />
            </button>

            {/* Notification Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 bg-[#0e0f17]/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl p-3.5 space-y-2.5 text-xs z-50 backdrop-blur-2xl animate-fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="font-bold text-white text-xs uppercase tracking-wider">
                    Cinema Notifications
                  </span>
                  <span className="text-[10px] text-red-400 font-mono">Live Feeds</span>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition">
                  <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#e50914]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">4K Stream Ready: Dune: Part Two</h5>
                    <p className="text-neutral-400 text-[11px] mt-0.5">Stream on Server 1 with Dolby Atmos audio.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Server Engine Updated</h5>
                    <p className="text-neutral-400 text-[11px] mt-0.5">VidLink Pro &amp; AutoEmbed are now active.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative">
            <div
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer group p-1 rounded-full hover:bg-white/5 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e50914] to-rose-600 flex items-center justify-center font-black text-xs text-white shadow-[0_0_12px_rgba(229,9,20,0.5)] border border-red-400/30">
                H
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition" />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 bg-[#0e0f17]/95 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl py-2 text-xs z-50 backdrop-blur-2xl animate-fade-in">
                <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e50914] to-rose-600 flex items-center justify-center font-black text-[11px] text-white">
                    H
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-black text-white truncate">Himanshu Joshi</span>
                    <span className="text-[10px] text-emerald-400 font-mono">MovieAdda VIP Member</span>
                  </div>
                </div>

                <div className="px-4 py-2 text-[11px] text-neutral-400 border-b border-white/5">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Ultra 4K HDR Pass Active
                  </span>
                </div>

                <button
                  onClick={() => {
                    onSelectView("library");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-white/10 text-neutral-200 hover:text-white transition cursor-pointer font-semibold"
                >
                  <Film className="w-4 h-4 text-cyan-400" />
                  <span>My VIP Watchlist ({libraryCount})</span>
                </button>

                <div className="border-t border-white/10 my-1" />

                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 text-neutral-500 hover:text-neutral-300 transition cursor-pointer text-[11px]"
                >
                  Close Menu
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around py-2.5 border-t border-white/10 bg-[#07070a]/95 backdrop-blur-xl text-xs font-bold">
        <button
          onClick={() => onSelectView("home")}
          className={`cursor-pointer ${activeView === "home" ? "text-[#e50914] font-black" : "text-neutral-400"}`}
        >
          Home
        </button>
        <button
          onClick={() => onSelectView("movies")}
          className={`cursor-pointer ${activeView === "movies" ? "text-[#e50914] font-black" : "text-neutral-400"}`}
        >
          Movies
        </button>
        <button
          onClick={() => onSelectView("tv")}
          className={`cursor-pointer ${activeView === "tv" ? "text-[#e50914] font-black" : "text-neutral-400"}`}
        >
          TV Series
        </button>
        <button
          onClick={() => onSelectView("popular")}
          className={`cursor-pointer ${activeView === "popular" ? "text-[#e50914] font-black" : "text-neutral-400"}`}
        >
          Trending
        </button>
        <button
          onClick={() => onSelectView("library")}
          className={`cursor-pointer ${activeView === "library" ? "text-[#e50914] font-black" : "text-neutral-400"}`}
        >
          List ({libraryCount})
        </button>
      </div>
    </header>
  );
}
