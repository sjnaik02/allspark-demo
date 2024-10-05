'use client'

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingState from './LoadingState';
import FileDisplay from './FileDisplay';

const LeftPanel = ({ onFileSelect, onFileUpload, uploadedFiles }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        onFileUpload(files);
        setIsLoading(false);
      }, 4000);
    }
  };

  return (
    <div className="p-6 overflow-auto border-r flex flex-col h-full">
      {isLoading ? (
        <LoadingState />
      ) : uploadedFiles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Upload className="h-16 w-16 mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
          <p className="text-gray-500 mb-4 text-center">Upload your PDF documents or folders to get started with AllSpark</p>
          <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
            <span>Upload Files or Folders</span>
            <input
              type="file"
              multiple
              webkitdirectory=""
              directory=""
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : (
        <>
          <FileDisplay 
            onFileSelect={onFileSelect}
            files={uploadedFiles}
            isCollapsible={false}
          />
          
          <div className="mt-auto pt-4 text-lg">
            <p className="mb-2">What would you like to do?</p>
            <div className="flex justify-between gap-2">
              <Button className="flex-1 font-medium font-mono" variant="">Intake Summary</Button>
              <Button className="flex-1 font-medium font-mono" variant="">Chronology</Button>
              <Button className="flex-1 font-medium font-mono" variant="">Generate Demand Letter</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftPanel;