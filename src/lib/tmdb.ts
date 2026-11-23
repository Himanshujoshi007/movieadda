import { MediaItem, MediaDetails, Genre, VideoItem, CastMember } from "./types";
import { getStoredSettings } from "./settings";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getApiKey = () => {
  if (typeof window !== "undefined") {
    const fromStorage = getStoredSettings().tmdbApiKey;
    if (fromStorage && fromStorage.trim().length > 0) return fromStorage.trim();
  }
  return process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
};

export const getImageUrl = (path: string | null, size: "w500" | "original" = "w500") => {
  if (!path) return "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

export const MOCK_MEDIA: MediaDetails[] = [
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s520Wvu.jpg",
    release_date: "2024-03-01",
    vote_average: 8.3,
    vote_count: 5120,
    media_type: "movie",
    genre_ids: [878, 12],
    runtime: 166,
    tagline: "Long live the fighters.",
    trailer_key: "Way9Dexny3w",
    status: "Released",
    cast: [
      { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
      { id: 505710, name: "Zendaya", character: "Chani", profile_path: "/so3GqzMfSC7Up6FtC4GQZJa2jq9.jpg" },
      { id: 933238, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "/4FlZg4d0m3b22kUaHh0Qx5K7vU0.jpg" },
    ],
  },
  {
    id: 872585,
    title: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveGHudvslioQ9.jpg",
    release_date: "2023-07-21",
    vote_average: 8.1,
    vote_count: 8900,
    media_type: "movie",
    genre_ids: [18, 36],
    runtime: 180,
    tagline: "The world forever changes.",
    trailer_key: "uYPbbksJxIg",
    status: "Released",
    cast: [
      { id: 2037, name: "Cillian Murphy", character: "J. Robert Oppenheimer", profile_path: "/360K3qB67Jau21KqJjC7sU.jpg" },
      { id: 5064, name: "Emily Blunt", character: "Katherine Oppenheimer", profile_path: "/nPJtK0t5x3P21XFpM.jpg" },
    ],
  },
  {
    id: 157336,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    vote_count: 34100,
    media_type: "movie",
    genre_ids: [878, 18, 12],
    runtime: 169,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    trailer_key: "zSWdZVtXT7E",
    status: "Released",
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse's very existence.",
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    release_date: "2023-06-02",
    vote_average: 8.4,
    vote_count: 6400,
    media_type: "movie",
    genre_ids: [16, 28, 12, 878],
    runtime: 140,
    tagline: "It's how you wear the mask that matters.",
    trailer_key: "cqGjhVJWtEg",
    status: "Released",
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    vote_count: 32000,
    media_type: "movie",
    genre_ids: [18, 28, 80, 53],
    runtime: 152,
    tagline: "Welcome to a world without rules.",
    trailer_key: "EXeTwQWrcwY",
    status: "Released",
  },
  {
    id: 299536,
    title: "Avengers: Infinity War",
    overview: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos.",
    poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    backdrop_path: "/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    release_date: "2018-04-25",
    vote_average: 8.3,
    vote_count: 29000,
    media_type: "movie",
    genre_ids: [12, 28, 878],
    runtime: 149,
    tagline: "An entire universe. Once and for all.",
    trailer_key: "6ZfuNTqbHE8",
    status: "Released",
  },
  {
    id: 66732,
    name: "Stranger Things",
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    first_air_date: "2016-07-15",
    vote_average: 8.6,
    vote_count: 17200,
    media_type: "tv",
    genre_ids: [18, 878, 9648],
    number_of_seasons: 4,
    tagline: "Every ending has a beginning.",
    trailer_key: "b9EkMc79ZSU",
    status: "Returning Series",
  },
  {
    id: 100088,
    name: "The Last of Us",
    title: "The Last of Us",
    overview: "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.",
    poster_path: "/uKvVjHNqB5VmOrdxqAt2V7JMrRI.jpg",
    backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    first_air_date: "2023-01-15",
    vote_average: 8.6,
    vote_count: 5100,
    media_type: "tv",
    genre_ids: [18, 10759],
    number_of_seasons: 1,
    tagline: "When you're lost in the darkness, look for the light.",
    trailer_key: "uLtkt8BonwM",
    status: "Returning Series",
  },
  {
    id: 94605,
    name: "Arcane",
    title: "Arcane",
    overview: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and incompatible convictions.",
    poster_path: "/fqldf2t8ztc9aiwn396mlXAwNtL.jpg",
    backdrop_path: "/rkB4LyZHo1NHXSTXYuhapIIOXje.jpg",
    first_air_date: "2021-11-06",
    vote_average: 8.8,
    vote_count: 4200,
    media_type: "tv",
    genre_ids: [16, 10765, 18, 10759],
    number_of_seasons: 2,
    tagline: "Every decision shapes tomorrow.",
    trailer_key: "fXmAurh012s",
    status: "Ended",
  },
  {
    id: 1399,
    name: "Game of Thrones",
    title: "Game of Thrones",
    overview: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.",
    poster_path: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop_path: "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
    first_air_date: "2011-04-17",
    vote_average: 8.4,
    vote_count: 23000,
    media_type: "tv",
    genre_ids: [10765, 18, 10759],
    number_of_seasons: 8,
    tagline: "Winter is coming.",
    trailer_key: "KPLWWIOCOOQ",
    status: "Ended",
  },
  {
    id: 1396,
    name: "Breaking Bad",
    title: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJAGq.jpg",
    backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    first_air_date: "2008-01-20",
    vote_average: 8.9,
    vote_count: 14000,
    media_type: "tv",
    genre_ids: [18, 80],
    number_of_seasons: 5,
    tagline: "Remember my name.",
    trailer_key: "HhesaQXLuRY",
    status: "Ended",
  },
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTjA3R0jFYba16jBB1jv82E9.jpg",
    release_date: "2024-07-24",
    vote_average: 7.7,
    vote_count: 5800,
    media_type: "movie",
    genre_ids: [28, 35, 878],
    runtime: 128,
    tagline: "Come together.",
    trailer_key: "73_1biulkYk",
    status: "Released",
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    overview: "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-23",
    vote_average: 8.7,
    vote_count: 26500,
    media_type: "movie",
    genre_ids: [18, 80],
    runtime: 142,
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    trailer_key: "PLl99DlL6b4",
    status: "Released",
  },
  {
    id: 238,
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps up to take care of the would-be killers.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    vote_average: 8.7,
    vote_count: 19800,
    media_type: "movie",
    genre_ids: [18, 80],
    runtime: 175,
    tagline: "An offer you can't refuse.",
    trailer_key: "UaVTIH8mujA",
    status: "Released",
  },
  {
    id: 27205,
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    release_date: "2010-07-15",
    vote_average: 8.4,
    vote_count: 35000,
    media_type: "movie",
    genre_ids: [28, 878, 12],
    runtime: 148,
    tagline: "Your mind is the scene of the crime.",
    trailer_key: "YoHD9XEInc0",
    status: "Released",
  },
];

async function fetchTMDB<T>(endpoint: string, fallbackData: T): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return fallbackData;
  }

  try {
    const separator = endpoint.includes("?") ? "&" : "?";
    const res = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${apiKey}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.warn(`TMDB request error (${res.status}): ${endpoint}. Using fallback.`);
      return fallbackData;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("TMDB fetch error:", err);
    return fallbackData;
  }
}

export async function testTmdbApiKey(key: string): Promise<{ success: boolean; message: string }> {
  if (!key.trim()) return { success: false, message: "API key cannot be empty" };
  try {
    const res = await fetch(`${BASE_URL}/authentication?api_key=${key.trim()}`);
    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, message: "Valid TMDB API Key! Connection successful." };
    }
    return { success: false, message: data.status_message || "Invalid TMDB API Key" };
  } catch (e: any) {
    return { success: false, message: e.message || "Network error testing key" };
  }
}

export async function getTrending(type: "all" | "movie" | "tv" = "all", timeWindow = "week"): Promise<MediaItem[]> {
  const data = await fetchTMDB<{ results: MediaItem[] }>(
    `/trending/${type}/${timeWindow}`,
    { results: MOCK_MEDIA }
  );
  return data.results.map((item) => ({
    ...item,
    title: item.title || item.name || "Untitled",
    media_type: (item.media_type || (item.name ? "tv" : "movie")) as "movie" | "tv",
  }));
}

export async function getPopularMovies(): Promise<MediaItem[]> {
  const data = await fetchTMDB<{ results: MediaItem[] }>(
    `/movie/popular?language=en-US&page=1`,
    { results: MOCK_MEDIA.filter((m) => m.media_type === "movie" || !m.name) }
  );
  return data.results.map((item) => ({ ...item, media_type: "movie" }));
}

export async function getTopRatedMovies(): Promise<MediaItem[]> {
  const data = await fetchTMDB<{ results: MediaItem[] }>(
    `/movie/top_rated?language=en-US&page=1`,
    { results: [...MOCK_MEDIA].sort((a, b) => b.vote_average - a.vote_average) }
  );
  return data.results.map((item) => ({ ...item, media_type: "movie" }));
}

export async function getPopularTV(): Promise<MediaItem[]> {
  const data = await fetchTMDB<{ results: MediaItem[] }>(
    `/tv/popular?language=en-US&page=1`,
    { results: MOCK_MEDIA.filter((m) => m.media_type === "tv" || m.name) }
  );
  return data.results.map((item) => ({
    ...item,
    title: item.name || item.title || "Untitled",
    media_type: "tv",
  }));
}

export async function getUpcomingMovies(): Promise<MediaItem[]> {
  const data = await fetchTMDB<{ results: MediaItem[] }>(
    `/movie/upcoming?language=en-US&page=1`,
    { results: MOCK_MEDIA.slice(0, 6) }
  );
  return data.results.map((item) => ({ ...item, media_type: "movie" }));
}

export async function getMediaDetails(id: number, type: "movie" | "tv" = "movie"): Promise<MediaDetails> {
  const localMatch = MOCK_MEDIA.find((m) => m.id === id);
  const fallback = localMatch || MOCK_MEDIA[0];

  const apiKey = getApiKey();
  if (!apiKey) {
    return fallback;
  }

  try {
    const [details, credits, videos, similar] = await Promise.all([
      fetchTMDB<MediaDetails>(`/${type}/${id}?language=en-US`, fallback),
      fetchTMDB<{ cast: CastMember[] }>(`/${type}/${id}/credits`, { cast: fallback.cast || [] }),
      fetchTMDB<{ results: VideoItem[] }>(`/${type}/${id}/videos`, { results: [] }),
      fetchTMDB<{ results: MediaItem[] }>(`/${type}/${id}/similar`, { results: [] }),
    ]);

    const trailer = videos.results?.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );

    return {
      ...details,
      title: details.title || details.name || "Untitled",
      media_type: type,
      cast: credits.cast?.slice(0, 8) || [],
      videos: videos.results || [],
      similar: similar.results?.slice(0, 8) || [],
      trailer_key: trailer ? trailer.key : fallback.trailer_key,
    };
  } catch (err) {
    console.error("Failed to fetch full media details:", err);
    return fallback;
  }
}

export async function searchMedia(query: string): Promise<MediaItem[]> {
  if (!query.trim()) return [];

  const apiKey = getApiKey();
  if (!apiKey) {
    const lower = query.toLowerCase();
    return MOCK_MEDIA.filter(
      (m) =>
        (m.title && m.title.toLowerCase().includes(lower)) ||
        (m.name && m.name.toLowerCase().includes(lower)) ||
        (m.overview && m.overview.toLowerCase().includes(lower))
    );
  }

  const data = await fetchTMDB<{ results: MediaItem[] }>(
    `/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
    { results: [] }
  );

  return (data.results || [])
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map((item) => ({
      ...item,
      title: item.title || item.name || "Untitled",
    }));
}
