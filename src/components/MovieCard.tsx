
import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  // Extract year from release date
  const releaseYear = new Date(movie.releaseDate).getFullYear();
  
  // Format the movie poster URL (in a real app, this would use an API base URL)
  const posterUrl = movie.posterPath.startsWith('http')
    ? movie.posterPath
    : `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
  
  return (
    <Card 
      className="movie-card overflow-hidden border-0 shadow-lg bg-card h-full flex flex-col"
      onClick={() => onClick && onClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity hover:opacity-90"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">{movie.voteAverage.toFixed(1)}</span>
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{releaseYear}</span>
          {movie.duration && (
            <>
              <span className="mx-1">•</span>
              <Clock className="h-3 w-3 mr-1" />
              <span>{movie.duration}</span>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-auto">
          {movie.genres.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-secondary">
              {genre}
            </Badge>
          ))}
          {movie.genres.length > 2 && (
            <Badge variant="secondary" className="text-xs bg-secondary">
              +{movie.genres.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
