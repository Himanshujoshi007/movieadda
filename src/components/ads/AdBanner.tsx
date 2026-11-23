"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSettings } from "@/lib/settings";
import { ShieldCheck, ExternalLink, Zap, Sparkles } from "lucide-react";

interface AdBannerProps {
  format: "leaderboard" | "infeed" | "sidebar";
  slotId?: string;
  className?: string;
}

export default function AdBanner({ format, slotId, className = "" }: AdBannerProps) {
  const { settings } = useSettings();
  const [adLoaded, setAdLoaded] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const adsenseClientId = settings.adsenseClientId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
  const effectiveSlotId = slotId || (format === "leaderboard" ? "1234567890" : "");
  const hasRealSlot = Boolean(effectiveSlotId && effectiveSlotId !== "0000000000" && effectiveSlotId.length >= 8);

  const mode = settings.adNetworkMode || "smart_cinema";

  useEffect(() => {
    if (mode === "adsense" && adsenseClientId && hasRealSlot && typeof window !== "undefined") {
      const timer = setTimeout(() => {
        try {
          if (bannerRef.current && bannerRef.current.offsetWidth > 0) {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setAdLoaded(true);
          }
        } catch (err) {
          console.warn("AdSense push deferred until review activation:", err);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mode, adsenseClientId, hasRealSlot]);

  if (!settings.enableAds) return null;

  // Render Adsterra / Custom HTML Script Mode
  if (mode === "adsterra" && settings.adsterraBannerCode) {
    return (
      <div
        ref={bannerRef}
        className={`mx-auto flex flex-col items-center justify-center overflow-hidden my-6 ${className}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">
          Sponsored Stream Partner
        </div>
        <div
          className="rounded-xl overflow-hidden border border-neutral-800 bg-black/60 shadow-xl flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: settings.adsterraBannerCode }}
        />
      </div>
    );
  }

  // Render Google AdSense Mode (Active when custom domain is connected)
  if (mode === "adsense" && adsenseClientId && hasRealSlot) {
    return (
      <div
        ref={bannerRef}
        className={`mx-auto flex flex-col items-center justify-center overflow-hidden my-6 ${className}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">
          Advertisement
        </div>
        <div className="w-full max-w-[728px] h-[90px] rounded-xl border border-dashed border-slate-800 bg-black/60 flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block", minWidth: "250px", minHeight: "50px", width: "100%" }}
            data-ad-client={adsenseClientId}
            data-ad-slot={effectiveSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Smart Cinema Monetization Mode (High-CTR Live Affiliate Sponsor)
  const sponsorTitle = settings.customSponsorTitle || "NordVPN Cinema Shield — 74% OFF + 3 Months Free";
  const sponsorUrl = settings.customSponsorUrl || "https://nordvpn.com";
  const sponsorTagline =
    settings.customSponsorTagline ||
    "Bypass ISP throttling and stream all 4K Ultra HD cinema worldwide with 0 buffering.";

  if (format === "leaderboard") {
    return (
      <div
        ref={bannerRef}
        className={`mx-auto flex flex-col items-center justify-center overflow-hidden my-6 w-full max-w-[728px] ${className}`}
      >
        <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1 flex items-center gap-1.5">
          <span>Sponsored 4K Cinema Partner</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <a
          href={sponsorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[96px] rounded-2xl bg-gradient-to-r from-[#0b0f19] via-[#111827] to-[#1e1022] border border-cyan-500/30 hover:border-cyan-400 p-3 sm:p-4 flex items-center justify-between gap-4 group transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] cursor-pointer"
        >
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  ⚡ 4K Buffer Shield
                </span>
                <span className="text-[10px] font-bold text-emerald-400 hidden sm:inline">
                  Special 74% Discount
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white truncate mt-1 group-hover:text-cyan-300 transition">
                {sponsorTitle}
              </h4>
              <p className="text-[11px] text-neutral-400 truncate hidden sm:block">
                {sponsorTagline}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs shadow-md shadow-cyan-500/25 flex items-center gap-1.5 transition">
              <span>Claim Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>
      </div>
    );
  }

  // In-Feed Card Format (300x250)
  return (
    <div
      ref={bannerRef}
      className={`mx-auto flex flex-col items-center justify-center overflow-hidden my-4 w-full max-w-[340px] ${className}`}
    >
      <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1 flex items-center gap-1.5">
        <span>Featured Streaming Offer</span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      </div>

      <a
        href={sponsorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full p-5 rounded-2xl bg-gradient-to-b from-[#14141c] to-[#0a0a0f] border border-red-500/30 hover:border-red-500 p-4 flex flex-col justify-between gap-4 group transition-all duration-300 shadow-xl shadow-red-500/10 hover:shadow-red-500/20 cursor-pointer text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
            MovieAdda VIP Sponsor
          </span>
        </div>

        <div>
          <h4 className="text-sm font-black text-white group-hover:text-red-400 transition">
            {sponsorTitle}
          </h4>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
            {sponsorTagline}
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-800">
          <span className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 transition">
            <span>Unlock VIP Stream Access</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </a>
    </div>
  );
}
