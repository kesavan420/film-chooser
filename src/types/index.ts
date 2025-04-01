
export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string;
  voteAverage: number;
  genres: string[];
  duration?: string;
  director?: string;
  cast?: string[];
}

export interface UserPreference {
  genres: string[];
  yearRange: [number, number];
  rating: number;
  keywords: string[];
}

export type RecommendationType = 'action' | 'comedy' | 'drama' | 'horror' | 'scifi' | 'family' | 'romance' | 'documentary';
