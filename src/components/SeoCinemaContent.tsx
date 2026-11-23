"use client";

import React, { useState } from "react";
import { Film, Tv, ShieldCheck, Zap, Globe, Sparkles, ChevronDown, MonitorPlay } from "lucide-react";

export default function SeoCinemaContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What makes MovieAdda the best platform to watch movies and TV shows free online?",
      a: "MovieAdda is powered by the next-generation Cinema Multi-Stream Engine. Unlike traditional ad-cluttered streaming websites, MovieAdda provides multi-server redundancy (Server 1 Stream, Server 2 AutoEmbed, Server 3 VidLink, Server 4 Smashy, and guaranteed Official 4K Cinema Video), delivering crystal-clear 4K Ultra HD and 1080p playback with zero mandatory signups or monthly subscription fees."
    },
    {
      q: "How do I switch servers if a movie or TV episode stutters or buffers?",
      a: "Simply click on any movie or TV series card to launch the Cinema Player. Directly above the video frame, you will see the 'Stream Line' selector: Server 1 (VidSrc Pro), Server 2 (AutoEmbed HD), Server 3 (VidLink Fast), Server 4 (Smashy 4K), and Official 4K Cinema Video. If your internet connection or ISP throttles a specific host, switching to Server 2 or 3 restores instant, smooth playback."
    },
    {
      q: "Can I stream MovieAdda on Mobile, iPad, and Smart TVs?",
      a: "Yes! MovieAdda is built with adaptive responsive architecture and Touch-Optimized UI. Whether you are using Chrome, Safari, Firefox, Edge, Android, iOS, macOS, Windows, or casting to an Android TV / Apple TV / Smart TV browser, MovieAdda automatically fits your screen in full native 16:9 widescreen ratio."
    },
    {
      q: "How frequently is the movie and TV catalog updated on MovieAdda?",
      a: "Our automated cinema database refreshes multiple times daily via global media indexes (TMDB and Cinema feeds). As soon as new Hollywood blockbusters, Bollywood releases, Netflix series, HBO originals, anime, or indie films are released digitally or in theaters, they become instantly available on MovieAdda."
    },
    {
      q: "Is it completely free to watch movies on MovieAdda?",
      a: "Yes, 100% free forever. MovieAdda requires no credit card, no sign-up, and no subscription fees. You can stream unlimited full-length movies, binge complete TV seasons, and create your personalized VIP Watchlist directly in your browser."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 text-neutral-300">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>Next-Generation Cinema Experience</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
          Watch 100,000+ Movies &amp; TV Series in 4K Ultra HD Free on MovieAdda
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          Welcome to <strong className="text-white">MovieAdda</strong> — your ultimate destination for unblocked, high-speed cinema streaming. Enjoy Hollywood blockbusters, binge-worthy TV series, trending web series, and award-winning international films with multi-server backup and crystal-clear audio.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-red-500/30 transition group">
          <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Multi-Server 4K Playback</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Never experience dead streams again. Switch between four independent high-speed content delivery lines with adaptive bitrate streaming.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-cyan-500/30 transition group">
          <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
            <Tv className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Binge TV Series by Season &amp; Episode</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Seamlessly navigate through complete seasons and episodes with instant 1-click episode hopping and automatic next-episode queuing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 hover:border-emerald-500/30 transition group">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <MonitorPlay className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Cross-Platform Ready</h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Zero installation required. Instant streaming on iOS, Android, macOS, Windows, Linux, and Smart TV browsers with full native widescreen support.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-black text-white text-center mb-8 flex items-center justify-center gap-2">
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.04] transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
