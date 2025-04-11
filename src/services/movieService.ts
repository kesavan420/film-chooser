
// Re-export all movie-related functions to maintain backward compatibility
// This ensures existing code doesn't break during the refactoring

import { sampleMovies } from "@/data/sampleMovies";
export { sampleMovies };

export {
  fetchMovies,
  fetchMovieById,
  getTopRatedMovies,
  getRecentMovies, 
  getMoviesByGenre
} from "./movieQueries";

export {
  generateRecommendations,
  getCategoryMovies
} from "./movieRecommendations";
