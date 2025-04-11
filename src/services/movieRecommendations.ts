
import { Movie, UserPreference, RecommendationType } from "@/types";
import { sampleMovies } from "@/data/sampleMovies";
import { getMoviesByGenre, getTopRatedMovies } from "./movieQueries";

/**
 * Generate personalized movie recommendations based on user preferences
 */
export const generateRecommendations = (preferences: UserPreference): Promise<Movie[]> => {
  // Simple recommendation algorithm based on user preferences
  let recommendations = [...sampleMovies];
  
  // Filter by genres if preferences.genres is not empty
  if (preferences.genres.length > 0) {
    recommendations = recommendations.filter(movie => 
      movie.genres.some(genre => 
        preferences.genres.includes(genre)
      )
    );
  }
  
  // Filter by release year
  const [minYear, maxYear] = preferences.yearRange;
  recommendations = recommendations.filter(movie => {
    const movieYear = new Date(movie.releaseDate).getFullYear();
    return movieYear >= minYear && movieYear <= maxYear;
  });
  
  // Filter by minimum rating
  recommendations = recommendations.filter(movie => 
    movie.voteAverage >= preferences.rating
  );
  
  // Sort by vote average (descending)
  recommendations = recommendations.sort((a, b) => 
    b.voteAverage - a.voteAverage
  );
  
  return Promise.resolve(recommendations);
};

/**
 * Get movies by category for the recommendation tabs
 */
export const getCategoryMovies = (category: RecommendationType): Promise<Movie[]> => {
  switch(category) {
    case 'action':
      return getMoviesByGenre('Action');
    case 'comedy':
      return getMoviesByGenre('Comedy');
    case 'drama':
      return getMoviesByGenre('Drama');
    case 'horror':
      return getMoviesByGenre('Horror');
    case 'scifi':
      return getMoviesByGenre('Sci-Fi');
    case 'family':
      return getMoviesByGenre('Family');
    case 'romance':
      return getMoviesByGenre('Romance');
    case 'documentary':
      return getMoviesByGenre('Documentary');
    default:
      return getTopRatedMovies();
  }
};
