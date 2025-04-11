
import React, { useState } from 'react';
import Header from '@/components/Header';
import CsvAttachment from '@/components/CsvAttachment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { parseMovieCsv } from '@/utils/csvParser';
import { Movie } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { FileDown } from 'lucide-react';
import { getSampleCsvTemplate } from '@/utils/csvParser';

const AttachCsv: React.FC = () => {
  const [csvContent, setCsvContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const { toast } = useToast();

  const handleFileAttached = (content: string, name: string) => {
    setCsvContent(content);
    setFileName(name);
    
    try {
      const parsedMovies = parseMovieCsv(content);
      setMovies(parsedMovies);
      toast({
        title: "CSV Processed",
        description: `Successfully processed ${parsedMovies.length} movies from ${name}`,
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast({
        title: "Processing Failed",
        description: "The CSV file could not be parsed. Please check the format.",
        variant: "destructive",
      });
    }
  };

  const handleFileRemoved = () => {
    setCsvContent('');
    setFileName('');
    setMovies([]);
  };

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

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Attach CSV File</h1>
          <p className="text-muted-foreground">
            Upload a CSV file with your movie data or download our template to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Attach CSV File</CardTitle>
              <CardDescription>
                Upload a CSV file with your movie collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CsvAttachment 
                onFileAttached={handleFileAttached} 
                onFileRemoved={handleFileRemoved}
              />
              
              <div className="mt-6 pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadTemplate}
                  className="gap-2"
                >
                  <FileDown className="h-4 w-4" />
                  Download CSV Template
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>
                Information about the attached CSV file
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fileName ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">File Name</h3>
                    <p className="text-muted-foreground">{fileName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Movies Found</h3>
                    <p className="text-muted-foreground">{movies.length} movies</p>
                  </div>
                  {movies.length > 0 && (
                    <div>
                      <h3 className="font-medium">First Few Titles</h3>
                      <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                        {movies.slice(0, 5).map((movie) => (
                          <li key={movie.id}>{movie.title}</li>
                        ))}
                        {movies.length > 5 && <li>... and {movies.length - 5} more</li>}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No CSV file attached yet</p>
                  <p className="text-sm mt-2">Attach a file to see details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AttachCsv;
