"use client";

import React from "react";
import { Film, Play } from "lucide-react";
import { useSettings } from "@/lib/settings";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#07080c] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              MOVIE<span className="text-red-500">ADDA</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm text-center md:text-left">
            {settings.appTagline || "Watch Movies & TV Shows in HD with multi-server streaming."}
          </p>
        </div>

        {/* Attributions & Info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
              TMDB API Ready
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-red-400 font-mono">
              Multi-Server Cinema Engine
            </span>
          </div>
          <p className="text-[11px] max-w-md">
            This platform indexes open media data using the TMDB API. Streams are delivered via responsive third-party player embeds.
          </p>
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} MovieAdda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
