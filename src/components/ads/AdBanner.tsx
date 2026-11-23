"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "@/lib/settings";

interface AdBannerProps {
  format: "leaderboard" | "infeed" | "sidebar";
  slotId?: string;
  className?: string;
}

export default function AdBanner({ format, slotId = "0000000000", className = "" }: AdBannerProps) {
  const { settings } = useSettings();
  const [adLoaded, setAdLoaded] = useState(false);
  const adsenseClientId = settings.adsenseClientId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

  useEffect(() => {
    if (adsenseClientId && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (err) {
        console.error("AdSense initialization error:", err);
      }
    }
  }, [adsenseClientId]);

  if (!settings.enableAds) return null;

  const dimensions = {
    leaderboard: "w-full max-w-[728px] h-[90px] min-h-[50px]",
    infeed: "w-full max-w-[340px] h-[300px] md:h-[380px]",
    sidebar: "w-full max-w-[300px] h-[600px] min-h-[250px]",
  };

  const labels = {
    leaderboard: "Leaderboard Ad Slot (728x90)",
    infeed: "In-Feed Sponsored Card (300x250)",
    sidebar: "Sidebar Half-Page Ad (300x600)",
  };

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-center overflow-hidden my-6 ${className}`}
    >
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">
        Advertisement
      </div>

      <div
        className={`${dimensions[format]} rounded-xl border border-dashed border-slate-800 bg-gradient-to-b from-slate-900/40 to-slate-950/80 flex flex-col items-center justify-center p-4 relative group transition-all duration-300 hover:border-red-500/40 shadow-inner`}
      >
        {adsenseClientId ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={adsenseClientId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-1 select-none">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-600/10 text-red-400 border border-red-500/20">
              Sponsored Cinema Partner
            </span>
            <p className="text-xs font-medium text-neutral-300">{labels[format]}</p>
            <p className="text-[11px] text-neutral-500 max-w-xs">
              Ultra HD 4K Cinema Advertising Network • MovieAdda VIP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
