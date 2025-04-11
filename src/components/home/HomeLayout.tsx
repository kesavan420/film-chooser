
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieDetails from '@/components/MovieDetails';
import { Movie, UserPreference } from '@/types';
import { 
  getTopRatedMovies, 
  getRecentMovies,
  generateRecommendations
} from '@/services/movieService';
import { useToast } from '@/hooks/use-toast';
import HeroSection from './HeroSection';
import PersonalizationForm from './PersonalizationForm';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import FeaturedMovies from './FeaturedMovies';
import RecommendationList from '@/components/RecommendationList';
import { Separator } from '@/components/ui/separator';

const HomeLayout = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [personalizedMovies, setPersonalizedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [topRated, recent] = await Promise.all([
          getTopRatedMovies(),
          getRecentMovies()
        ]);
        
        setTopRatedMovies(topRated);
        setRecentMovies(recent);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handlePreferenceSubmit = async (preferences: UserPreference) => {
    try {
      const recommendations = await generateRecommendations(preferences);
      setPersonalizedMovies(recommendations);
      setShowPersonalization(false);
      
      toast({
        title: "Recommendations Generated!",
        description: `Found ${recommendations.length} movies based on your preferences.`,
        duration: 4000,
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: "An error occurred",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 space-y-12">
        <HeroSection onPersonalize={() => setShowPersonalization(true)} />

        {showPersonalization && (
          <PersonalizationForm 
            onSubmit={handlePreferenceSubmit} 
            onClose={() => setShowPersonalization(false)}
          />
        )}

        {personalizedMovies.length > 0 && (
          <PersonalizedRecommendations 
            movies={personalizedMovies}
            onMovieSelect={handleMovieSelect}
            onEditPreferences={() => setShowPersonalization(true)}
          />
        )}

        <FeaturedMovies 
          loading={loading}
          topRatedMovies={topRatedMovies}
          recentMovies={recentMovies}
          onMovieSelect={handleMovieSelect}
        />
        
        <Separator className="my-8" />
        
        <RecommendationList onSelectMovie={handleMovieSelect} />
        
        <MovieDetails 
          movie={selectedMovie} 
          isOpen={detailsOpen} 
          onClose={handleCloseDetails}
        />
      </main>
    </div>
  );
};

export default HomeLayout;
