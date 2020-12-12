const fs = require('fs');
const path = require('path');

module.exports = function getMarkdownFilesFromFolder(folder) {
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