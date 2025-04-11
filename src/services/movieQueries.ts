
import { Movie } from "@/types";
import { sampleMovies } from "@/data/sampleMovies";

/**
 * Fetch all movies in the database
 */
export const fetchMovies = (): Promise<Movie[]> => {
  return Promise.resolve(sampleMovies);
};

/**
 * Fetch a movie by its ID
 */
export const fetchMovieById = (id: number): Promise<Movie | undefined> => {
  const movie = sampleMovies.find(movie => movie.id === id);
  return Promise.resolve(movie);
};

/**
 * Get the top rated movies, sorted by vote average
 */
export const getTopRatedMovies = (): Promise<Movie[]> => {
  const topRated = [...sampleMovies].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 5);
  return Promise.resolve(topRated);
};

/**
 * Get the most recent movies, sorted by release date
 */
export const getRecentMovies = (): Promise<Movie[]> => {
  const recent = [...sampleMovies].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 5);
  return Promise.resolve(recent);
};

/**
 * Get movies that match a specific genre
 */
export const getMoviesByGenre = (genre: string): Promise<Movie[]> => {
  const filtered = sampleMovies.filter(movie => 
    movie.genres.some(g => g.toLowerCase() === genre.toLowerCase())
  );
  return Promise.resolve(filtered);
};
