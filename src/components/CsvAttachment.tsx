
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileUp, X, FileCheck, CheckCircle, AlertCircle } from 'lucide-react';
import { isValidCsvFile, readCsvFile } from '@/utils/attachmentUtils';
import { useToast } from '@/hooks/use-toast';

interface CsvAttachmentProps {
  onFileAttached: (content: string, fileName: string) => void;
  onFileRemoved?: () => void;
  className?: string;
}

const CsvAttachment: React.FC<CsvAttachmentProps> = ({
  onFileAttached,
  onFileRemoved,
  className = '',
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('');
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    if (!isValidCsvFile(file)) {
      setError('Please upload a valid CSV file');
      toast({
        title: "Invalid File",
        description: "Please upload a valid CSV file",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const content = await readCsvFile(file);
      setFileName(file.name);
      onFileAttached(content, file.name);
      
      toast({
        title: "File Attached",
        description: `Successfully attached ${file.name}`,
      });
    } catch (err) {
      console.error('Error reading file:', err);
      setError('Failed to read the file. Please try again.');
      toast({
        title: "Error",
        description: "Failed to read the file. Please try again.",
        variant: "destructive",
      });
    }
  }, [onFileAttached, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    maxFiles: 1,
  });

  const handleRemove = () => {
    setFileName('');
    setError('');
    if (onFileRemoved) {
      onFileRemoved();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {!fileName && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
            ${isDragActive ? 'border-cinema-300 bg-cinema-300/10' : 'border-border hover:border-cinema-300/50'}`}
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          {isDragActive ? (
            <p>Drop the CSV file here...</p>
          ) : (
            <>
              <p className="font-medium">Drag & drop a CSV file here, or click to select</p>
              <p className="text-sm text-muted-foreground mt-1">
                Only .csv files are supported
              </p>
            </>
          )}
        </div>
      )}

      {fileName && (
        <Alert className="bg-success/10 border-success">
          <FileCheck className="h-4 w-4 text-success" />
          <AlertTitle className="flex items-center justify-between">
            <span>CSV File Attached</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleRemove} 
              className="h-6 w-6 rounded-full p-0 text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertTitle>
          <AlertDescription className="mt-1 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-success" />
            <span className="text-sm">{fileName}</span>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CsvAttachment;
