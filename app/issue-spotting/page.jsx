"use client";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_API_URL is not set');
      }
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze document');
      }

      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card>
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
              <Progress value={66} className="w-full" />
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing document...
              </p>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <Card className="mt-6">
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
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-sm">{complaint.Claim}</p>
                          <p className="text-sm text-gray-600 mt-1">{complaint.Description}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium">Reasoning: </span>
                            {complaint.Reasoning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
  );
}