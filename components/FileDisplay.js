import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

const FileDisplay = ({ files, name, isSelected, onSelect, onFileSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExtension = name.slice(0, -(extension.length + 1));
    return `${nameWithoutExtension.slice(0, maxLength - 3)}...${extension}`;
  };

  return (
    <div 
      className={`border rounded-lg transition-all duration-200 ${
        isSelected ? 'border-primary bg-primary/5' : ''
      }`}
      onClick={onSelect}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground">{files.length} files</p>
        </div>
        <div onClick={toggleExpanded}>
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center cursor-pointer hover:bg-accent/50 p-2 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect(file);
                }}
              >
                <FileText className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs mt-1 text-center font-mono max-w-[100px]">
                  {truncateFileName(file.name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDisplay;