
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieDetails from '@/components/MovieDetails';
import PreferenceForm from '@/components/PreferenceForm';
import RecommendationList from '@/components/RecommendationList';
import { Movie, UserPreference } from '@/types';
import { 
  fetchMovies, 
  getTopRatedMovies, 
  getRecentMovies,
  generateRecommendations
} from '@/services/movieService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
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
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find Your Perfect Movie <span className="bg-gradient-to-r from-cinema-300 to-cinema-400 bg-clip-text text-transparent">Match</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Personalized recommendations based on your preferences, powered by our AI-driven film chooser.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => setShowPersonalization(true)}
                className="bg-cinema-300 hover:bg-cinema-400 text-white"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get Personalized Recommendations
              </Button>
              <Button size="lg" variant="outline">
                Browse Popular Movies
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/2] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop" 
                alt="Cinema experience" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white text-center w-full">
                  <h3 className="text-xl font-bold">Find your next favorite film</h3>
                  <p className="text-sm mt-2 text-gray-300">Tailored to your unique taste</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalization Form */}
        {showPersonalization && (
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Preferences</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowPersonalization(false)}
                size="sm"
              >
                Close
              </Button>
            </div>
            <PreferenceForm onSubmit={handlePreferenceSubmit} />
          </div>
        )}

        {/* Display personalized recommendations if available */}
        {personalizedMovies.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cinema-300" />
                Your Personalized Picks
              </h2>
              <Button 
                variant="link" 
                onClick={() => setShowPersonalization(true)}
                size="sm"
                className="text-cinema-300"
              >
                Adjust Preferences
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {personalizedMovies.slice(0, 5).map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onClick={handleMovieSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Sections */}
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
                  {topRatedMovies.map((movie) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      onClick={handleMovieSelect}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-4">
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
                  {recentMovies.map((movie) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      onClick={handleMovieSelect}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <Separator className="my-8" />
        
        {/* Recommendations by Genre/Category */}
        <RecommendationList onSelectMovie={handleMovieSelect} />
        
        {/* Movie Details Modal */}
        <MovieDetails 
          movie={selectedMovie} 
          isOpen={detailsOpen} 
          onClose={handleCloseDetails}
        />
      </main>
    </div>
  );
};

export default Index;
