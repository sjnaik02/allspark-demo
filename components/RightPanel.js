'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const RightPanel = ({ selectedFile, onClose, serverResponse }) => {
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
      }
    } else {
      setFileContent(null);
    }
  }, [selectedFile]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="text-lg font-semibold">
          {selectedFile ? `Preview: ${selectedFile.name}` : 'Server Response'}
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
        ) : serverResponse ? (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">File Information:</h3>
            {serverResponse.files.map((file, index) => (
              <div key={index} className="mb-4 p-2 border rounded">
                <p><strong>Filename:</strong> {file.filename}</p>
                <p><strong>Character Count:</strong> {file.char_count}</p>
                <p><strong>Page Count:</strong> {file.page_count}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Upload files to see server response</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;