import fs from 'fs';
import path from 'path';

export default function getMarkdownFilesFromFolder(folder: string): string[] {
  // Get all files from folder
  const files = fs.readdirSync(folder);

  // Filter MD files
  const sanitizedFiles = files.filter(file => {
    const ext = path.extname(file);

    if (ext === '.md') {
      return file;
    }
  });

  return sanitizedFiles;
}