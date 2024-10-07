import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileDisplay from './FileDisplay';

const GroupSelectionPanel = ({ groupedFiles, onContinue, onFileSelect }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (groupId) => {
    setSelectedGroup(groupId === selectedGroup ? null : groupId);
  };

  return (
    <div className="h-full p-6 overflow-auto flex justify-center items-start">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Document Groups</h1>
          <p className="text-lg text-muted-foreground">Select a group to continue</p>
        </div>
        <div className="space-y-4">
          {Object.entries(groupedFiles).map(([groupId, group]) => (
            <FileDisplay 
              key={groupId}
              files={group.files}
              name={group.name}
              summary={group.summary}
              isSelected={selectedGroup === groupId}
              onSelect={() => handleGroupSelect(groupId)}
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
            Continue with {selectedGroup ? groupedFiles[selectedGroup].name : ''}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupSelectionPanel;