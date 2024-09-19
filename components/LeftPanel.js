'use client'

import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LeftPanel = ({ onFileSelect, onFileUpload, uploadedFiles, onServerResponse }) => {
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files).filter(file => file.type === 'application/pdf');
    onFileUpload(files);

    if (files.length > 0) {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      try {
        const response = await fetch('http://localhost:8080/api/example', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload files');
        }

        const data = await response.json();
        onServerResponse(data);
      } catch (error) {
        console.error('Error uploading files:', error);
        onServerResponse({ error: error.message });
      }
    }
  };

  const truncateFileName = (name, maxLength = 10) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExtension = name.slice(0, -(extension.length + 1));
    const lastLetter = nameWithoutExtension.slice(-1);
    return `${nameWithoutExtension.slice(0, maxLength - 4)}...${lastLetter}.${extension}`;
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
        <div className="bg-gray-50 border border-gray-200 shadow-sm">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Uploaded Files ({uploadedFiles.length})</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-4">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => onFileSelect(file)}
                >
                  <FileText className="h-12 w-12" />
                  <span className="text-xs mt-1 text-center font-mono">{truncateFileName(file.name)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {uploadedFiles.length > 0 && (
        <div className="mt-auto pt-4 text-lg">
          <p className="mb-2">What would you like to do?</p>
          <div className="flex justify-between gap-2">
            <Button className="flex-1 font-medium font-mono" variant="">Intake Summary</Button>
            <Button className="flex-1 font-medium font-mono" variant="">Chronology</Button>
            <Button className="flex-1 font-medium font-mono" variant="">Generate Demand Letter</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;