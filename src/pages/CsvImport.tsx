
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { parseMovieCsv, getSampleCsvTemplate } from '@/utils/csvParser';
import { Movie } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import MovieCard from '@/components/MovieCard';
import Header from '@/components/Header';
import { FileDown, FileUp, FilePlus, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CsvImport: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [csvContent, setCsvContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      
      reader.onload = () => {
        const csvText = reader.result as string;
        setCsvContent(csvText);
        
        try {
          const parsedMovies = parseMovieCsv(csvText);
          setMovies(parsedMovies);
          toast({
            title: "CSV Imported Successfully",
            description: `Loaded ${parsedMovies.length} movies from ${file.name}`,
            duration: 3000,
          });
        } catch (error) {
          console.error('Error parsing CSV:', error);
          toast({
            title: "Import Failed",
            description: "The CSV file could not be parsed. Please check the format.",
            variant: "destructive",
            duration: 4000,
          });
        }
      };
      
      reader.readAsText(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxFiles: 1
  });

  const handleDownloadTemplate = () => {
    const template = getSampleCsvTemplate();
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movie_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "You can now fill it with your own movie data and upload it.",
      duration: 3000,
    });
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Import Movies from CSV</h1>
          <p className="text-muted-foreground">
            Upload a CSV file with your movie collection or download our template to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload Area */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 space-y-4">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                  ${isDragActive ? 'border-cinema-300 bg-cinema-300/10' : 'border-border hover:border-cinema-300/50'}`}
              >
                <input {...getInputProps()} />
                <FileUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {isDragActive ? (
                  <p>Drop the CSV file here...</p>
                ) : (
                  <>
                    <p className="font-medium">Drag & drop a CSV file here, or click to select</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your file should include columns for movie details
                    </p>
                  </>
                )}
              </div>

              {fileName && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>File uploaded</AlertTitle>
                  <AlertDescription>{fileName}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-medium">Need a template?</h3>
                <Button 
                  variant="outline" 
                  onClick={handleDownloadTemplate}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CSV Template
                </Button>
              </div>
            </Card>

            {movies.length > 0 && (
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Imported Movies</h3>
                  <span className="text-sm text-muted-foreground">{movies.length} items</span>
                </div>
                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'table')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="table">Table View</TabsTrigger>
                  </TabsList>
                </Tabs>
              </Card>
            )}
          </div>
          
          {/* Right Column - Movies Display */}
          <div className="lg:col-span-2">
            {movies.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg">
                <FilePlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No movies imported yet</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload a CSV file to see your movies here
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <TabsContent value="grid" className={viewMode === 'grid' ? 'block' : 'hidden'}>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                      <MovieCard 
                        key={movie.id} 
                        movie={movie}
                        onClick={handleMovieSelect}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="table" className={viewMode === 'table' ? 'block' : 'hidden'}>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Genres</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {movies.map((movie) => (
                          <TableRow 
                            key={movie.id}
                            className="cursor-pointer hover:bg-secondary/40"
                            onClick={() => handleMovieSelect(movie)}
                          >
                            <TableCell className="font-medium">{movie.title}</TableCell>
                            <TableCell>{new Date(movie.releaseDate).getFullYear()}</TableCell>
                            <TableCell>{movie.voteAverage.toFixed(1)}</TableCell>
                            <TableCell>{movie.genres.slice(0, 2).join(', ')}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CsvImport;
