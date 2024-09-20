import React from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

const FileDisplay = ({ files, isCollapsible = false, isExpanded = true, onToggle }) => {
  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const extension = name.split('.').pop();
    const nameWithoutExtension = name.slice(0, -(extension.length + 1));
    return `${nameWithoutExtension.slice(0, maxLength - 3)}...${extension}`;
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      {isCollapsible && (
        <div 
          className="p-4 border-b flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <h2 className="text-xl font-semibold">Files ({files.length})</h2>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      )}
      {(!isCollapsible || isExpanded) && (
        <div className="p-4">
          <div className="flex flex-wrap gap-4">
            {files.map((file, index) => (
              <div key={index} className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-400" />
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