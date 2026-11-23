"use client";

import React, { useState } from "react";
import { useSettings } from "@/lib/settings";
import { ShieldCheck, ExternalLink, X, Zap } from "lucide-react";

export default function StickyBottomAdBar() {
  const { settings } = useSettings();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.enableAds || isDismissed) return null;

  const sponsorUrl = settings.customSponsorUrl || "https://nordvpn.com";
  const sponsorTitle = settings.customSponsorTitle || "NordVPN Cinema Shield — 74% OFF + 3 Months Free";

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-2 sm:p-3 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="relative rounded-2xl bg-[#0d111a]/95 backdrop-blur-xl border border-cyan-500/40 px-3 sm:px-5 py-2.5 shadow-[0_0_35px_rgba(6,182,212,0.3)] flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/20">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black tracking-widest uppercase bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  ⚡ 4K Buffer Shield
                </span>
                <span className="text-[10px] font-bold text-emerald-400 hidden sm:inline">
                  Special Promotion
                </span>
              </div>
              <p className="text-xs font-extrabold text-white truncate mt-0.5">
                {sponsorTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={sponsorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs shadow-md shadow-cyan-500/30 flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Claim Deal</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsDismissed(true)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
