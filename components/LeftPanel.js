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
    <div className="p-6 overflow-auto flex flex-col h-full">
      {uploadedFiles.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Upload className="h-24 w-24 mb-6 text-gray-400" />
          <h2 className="text-3xl font-bold mb-4">Upload Documents</h2>
          <p className="text-lg text-gray-500 mb-8 text-center max-w-md">Upload your PDF documents to get started with AllSpark</p>
          <label className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md">
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
            <div className="mb-6">
              <Button variant="ghost" onClick={onBackToGroups} className="pl-0">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back to Groups
              </Button>
              <h2 className="text-3xl font-bold mt-4">{groupName}</h2>
            </div>
          )}
          <FileDisplay 
            onFileSelect={onFileSelect}
            files={uploadedFiles}
            isCollapsible={false}
          />
          
          <div className="mt-auto pt-6 text-xl">
            <p className="mb-4">What would you like to do?</p>
            <div className="flex justify-between gap-4">
              <Button className="flex-1 font-medium font-mono py-3" variant="">Doc Summary</Button>
              <Button className="flex-1 font-medium font-mono py-3" variant="">Time Line View</Button>
              <Button className="flex-1 font-medium font-mono py-3" variant="">Medical Chronology</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftPanel;