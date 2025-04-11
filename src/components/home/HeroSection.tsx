
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onPersonalize: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPersonalize }) => {
  return (
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
            onClick={onPersonalize}
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
  );
};

export default HeroSection;
