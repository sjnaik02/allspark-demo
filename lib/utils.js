import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function flattenFileStructure(fileList) {
  const flattenedFiles = [];

  function processFileEntry(entry, path = "") {
    if (entry.isFile) {
      entry.file((file) => {
        const newFile = new File([file], path + file.name, { type: file.type });
        newFile.fullPath = path + file.name; // Add this line to preserve the full path
        flattenedFiles.push(newFile);
      });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      reader.readEntries((entries) => {
        entries.forEach((subEntry) => {
          processFileEntry(subEntry, path + entry.name + "/");
        });
      });
    }
  }

  for (let i = 0; i < fileList.length; i++) {
    const item = fileList[i];
    if (item.webkitGetAsEntry) {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        processFileEntry(entry);
      }
    } else {
      item.fullPath = item.name; // Add this line for files that are not in a directory
      flattenedFiles.push(item);
    }
  }

  return flattenedFiles;
}

const caseCodeToName = {
  GW: "Wilson vs. FinGroup",
  GB: "Martin vs. Energy Corp",
  RA: "Ramirez vs. Clean Max Inc.",
  SM: "Hernandez vs. Construction LLC",
};

export function groupFilesByCase(files) {
  const groupedFiles = {};

  files.forEach((file) => {
    const fileNameParts = file.name.split("_");
    const caseCode = fileNameParts[fileNameParts.length - 1]
      .slice(0, 2)
      .toUpperCase();
    const caseName = caseCodeToName[caseCode] || "Uncategorized";

    if (!groupedFiles[caseCode]) {
      groupedFiles[caseCode] = {
        name: caseName,
        files: [],
        summary: `Files for ${caseName}`,
      };
    }

    groupedFiles[caseCode].files.push(file);
  });

  console.log("Grouped files in utils:", groupedFiles);
  return groupedFiles;
}
