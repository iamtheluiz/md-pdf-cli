require('dotenv').config();
const fs = require('fs');
const path = require('path')
const { Remarkable } = require('remarkable');

var md = new Remarkable('full', {
  html: true,
  typographer: true
});

// Get all files from folder
const files = fs.readdirSync(process.env.INPUT_DIR);

// Filter MD files
const sanitizedFiles = files.filter(file => {
  const ext = path.extname(file);

  if (ext === '.md') {
    return file;
  }
});

console.log(`Processing...`);

sanitizedFiles.map(async file => {
  const filePath = path.join(process.env.INPUT_DIR, file);
  const fileOutputPath = path.join(process.env.OUTPUT_DIR, `${path.basename(file).split('.')[0]}.pdf`);

  // Get file content
  const content = fs.readFileSync(filePath);

  // Convert md to HTML
  const html = md.render(content.toString());

  console.log(` - Complete => File: ${file}`);
});

console.log('Complete!');
