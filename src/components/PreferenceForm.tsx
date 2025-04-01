
import React, { useState } from 'react';
import { UserPreference } from '@/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface PreferenceFormProps {
  onSubmit: (preferences: UserPreference) => void;
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  const [genreSelections, setGenreSelections] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, 2023]);
  const [rating, setRating] = useState<number>(7);
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
    'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
    'Horror', 'Music', 'Mystery', 'Romance', 'Sci-Fi', 
    'Thriller', 'War', 'Western'
  ];

  const handleGenreToggle = (genre: string) => {
    if (genreSelections.includes(genre)) {
      setGenreSelections(genreSelections.filter(g => g !== genre));
    } else {
      if (genreSelections.length < 5) {
        setGenreSelections([...genreSelections, genre]);
      }
    }
  };

  const handleAddKeyword = () => {
    if (keyword && !keywords.includes(keyword) && keywords.length < 5) {
      setKeywords([...keywords, keyword]);
      setKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleSubmit = () => {
    const preferences: UserPreference = {
      genres: genreSelections,
      yearRange,
      rating,
      keywords
    };
    onSubmit(preferences);
  };

  return (
    <Card className="w-full bg-card border-border animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cinema-300" />
          Personalize Your Recommendations
        </CardTitle>
        <CardDescription>
          Tell us what you like and we'll find the perfect movies for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium mb-2">What genres do you enjoy? (Select up to 5)</h3>
          <div className="flex flex-wrap gap-2">
            {availableGenres.map(genre => (
              <Badge
                key={genre}
                variant={genreSelections.includes(genre) ? "default" : "outline"}
                className={`cursor-pointer ${
                  genreSelections.includes(genre) 
                    ? "bg-cinema-300 hover:bg-cinema-400" 
                    : "hover:bg-secondary"
                }`}
                onClick={() => handleGenreToggle(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Release years ({yearRange[0]} - {yearRange[1]})</h3>
          <Slider
            defaultValue={[yearRange[0], yearRange[1]]}
            max={2023}
            min={1950}
            step={1}
            value={[yearRange[0], yearRange[1]]}
            onValueChange={(values) => setYearRange([values[0], values[1]])}
            className="py-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Minimum rating</h3>
            <span className="text-sm text-muted-foreground">{rating.toFixed(1)}/10</span>
          </div>
          <Slider
            defaultValue={[rating]}
            max={10}
            min={1}
            step={0.5}
            value={[rating]}
            onValueChange={(values) => setRating(values[0])}
            className="py-4"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Add keywords (optional)</h3>
          <div className="flex gap-2">
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., time travel, robots, superheroes"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
            />
            <Button 
              onClick={handleAddKeyword} 
              variant="secondary"
              disabled={!keyword || keywords.length >= 5}
            >
              Add
            </Button>
          </div>
          
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((kw, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1">
                  {kw}
                  <button
                    className="ml-2 text-xs hover:text-destructive"
                    onClick={() => handleRemoveKeyword(kw)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-cinema-300 hover:bg-cinema-400 text-white"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Recommendations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PreferenceForm;
