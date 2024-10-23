'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import TypewriterText from "@/components/TypewriterText";

export default function IssueSpotting() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:42069/analyze');
      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      console.log(data.result);
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Issue Spotting Analysis</CardTitle>
          <CardDescription>
            Upload a legal document to analyze potential issues and claims
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-gray-50 p-4 rounded-full">
                <Upload className="h-8 w-8 text-gray-500" />
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                >
                  <span>Upload a file</span>
                  <Input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </label>
                <p className="text-sm text-gray-500">PDF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Selected File Display */}
          {file && (
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{file.name}</span>
              <Badge variant="secondary" className="ml-auto">
                PDF
              </Badge>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Analyze Button */}
          <Button
            className="w-full"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Document'
            )}
          </Button>

          {/* Results Display */}
          {result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Issues Spotted:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {result.parsed_json.Complaints.map((complaint, index) => (
                      <li key={index} className="text-gray-700">
                        <strong>Claim:</strong> <TypewriterText text={complaint.Claim} />
                        <strong>Description:</strong> <TypewriterText text={complaint.Description} />
                        <strong>Reasoning:</strong> <TypewriterText text={complaint.Reasoning} />
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}