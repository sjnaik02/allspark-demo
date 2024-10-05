'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const RightPanel = ({ selectedFile, selectedGroup, onClose }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setContent(
        <iframe
          src={URL.createObjectURL(selectedFile)}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      );
    } else if (selectedGroup) {
      setContent(
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedGroup.name}</h2>
          <p className="text-lg mb-4">{selectedGroup.summary}</p>
          <p className="text-md">Number of files: {selectedGroup.files.length}</p>
        </div>
      );
    } else {
      setContent(null);
    }
  }, [selectedFile, selectedGroup]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="text-lg font-semibold">
          {selectedFile ? `Preview: ${selectedFile.name}` : 
           selectedGroup ? `Case Summary: ${selectedGroup.name}` : 
           'No file or group selected'}
        </h2>
        {(selectedFile || selectedGroup) && (
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        {content ? (
          content
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a file or group to preview</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;