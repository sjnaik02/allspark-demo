'use client'

import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import GroupSelectionPanel from '@/components/GroupSelectionPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { flattenFileStructure, groupFilesByCase } from '@/lib/utils';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [groupedFiles, setGroupedFiles] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleFileSelect = (file) => {
    if (selectedFile && selectedFile.name === file.name) {
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = (files) => {
    console.log("Files received in Home component:", files);
    const flattenedFiles = flattenFileStructure(files);
    console.log("Flattened files:", flattenedFiles);
    setUploadedFiles(prevFiles => {
      const newFiles = [...prevFiles, ...flattenedFiles];
      console.log("New uploadedFiles state:", newFiles);
      return newFiles;
    });
    const grouped = groupFilesByCase(flattenedFiles);
    console.log("Grouped files:", grouped);
    setGroupedFiles(grouped);
    setShowGroupSelection(true);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  const handleContinue = (groupId) => {
    if (groupId && groupedFiles[groupId]) {
      setSelectedGroup(groupedFiles[groupId]);
      setShowGroupSelection(false);
    }
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setShowGroupSelection(true);
  };

  useEffect(() => {
    console.log("Current uploadedFiles state:", uploadedFiles);
    console.log("Current showGroupSelection state:", showGroupSelection);
    console.log("Current groupedFiles state:", groupedFiles);
    console.log("Current selectedGroup state:", selectedGroup);
  }, [uploadedFiles, showGroupSelection, groupedFiles, selectedGroup]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      {!selectedGroup ? (
        <div className="flex-1 overflow-hidden">
          {!showGroupSelection ? (
            <LeftPanel 
              onFileSelect={handleFileSelect} 
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
            />
          ) : (
            <GroupSelectionPanel 
              groupedFiles={groupedFiles} 
              onContinue={handleContinue}
              onFileSelect={handleFileSelect}
            />
          )}
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
          <ResizablePanel defaultSize={50} minSize={30}>
            <LeftPanel 
              onFileSelect={handleFileSelect} 
              uploadedFiles={selectedGroup.files}
              groupName={selectedGroup.name}
              onBackToGroups={handleBackToGroups}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <RightPanel 
              selectedFile={selectedFile}
              selectedGroup={selectedGroup}
              onClose={handleClosePreview}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

export default Home;