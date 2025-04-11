
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types';

interface PersonalizedRecommendationsProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  onEditPreferences: () => void;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ 
  movies, 
  onMovieSelect,
  onEditPreferences 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cinema-300" />
          Your Personalized Picks
        </h2>
        <Button 
          variant="link" 
          onClick={onEditPreferences}
          size="sm"
          className="text-cinema-300"
        >
          Adjust Preferences
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
