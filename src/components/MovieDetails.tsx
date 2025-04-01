
import React from 'react';
import { Movie } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Clock, User } from 'lucide-react';

interface MovieDetailsProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;

  // Format the movie poster URL (in a real app, this would use an API base URL)
  const posterUrl = movie.posterPath.startsWith('http')
    ? movie.posterPath
    : `https://image.tmdb.org/t/p/w500${movie.posterPath}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">{movie.title}</DialogTitle>
          <DialogDescription className="flex items-center space-x-4 text-sm py-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{movie.voteAverage.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
            {movie.duration && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{movie.duration}</span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="col-span-1 aspect-[2/3] overflow-hidden rounded-md">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-1 sm:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground">{movie.overview}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <Badge key={index} className="bg-cinema-300 text-primary-foreground">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {movie.director && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  <span>{movie.director}</span>
                </div>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <div className="text-muted-foreground">
                  {movie.cast.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetails;
