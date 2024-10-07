'use client'

import React from 'react';
import { Upload, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileDisplay from './FileDisplay';

const LeftPanel = ({ onFileSelect, onFileUpload, uploadedFiles, groupName, onBackToGroups }) => {
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log("Files selected:", files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div className="p-6 overflow-auto border-r flex flex-col h-full">
      {uploadedFiles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Upload className="h-16 w-16 mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
          <p className="text-gray-500 mb-4 text-center">Upload your PDF documents to get started with AllSpark</p>
          <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
            <span>Upload Files</span>
            <input
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      ) : (
        <>
          {groupName && (
            <div className="mb-4">
              <Button variant="ghost" onClick={onBackToGroups} className="pl-0">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Groups
              </Button>
              <h2 className="text-2xl font-bold mt-2">{groupName}</h2>
            </div>
          )}
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