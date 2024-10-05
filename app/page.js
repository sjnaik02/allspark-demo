'use client'

import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import GroupSelectionPanel from '@/components/GroupSelectionPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { flattenFileStructure } from '@/lib/utils';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [groupedFiles, setGroupedFiles] = useState({});
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleFileSelect = (file) => {
    if (selectedFile && selectedFile.name === file.name) {
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = (files) => {
    const flattenedFiles = flattenFileStructure(files);
    setUploadedFiles(prevFiles => [...prevFiles, ...flattenedFiles]);
    setShowGroupSelection(true);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  const handleContinue = (groupId) => {
    if (groupId && groupedFiles[groupId]) {
      setUploadedFiles(groupedFiles[groupId].files);
      setSelectedGroup(groupedFiles[groupId]);
      setShowGroupSelection(false);
      setOnboardingComplete(true);
    }
  };

  useEffect(() => {
    if (uploadedFiles.length > 0 && showGroupSelection) {
      const grouped = uploadedFiles.reduce((acc, file) => {
        // Extract the parent folder name from the full path
        const pathParts = file.fullPath.split('/');
        let groupName = 'Ungrouped';
        
        if (pathParts.length > 1) {
          groupName = pathParts[0];
        } else if (file.webkitRelativePath) {
          // For browsers that support webkitRelativePath
          const webkitParts = file.webkitRelativePath.split('/');
          if (webkitParts.length > 1) {
            groupName = webkitParts[0];
          }
        }

        if (!acc[groupName]) {
          acc[groupName] = {
            files: [],
            name: groupName,
            summary: `Files from ${groupName}`
          };
        }
        acc[groupName].files.push(file);
        return acc;
      }, {});
      setGroupedFiles(grouped);
    }
  }, [uploadedFiles, showGroupSelection]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      {!uploadedFiles.length ? (
        <LeftPanel 
          onFileSelect={handleFileSelect} 
          onFileUpload={handleFileUpload}
          uploadedFiles={uploadedFiles}
        />
      ) : (
        <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
          <ResizablePanel defaultSize={50} minSize={30}>
            {showGroupSelection ? (
              <GroupSelectionPanel 
                groupedFiles={groupedFiles} 
                onContinue={handleContinue}
                onFileSelect={handleFileSelect}
              />
            ) : (
              <LeftPanel 
                onFileSelect={handleFileSelect} 
                onFileUpload={handleFileUpload}
                uploadedFiles={uploadedFiles}
              />
            )}
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