
/**
 * Utility functions for parsing CSV files containing movie data
 */

import { Movie } from "@/types";

/**
 * Parse CSV text into Movie objects
 * Expected CSV format:
 * id,title,overview,releaseDate,posterPath,voteAverage,genres,duration,director,cast
 */
export const parseMovieCsv = (csvText: string): Movie[] => {
  // Split the CSV into rows
  const rows = csvText.split('\n');
  
  // Extract headers from the first row
  const headers = rows[0].split(',').map(header => header.trim());
  
  // Process each data row (skip header row)
  const movies: Movie[] = rows.slice(1)
    .filter(row => row.trim() !== '') // Skip empty rows
    .map((row, index) => {
      const values = parseCSVRow(row);
      const movie: Partial<Movie> = {
        // Assign a unique ID if not provided
        id: parseInt(values[headers.indexOf('id')] || String(index + 1)),
      };
      
      // Map CSV columns to movie properties
      headers.forEach((header, i) => {
        if (i < values.length) {
          switch(header.toLowerCase()) {
            case 'title':
              movie.title = values[i];
              break;
            case 'overview':
              movie.overview = values[i];
              break;
            case 'releasedate':
              movie.releaseDate = values[i];
              break;
            case 'posterpath':
              movie.posterPath = values[i];
              break;
            case 'voteaverage':
              movie.voteAverage = parseFloat(values[i]) || 0;
              break;
            case 'genres':
              movie.genres = values[i].split('|').map(g => g.trim());
              break;
            case 'duration':
              movie.duration = values[i];
              break;
            case 'director':
              movie.director = values[i];
              break;
            case 'cast':
              movie.cast = values[i].split('|').map(c => c.trim());
              break;
          }
        }
      });
      
      // Ensure all required fields have values
      return {
        id: movie.id || 0,
        title: movie.title || 'Unknown Title',
        overview: movie.overview || 'No overview available',
        releaseDate: movie.releaseDate || new Date().toISOString().split('T')[0],
        posterPath: movie.posterPath || 'https://placehold.co/400x600?text=No+Poster',
        voteAverage: movie.voteAverage || 0,
        genres: movie.genres || ['Uncategorized'],
        duration: movie.duration,
        director: movie.director,
        cast: movie.cast
      } as Movie;
    });
    
  return movies;
};

/**
 * Parse a CSV row handling quoted fields that may contain commas
 */
const parseCSVRow = (row: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  return result;
};

/**
 * Generate a sample CSV template for movies
 */
export const getSampleCsvTemplate = (): string => {
  return `id,title,overview,releaseDate,posterPath,voteAverage,genres,duration,director,cast
1,"The Shawshank Redemption","Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.","1994-09-23","/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",8.7,"Drama|Crime","2h 22m","Frank Darabont","Tim Robbins|Morgan Freeman|Bob Gunton"
2,"Inception","A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.","2010-07-15","/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",8.3,"Action|Adventure|Sci-Fi|Thriller","2h 28m","Christopher Nolan","Leonardo DiCaprio|Joseph Gordon-Levitt|Ellen Page"`;
};

