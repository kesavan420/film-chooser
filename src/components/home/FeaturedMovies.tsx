
import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types';

interface FeaturedMoviesProps {
  loading: boolean;
  topRatedMovies: Movie[];
  recentMovies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ 
  loading, 
  topRatedMovies, 
  recentMovies, 
  onMovieSelect 
}) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="topRated">
        <TabsList className="h-10 bg-secondary">
          <TabsTrigger 
            value="topRated"
            className="data-[state=active]:bg-cinema-300 data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Top Rated
          </TabsTrigger>
          <TabsTrigger 
            value="recent"
            className="data-[state=active]:bg-cinema-300 data-[state=active]:text-white"
          >
            <Clock className="h-4 w-4 mr-2" />
            Recently Released
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="topRated" className="mt-4">
          {loading ? (
            <MovieSkeletonGrid />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topRatedMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={onMovieSelect}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-4">
          {loading ? (
            <MovieSkeletonGrid />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={onMovieSelect}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const MovieSkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {Array(5).fill(0).map((_, index) => (
      <div key={index} className="space-y-3">
        <Skeleton className="aspect-[2/3] w-full rounded-md" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    ))}
  </div>
);

export default FeaturedMovies;
