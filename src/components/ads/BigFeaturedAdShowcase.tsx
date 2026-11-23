"use client";

import React from "react";
import { useSettings } from "@/lib/settings";
import { ShieldCheck, Zap, Sparkles, ExternalLink, Flame, Headphones, Award } from "lucide-react";

export default function BigFeaturedAdShowcase() {
  const { settings } = useSettings();

  if (!settings.enableAds) return null;

  const sponsorUrl = settings.customSponsorUrl || "https://nordvpn.com";

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 my-10 z-20">
      {/* Outer Glow Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#131722] via-[#0d1017] to-[#07080c] border border-cyan-500/25 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.12)] overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  Featured Promotion
                </span>
                <span className="text-[10px] font-bold text-neutral-400 font-mono">
                  Verified Cinema Partners
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Supercharge Your 4K Streaming Experience
              </h3>
            </div>
          </div>

          <span className="text-xs text-neutral-400 hidden md:block">
            High-speed servers • Zero ISP throttling • 4K Dolby Atmos
          </span>
        </div>

        {/* 3 High-Impact Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: NordVPN Stream Shield (Primary Affiliate Sponsor) */}
          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl bg-gradient-to-b from-[#1a2233] to-[#0f1420] border border-cyan-500/30 hover:border-cyan-400 p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 text-cyan-400" />
                  Most Popular
                </span>
                <span className="text-xs font-black text-emerald-400">74% OFF</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition">
                    NordVPN Stream Shield
                  </h4>
                  <p className="text-xs text-neutral-400">4K Ultra Fast Servers</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Bypass local ISP speed throttling, unlock 100,000+ global movies, and stream in flawless 4K with 0 buffering.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400">+ 3 Months Free</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 text-white font-extrabold text-xs shadow-md shadow-cyan-500/30 flex items-center gap-1.5 transition">
                <span>Claim Deal</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>

          {/* Card 2: MovieAdda VIP Cinema Pass */}
          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl bg-gradient-to-b from-[#251522] to-[#120b12] border border-red-500/30 hover:border-red-400 p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(229,9,20,0.25)] cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  VIP Cinema
                </span>
                <span className="text-xs font-black text-amber-400">Dolby 7.1</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white group-hover:text-red-300 transition">
                    MovieAdda VIP Pass
                  </h4>
                  <p className="text-xs text-neutral-400">Ad-Free Dedicated Servers</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Enjoy priority 10Gbps unblocked streaming, download movies in 4K HDR, and access multi-language audio tracks.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400">Instant Access</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 group-hover:from-red-500 group-hover:to-rose-500 text-white font-extrabold text-xs shadow-md shadow-red-600/30 flex items-center gap-1.5 transition">
                <span>Unlock VIP</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>

          {/* Card 3: Cinema Surround Sound Gear */}
          <a
            href={sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl bg-gradient-to-b from-[#1b1c2b] to-[#0e0e17] border border-purple-500/30 hover:border-purple-400 p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase tracking-wider flex items-center gap-1">
                  <Headphones className="w-3 h-3 text-purple-400" />
                  Cinema Audio
                </span>
                <span className="text-xs font-black text-purple-400">Atmos Ready</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                  <Headphones className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white group-hover:text-purple-300 transition">
                    Dolby Cinema Audio
                  </h4>
                  <p className="text-xs text-neutral-400">Immersive Surround Gear</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Transform your home theater with deep cinema bass, crystal clear dialogue, and spatial 360° Dolby Atmos audio.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-400">Special Discount</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 flex items-center gap-1.5 transition">
                <span>View Gear</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
