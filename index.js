require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Get all MD files from folder
const files = fs.readdirSync(process.env.INPUT_DIR);

console.log(files);

const sanitizedFiles = files.filter(file => {
  const ext = path.extname(file);

  if (ext === '.md') {
    return file;
  }
});

console.log(sanitizedFiles);
