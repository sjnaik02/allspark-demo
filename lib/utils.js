import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function flattenFileStructure(fileList) {
  const flattenedFiles = [];

  function processFileEntry(entry, path = '') {
    if (entry.isFile) {
      entry.file(file => {
        const newFile = new File([file], path + file.name, { type: file.type });
        newFile.fullPath = path + file.name; // Add this line to preserve the full path
        flattenedFiles.push(newFile);
      });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      reader.readEntries(entries => {
        entries.forEach(subEntry => {
          processFileEntry(subEntry, path + entry.name + '/');
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
