import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileDisplay from './FileDisplay';

const GroupSelectionPanel = ({ groupedFiles, onContinue, onFileSelect }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (prefix) => {
    setSelectedGroup(prefix === selectedGroup ? null : prefix);
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Document Groups</h1>
        <p className="text-lg text-muted-foreground">Select a group to continue</p>
      </div>
      <div className="space-y-4">
        {Object.entries(groupedFiles).map(([prefix, files]) => (
          <FileDisplay 
            key={prefix}
            files={files}
            name={prefix}
            isSelected={selectedGroup === prefix}
            onSelect={() => handleGroupSelect(prefix)}
            onFileSelect={onFileSelect}
          />
        ))}
      </div>
      <div className="mt-8">
        <Button
          onClick={() => onContinue(selectedGroup)}
          disabled={!selectedGroup}
          className="w-full py-2 text-lg"
        >
          Continue with {selectedGroup}
        </Button>
      </div>
    </div>
  );
};

export default GroupSelectionPanel;