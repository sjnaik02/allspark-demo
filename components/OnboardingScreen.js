import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileDisplay from './FileDisplay';
import { CheckCircle2 } from 'lucide-react';

const OnboardingScreen = ({ groupedFiles, onContinue }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);

  const toggleGroup = (prefix) => {
    setExpandedGroups(prev => ({ ...prev, [prefix]: !prev[prefix] }));
  };

  const handleGroupSelect = (prefix) => {
    setSelectedGroup(prefix === selectedGroup ? null : prefix);
  };

  return (
    <div className="flex flex-col h-full p-6 overflow-auto max-w-3xl mx-auto">
      <div className=" w-full"> {/* Added max-width and centering */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Document Groups</h1>
            <p className="text-gray-600 mt-1">Select a group to continue</p>
          </div>
          <Button
            onClick={() => onContinue(selectedGroup)}
            disabled={!selectedGroup}
            className="px-6"
          >
            Continue
          </Button>
        </div>
        <div className="space-y-4 flex-grow">
          {Object.entries(groupedFiles).map(([prefix, files]) => (
            <div 
              key={prefix} 
              className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                selectedGroup === prefix ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleGroupSelect(prefix)}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Group: {prefix}</h2>
                {selectedGroup === prefix && (
                  <CheckCircle2 className="text-primary h-6 w-6" />
                )}
              </div>
              <FileDisplay 
                files={files}
                isCollapsible={true}
                isExpanded={expandedGroups[prefix]}
                onToggle={(e) => {
                  e.stopPropagation();
                  toggleGroup(prefix);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;