
import React from 'react';
import { Film, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-opacity-90 glass-effect fixed top-0 z-50">
      <div className="flex items-center space-x-2">
        <Film className="w-6 h-6 text-cinema-300" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-cinema-300 to-cinema-400 bg-clip-text text-transparent">
          FilmChooser
        </h1>
      </div>
      
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="search" 
            placeholder="Search for movies..." 
            className="pl-10 bg-secondary border-none focus-visible:ring-1 focus-visible:ring-cinema-300"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
          Discover
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
          Recommendations
        </Button>
        <Button variant="outline" size="sm" className="border-cinema-300 text-cinema-300 hover:bg-cinema-300/10">
          <User className="h-4 w-4 mr-2" />
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
