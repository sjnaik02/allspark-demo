// lib/pdfProcessor.js

import pdfjs from 'pdfjs-dist/webpack';

export async function processPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument(arrayBuffer).promise;
  const page = await pdf.getPage(1);
  const textContent = await page.getTextContent();
  const text = textContent.items.map(item => item.str).join(' ');

  // Extract metadata
  const metadataStart = text.indexOf('--- METADATA ---');
  const metadataEnd = text.indexOf('--- END METADATA ---');
  if (metadataStart !== -1 && metadataEnd !== -1) {
    const metadata = text.slice(metadataStart, metadataEnd);
    const caseIdMatch = metadata.match(/Case ID: ([a-f0-9]+)/);
    const documentIdMatch = metadata.match(/Document ID: ([a-f0-9]+)/);

    if (caseIdMatch && documentIdMatch) {
      return {
        caseId: caseIdMatch[1],
        documentId: documentIdMatch[1],
        fileName: file.name,
      };
    }
  }

  // If metadata is not found or incomplete, return null
  return null;
}

export function groupFilesByCaseId(processedFiles) {
  return processedFiles.reduce((groups, file) => {
    if (file && file.caseId) {
      if (!groups[file.caseId]) {
        groups[file.caseId] = [];
      }
      groups[file.caseId].push(file);
    }
    return groups;
  }, {});
}