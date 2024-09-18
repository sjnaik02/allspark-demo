'use client'

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import LeftPanel from '@/components/LeftPanel';
import RightPanel from '@/components/RightPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (file) => {
    if (selectedFile && selectedFile.name === file.name) {
      // If the same file is clicked again, close the preview
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        <ResizablePanel defaultSize={50} minSize={30}>
          <LeftPanel onFileSelect={handleFileSelect} onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />
        </ResizablePanel>
        {uploadedFiles.length > 0 && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <RightPanel selectedFile={selectedFile} onClose={handleClosePreview} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default Home;