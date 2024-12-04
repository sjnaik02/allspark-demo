"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload, FileText, AlertCircle, CheckCircle2, Pencil } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const IssueCard = ({ complaint, index, isDeselected, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedClaim, setEditedClaim] = useState(complaint.Claim);
  const [editedDescription, setEditedDescription] = useState(complaint.Description);
  const [editedReasoning, setEditedReasoning] = useState(complaint.Reasoning);

  const handleSave = () => {
    complaint.Claim = editedClaim;
    complaint.Description = editedDescription;
    complaint.Reasoning = editedReasoning;
    setIsEditing(false);
  };

  return (
    <div
      className={`p-3 bg-gray-50 rounded-lg flex gap-3 transition-opacity group relative ${isDeselected ? 'opacity-50' : 'opacity-100'}`}
    >
      <Checkbox
        checked={!isDeselected}
        onCheckedChange={() => onToggle(index)}
        className="mt-1"
      />
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editedClaim}
              onChange={(e) => setEditedClaim(e.target.value)}
              className="text-sm font-medium"
            />
            <Input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="text-sm text-gray-600"
            />
            <Input
              value={editedReasoning}
              onChange={(e) => setEditedReasoning(e.target.value)}
              className="text-sm text-gray-500"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <>
            <p className="font-medium text-sm">{complaint.Claim}</p>
            <p className="text-sm text-gray-600 mt-1">{complaint.Description}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium">Reasoning: </span>
              {complaint.Reasoning}
            </p>
          </>
        )}
      </div>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 p-1 hover:bg-gray-200 rounded transition-opacity"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [deselectedIssues, setDeselectedIssues] = useState([]);
  const [progressValue, setProgressValue] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError('');
    setProgressValue(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_API_URL is not set');
      }

      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 2500);

      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze document');
      }

      // Complete progress
      clearInterval(progressInterval);
      setProgressValue(100);

      setResult(data.result);
      setDeselectedIssues([]); // Reset deselected issues when new result comes in
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleIssue = (index) => {
    setDeselectedIssues(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="flex gap-6">
        {/* Left Column - Upload Section */}
        <div className="w-1/3 h-[calc(100vh-8rem)] sticky top-10 flex flex-col justify-center">
          <Card className="">
            <CardHeader>
              <CardTitle>Legal Document Analysis</CardTitle>
              <CardDescription>
                Upload a legal document (PDF) to analyze its contents and identify potential claims.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Upload Section */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-10 w-10 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-xs text-gray-400">PDF files only</span>
                </label>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Loading State */}
              {isUploading && (
                <div className="space-y-2">
                  <Progress value={progressValue} className="w-full transition-all duration-1000" />
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {progressValue >= 20 && progressValue < 30 ? 'Uploading document...' : progressValue >= 40 ? 'Prompting LLM...' : 'Analyzing document...'}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={!file || isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Analyze Document
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Results Section */}
        <div className="w-2/3">
          {result ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Issues Spotted:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.issues_spotted.map((issue, index) => (
                        <li key={index} className="text-sm">{issue}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Detailed Complaints:</h3>
                    <div className="space-y-3">
                      {result.parsed_json.Complaints.map((complaint, index) => (
                        <IssueCard
                          key={index}
                          complaint={complaint}
                          index={index}
                          isDeselected={deselectedIssues.includes(index)}
                          onToggle={toggleIssue}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Upload and analyze a document to see results here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}