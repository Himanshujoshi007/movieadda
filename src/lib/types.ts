export interface MediaItem {
  id: number;
  title: string;
  name?: string; // TV shows
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  media_type?: "movie" | "tv";
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  trailer_key?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MediaDetails extends MediaItem {
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  tagline?: string;
  status?: string;
  cast?: CastMember[];
  videos?: VideoItem[];
  similar?: MediaItem[];
}

export interface LibraryItem extends MediaItem {
  addedAt: number;
}

export interface Genre {
  id: number;
  name: string;
}
