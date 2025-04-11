
/**
 * Utility functions for handling file attachments
 */

/**
 * Validates if the file is a CSV
 */
export const isValidCsvFile = (file: File): boolean => {
  // Check if file is CSV by MIME type or extension
  const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/csv'];
  const validExtension = file.name.toLowerCase().endsWith('.csv');
  
  return (validTypes.includes(file.type) || validExtension);
};

/**
 * Read a CSV file and return the content as text
 */
export const readCsvFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
};

