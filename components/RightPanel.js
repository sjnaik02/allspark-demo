'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const RightPanel = ({ selectedFile, onClose }) => {
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFileContent(
          <iframe
            src={URL.createObjectURL(selectedFile)}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        );
      } else if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFileContent(
          <div className="p-4">
            <p>Preview not available for .docx files.</p>
            <p>Filename: {selectedFile.name}</p>
            <p>File size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
        );
      }
    } else {
      setFileContent(null);
    }
  }, [selectedFile]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="text-lg font-semibold">
          {selectedFile ? `Preview: ${selectedFile.name}` : 'Output'}
        </h2>
        {selectedFile && (
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        {fileContent ? (
          fileContent
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a file to preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;