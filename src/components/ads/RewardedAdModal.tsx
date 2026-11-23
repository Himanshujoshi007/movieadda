"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { MediaItem } from "@/lib/types";

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem | null;
}

export default function RewardedAdModal({ isOpen, onClose, media }: RewardedAdModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [isAdComplete, setIsAdComplete] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setIsAdComplete(false);
      setDownloadStarted(false);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsAdComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen || !media) return null;

  const handleDownload = () => {
    setDownloadStarted(true);
    // Trigger sample trailer or info sheet download
    const blob = new Blob(
      [
        `CineVerse Official Media Sheet\n\nTitle: ${media.title || media.name}\nRating: ${media.vote_average}/10\nRelease Date: ${media.release_date || media.first_air_date}\n\nOverview:\n${media.overview}\n\nDownloaded via CineVerse Sponsored Access.`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(media.title || media.name || "media").replace(/[^a-zA-Z0-9]/g, "_")}_info.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              Sponsored Access
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              Download {media.title || media.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Video Ad Box */}
        <div className="my-5 relative rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden aspect-video flex flex-col items-center justify-center p-4 text-center">
          {!isAdComplete ? (
            <>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-mono font-medium text-amber-300">
                Ad: {countdown}s remaining
              </div>
              <div className="w-12 h-12 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mb-3 animate-pulse">
                <Play className="w-6 h-6 text-indigo-400 fill-indigo-400 ml-0.5" />
              </div>
              <h4 className="font-semibold text-sm text-slate-200">
                Sponsored Partner Advertisement
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Watching this short sponsor clip unlocks your high-speed download link for free.
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
              <h4 className="font-bold text-emerald-400 text-sm">Reward Unlocked!</h4>
              <p className="text-xs text-slate-300 mt-1">
                Thank you for supporting CineVerse. Your download is ready.
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            disabled={!isAdComplete}
            onClick={handleDownload}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              isAdComplete
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 cursor-pointer active:scale-[0.98]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
            }`}
          >
            <Download className="w-4 h-4" />
            {downloadStarted
              ? "Downloaded Successfully!"
              : isAdComplete
              ? "Download File Now (Unlocked)"
              : `Watch Ad to Unlock (${countdown}s)`}
          </button>

          <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Ad-supported downloads keep CineVerse free for all community members.
          </p>
        </div>
      </div>
    </div>
  );
}
