"use client";

import React, { useState, useEffect } from "react";
import NetflixNavbar from "@/components/NetflixNavbar";
import NetflixHero from "@/components/NetflixHero";
import NetflixTop10Row from "@/components/NetflixTop10Row";
import NetflixRow from "@/components/NetflixRow";
import NetflixDetailModal from "@/components/NetflixDetailModal";
import StreamPlayerModal from "@/components/StreamPlayerModal";
import TrailerModal from "@/components/TrailerModal";
import AiMatchmakerModal from "@/components/AiMatchmakerModal";
import RewardedAdModal from "@/components/ads/RewardedAdModal";
import AdBanner from "@/components/ads/AdBanner";
import BigFeaturedAdShowcase from "@/components/ads/BigFeaturedAdShowcase";
import StickyBottomAdBar from "@/components/ads/StickyBottomAdBar";
import Footer from "@/components/Footer";
import UserLibrary from "@/components/UserLibrary";
import MovieGrid from "@/components/MovieGrid";

import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTV,
  getUpcomingMovies,
  getMediaDetails,
  searchMedia,
  MOCK_MEDIA,
} from "@/lib/tmdb";
import { MediaItem, MediaDetails } from "@/lib/types";
import { useLibrary } from "@/lib/useLibrary";
import { useSettings } from "@/lib/settings";
import { Sparkles, Zap, Flame, Film, Tv } from "lucide-react";

export default function Home() {
  const { settings } = useSettings();

  // Navigation Views
  const [activeView, setActiveView] = useState<"home" | "movies" | "tv" | "popular" | "library">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Media Collections - Initialized with MOCK_MEDIA so the screen is NEVER blank
  const [trending, setTrending] = useState<MediaItem[]>(MOCK_MEDIA);
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>(
    MOCK_MEDIA.filter((m) => m.media_type === "movie" || !m.name)
  );
  const [topRated, setTopRated] = useState<MediaItem[]>(MOCK_MEDIA);
  const [popularTV, setPopularTV] = useState<MediaItem[]>(
    MOCK_MEDIA.filter((m) => m.media_type === "tv" || Boolean(m.name))
  );
  const [upcoming, setUpcoming] = useState<MediaItem[]>(MOCK_MEDIA.slice(0, 6));

  // Modals
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; media: MediaDetails | null }>({
    isOpen: false,
    media: null,
  });
  const [streamModal, setStreamModal] = useState<{
    isOpen: boolean;
    media: MediaItem | null;
    season?: number;
    episode?: number;
  }>({
    isOpen: false,
    media: null,
  });
  const [trailerModal, setTrailerModal] = useState<{ isOpen: boolean; key?: string; title: string }>({
    isOpen: false,
    title: "",
  });
  const [rewardedAdMedia, setRewardedAdMedia] = useState<MediaItem | null>(null);

  // User Library Hook (Watchlist, Favorites, History)
  const {
    watchlist,
    favorites,
    history,
    isInWatchlist,
    isFavorite,
    toggleWatchlist,
    toggleFavorite,
    addToHistory,
    clearHistory,
  } = useLibrary();

  // Load live media from TMDB
  useEffect(() => {
    async function loadData() {
      try {
        const [trend, popMovies, top, tv, up] = await Promise.all([
          getTrending("all", "week"),
          getPopularMovies(),
          getTopRatedMovies(),
          getPopularTV(),
          getUpcomingMovies(),
        ]);
        const validTrend = (trend || []).filter((m) => m.backdrop_path && m.poster_path);
        if (validTrend.length > 0) setTrending(validTrend);
        if (popMovies && popMovies.length > 0) setPopularMovies(popMovies);
        if (top && top.length > 0) setTopRated(top);
        if (tv && tv.length > 0) setPopularTV(tv);
        if (up && up.length > 0) setUpcoming(up);
      } catch (e) {
        console.error("Failed to load live TMDB data, continuing with curated catalog:", e);
      }
    }
    loadData();
  }, [settings.tmdbApiKey]);

  // Live Search Effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await searchMedia(searchQuery);
      setSearchResults(results);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handlers
  const handleOpenDetail = async (media: MediaItem) => {
    addToHistory(media);
    const mediaType = media.media_type || (media.name ? "tv" : "movie");
    const full = await getMediaDetails(media.id, mediaType);
    setDetailModal({ isOpen: true, media: full });
  };

  const handleStream = async (media: MediaItem, season: number = 1, episode: number = 1) => {
    addToHistory(media);
    setStreamModal({ isOpen: true, media, season, episode });

    // Pre-fetch trailer key in background if missing
    if (!media.trailer_key) {
      const mediaType = media.media_type || (media.name ? "tv" : "movie");
      getMediaDetails(media.id, mediaType).then((full) => {
        if (full?.trailer_key) {
          setStreamModal((prev) =>
            prev.media?.id === media.id ? { ...prev, media: { ...prev.media, trailer_key: full.trailer_key } } : prev
          );
        }
      });
    }
  };

  const handlePlayTrailer = (key: string, title: string) => {
    setTrailerModal({ isOpen: true, key, title });
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-[#ffffff] flex flex-col select-none overflow-x-hidden">
      {/* Futuristic Cyber Navigation Bar */}
      <NetflixNavbar
        activeView={activeView}
        onSelectView={(v) => {
          setActiveView(v);
          setSearchQuery("");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        libraryCount={watchlist.length + favorites.length}
        onOpenAiSuggest={() => setIsAiModalOpen(true)}
      />

      <main className="flex-1">
        {/* Search Results Screen */}
        {searchQuery ? (
          <div className="pt-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>Results for &ldquo;{searchQuery}&rdquo;</span>
                <span className="text-xs font-mono text-neutral-400">({searchResults.length} matches)</span>
              </h2>
            </div>

            <MovieGrid
              items={searchResults}
              onSelect={handleOpenDetail}
              onStreamMedia={handleStream}
              onPlayTrailer={handlePlayTrailer}
              isInWatchlist={(id) => isInWatchlist(id)}
              isFavorite={(id) => isFavorite(id)}
              onToggleWatchlist={toggleWatchlist}
              onToggleFavorite={toggleFavorite}
              showInFeedAd={settings.enableAds}
            />
          </div>
        ) : activeView === "library" ? (
          /* View: VIP Watchlist */
          <div className="pt-24">
            <UserLibrary
              watchlist={watchlist}
              favorites={favorites}
              history={history}
              onSelect={handleOpenDetail}
              onPlayTrailer={handlePlayTrailer}
              isInWatchlist={(id) => isInWatchlist(id)}
              isFavorite={(id) => isFavorite(id)}
              onToggleWatchlist={toggleWatchlist}
              onToggleFavorite={toggleFavorite}
              onClearHistory={clearHistory}
              onExplore={() => setActiveView("home")}
            />
          </div>
        ) : activeView === "movies" ? (
          /* View: Movies Dedicated Catalog */
          <div className="pt-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Film className="w-6 h-6 text-[#e50914]" />
                  <span>Feature Films</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Stream 4K Ultra HD blockbusters and award-winning cinema.
                </p>
              </div>
            </div>

            <MovieGrid
              items={popularMovies}
              onSelect={handleOpenDetail}
              onStreamMedia={handleStream}
              onPlayTrailer={handlePlayTrailer}
              isInWatchlist={(id) => isInWatchlist(id)}
              isFavorite={(id) => isFavorite(id)}
              onToggleWatchlist={toggleWatchlist}
              onToggleFavorite={toggleFavorite}
              showInFeedAd={settings.enableAds}
            />
          </div>
        ) : activeView === "tv" ? (
          /* View: TV Shows Dedicated Catalog */
          <div className="pt-28 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Tv className="w-6 h-6 text-[#e50914]" />
                  <span>TV Series &amp; Shows</span>
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Binge-watch complete seasons with multi-language audio and episode select.
                </p>
              </div>
            </div>

            <MovieGrid
              items={popularTV}
              onSelect={handleOpenDetail}
              onStreamMedia={handleStream}
              onPlayTrailer={handlePlayTrailer}
              isInWatchlist={(id) => isInWatchlist(id)}
              isFavorite={(id) => isFavorite(id)}
              onToggleWatchlist={toggleWatchlist}
              onToggleFavorite={toggleFavorite}
              showInFeedAd={settings.enableAds}
            />
          </div>
        ) : (
          /* View: Authentic Futuristic AI Cinema Home Page */
          <>
            {/* High-Tech Billboard Hero */}
            <NetflixHero
              items={trending.slice(0, 5)}
              onStream={handleStream}
              onMoreInfo={handleOpenDetail}
              isInWatchlist={(id) => isInWatchlist(id)}
              onToggleWatchlist={toggleWatchlist}
              onPlayTrailer={handlePlayTrailer}
            />

            {/* Quick Genre Chips Bar */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-8 sm:-mt-12 z-30 mb-4">
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-red-600 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 shrink-0 flex items-center gap-1.5 cursor-pointer hover:scale-105 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  <span>AI Matchmaker</span>
                </button>

                <button
                  onClick={() => setActiveView("movies")}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs shrink-0 transition"
                >
                  🎬 4K Cinema
                </button>

                <button
                  onClick={() => setActiveView("tv")}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs shrink-0 transition"
                >
                  📺 TV Binge
                </button>

                <button
                  onClick={() => setActiveView("popular")}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs shrink-0 transition flex items-center gap-1"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Top 10 Global</span>
                </button>

                <button
                  onClick={() => setActiveView("library")}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-neutral-300 hover:text-white font-bold text-xs shrink-0 transition"
                >
                  ⭐ VIP List
                </button>
              </div>
            </div>

            {/* Content Rows */}
            <div className="relative z-20 space-y-2 sm:space-y-4">
              {/* Row 1: The Iconic Netflix Top 10 with Giant Numbers */}
              {settings.showTop10Row && (
                <NetflixTop10Row
                  title="Top 10 in Movies Today"
                  items={trending}
                  onSelect={handleOpenDetail}
                  onStream={handleStream}
                  isInWatchlist={(id) => isInWatchlist(id)}
                  onToggleWatchlist={toggleWatchlist}
                />
              )}

              {/* Row 2: Continue Watching (if history exists) */}
              {settings.showContinueWatching && history.length > 0 && (
                <NetflixRow
                  title="Continue Watching for MovieAdda VIP"
                  items={history as MediaItem[]}
                  onSelect={handleOpenDetail}
                  onStream={handleStream}
                  isInWatchlist={(id) => isInWatchlist(id)}
                  onToggleWatchlist={toggleWatchlist}
                  cardFormat="landscape"
                />
              )}

              {/* Row 3: Trending Now */}
              <NetflixRow
                title="Trending Now"
                items={trending}
                onSelect={handleOpenDetail}
                onStream={handleStream}
                isInWatchlist={(id) => isInWatchlist(id)}
                onToggleWatchlist={toggleWatchlist}
                cardFormat="portrait"
              />

              {/* Sponsored Ad Banner */}
              {settings.enableAds && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <AdBanner format="leaderboard" />
                </div>
              )}

              {/* Row 4: Critically Acclaimed TV Dramas */}
              <NetflixRow
                title="Critically Acclaimed TV Dramas"
                items={popularTV}
                onSelect={handleOpenDetail}
                onStream={handleStream}
                isInWatchlist={(id) => isInWatchlist(id)}
                onToggleWatchlist={toggleWatchlist}
                cardFormat="portrait"
              />

              {/* Row 5: Blockbuster Movies */}
              <NetflixRow
                title="Blockbuster Movies"
                items={popularMovies}
                onSelect={handleOpenDetail}
                onStream={handleStream}
                isInWatchlist={(id) => isInWatchlist(id)}
                onToggleWatchlist={toggleWatchlist}
                cardFormat="portrait"
              />

              {/* Big High-Impact Featured Ad Showcase */}
              {settings.enableAds && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
                  <BigFeaturedAdShowcase />
                </div>
              )}

              {/* Row 6: Award-Winning Masterpieces */}
              <NetflixRow
                title="Award-Winning Masterpieces"
                items={topRated}
                onSelect={handleOpenDetail}
                onStream={handleStream}
                isInWatchlist={(id) => isInWatchlist(id)}
                onToggleWatchlist={toggleWatchlist}
                cardFormat="portrait"
              />

              {/* Row 7: Upcoming Releases */}
              {upcoming.length > 0 && (
                <NetflixRow
                  title="Coming This Month"
                  items={upcoming}
                  onSelect={handleOpenDetail}
                  onStream={handleStream}
                  isInWatchlist={(id) => isInWatchlist(id)}
                  onToggleWatchlist={toggleWatchlist}
                  cardFormat="portrait"
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* Floating Futuristic AI Matchmaker Button */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-red-600 text-white font-black text-xs shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center gap-2 border border-purple-400/40 hover:scale-105 active:scale-95 transition cursor-pointer backdrop-blur-md"
        title="Open AI Movie Matchmaker"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="hidden sm:inline">AI Matchmaker</span>
      </button>

      {/* Footer */}
      <Footer />

      {/* Netflix Detail Modal */}
      <NetflixDetailModal
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, media: null })}
        media={detailModal.media}
        onStream={(m, s, e) => handleStream(m, s, e)}
        onPlayTrailer={handlePlayTrailer}
        onOpenRewardedAd={(m) => setRewardedAdMedia(m)}
        isInWatchlist={detailModal.media ? isInWatchlist(detailModal.media.id) : false}
        onToggleWatchlist={toggleWatchlist}
        onSelectSimilar={handleOpenDetail}
      />

      {/* Futuristic Cinema Stream Player Modal */}
      <StreamPlayerModal
        isOpen={streamModal.isOpen}
        onClose={() => setStreamModal({ isOpen: false, media: null })}
        media={streamModal.media}
        initialSeason={streamModal.season}
        initialEpisode={streamModal.episode}
      />

      {/* HD Trailer Player Modal */}
      <TrailerModal
        isOpen={trailerModal.isOpen}
        onClose={() => setTrailerModal({ isOpen: false, title: "" })}
        trailerKey={trailerModal.key}
        title={trailerModal.title}
      />

      {/* AI Matchmaker Modal */}
      <AiMatchmakerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        movies={trending}
        onStream={(m) => handleStream(m)}
        onOpenDetails={(m) => handleOpenDetail(m)}
      />

      {/* Rewarded Ad Simulation Modal */}
      <RewardedAdModal
        isOpen={Boolean(rewardedAdMedia)}
        onClose={() => setRewardedAdMedia(null)}
        media={rewardedAdMedia}
      />

      {/* Floating Sticky Bottom Ad Banner with High-CTR CTA */}
      {settings.enableAds && <StickyBottomAdBar />}
    </div>
  );
}
