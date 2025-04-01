
import React, { useState, useEffect } from 'react';
import { Movie, RecommendationType } from '@/types';
import MovieCard from './MovieCard';
import { getCategoryMovies } from '@/services/movieService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface RecommendationListProps {
  onSelectMovie: (movie: Movie) => void;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<RecommendationType>('action');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getCategoryMovies(activeCategory);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [activeCategory]);

  const categories = [
    { id: 'action', label: 'Action' },
    { id: 'drama', label: 'Drama' },
    { id: 'scifi', label: 'Sci-Fi' },
    { id: 'comedy', label: 'Comedy' },
    { id: 'family', label: 'Family' }
  ];

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recommendations</h2>
      </div>

      <Tabs defaultValue="action" value={activeCategory} onValueChange={(value) => setActiveCategory(value as RecommendationType)}>
        <TabsList className="h-10 bg-secondary">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="data-[state=active]:bg-cinema-300 data-[state=active]:text-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent 
            key={category.id} 
            value={category.id}
            className="mt-4"
          >
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index} className="space-y-3">
                    <Skeleton className="aspect-[2/3] w-full rounded-md" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onClick={onSelectMovie}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RecommendationList;
