'use client'

import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import OnboardingScreen from '@/components/OnboardingScreen';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [groupedFiles, setGroupedFiles] = useState({});
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const handleFileSelect = (file) => {
    if (selectedFile && selectedFile.name === file.name) {
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
    setShowOnboarding(true);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  const handleContinue = (selectedGroup) => {
    if (selectedGroup && groupedFiles[selectedGroup]) {
      setUploadedFiles(groupedFiles[selectedGroup]);
      setShowOnboarding(false);
      setOnboardingComplete(true);
    }
  };

  useEffect(() => {
    if (uploadedFiles.length > 0 && showOnboarding) {
      const grouped = uploadedFiles.reduce((acc, file) => {
        const prefix = file.name.slice(0, 3).toUpperCase();
        if (!acc[prefix]) {
          acc[prefix] = [];
        }
        acc[prefix].push(file);
        return acc;
      }, {});
      setGroupedFiles(grouped);
    }
  }, [uploadedFiles, showOnboarding]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      {!onboardingComplete ? (
        showOnboarding ? (
          <OnboardingScreen groupedFiles={groupedFiles} onContinue={handleContinue} />
        ) : (
          <LeftPanel 
            onFileSelect={handleFileSelect} 
            onFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
          />
        )
      ) : (
        <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
          <ResizablePanel defaultSize={50} minSize={30}>
            <LeftPanel 
              onFileSelect={handleFileSelect} 
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <RightPanel 
              selectedFile={selectedFile} 
              onClose={handleClosePreview}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};

export default Home;