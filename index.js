#! /usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const getMarkdownFilesFromFolder = require('./lib/getMarkdownFilesFromFolder');
const convertContentToHtml = require('./lib/convertContentToHtml');
const createPdfFromHtml = require('./lib/createPdfFromHtml');

async function run() {
  const files = getMarkdownFilesFromFolder(process.env.INPUT_DIR);

  console.log(`Processing...`);
  for (const file of files) {
    const filePath = path.join(process.env.INPUT_DIR, file);
    const fileOutputPath = path.join(process.env.OUTPUT_DIR, `${path.basename(file, '.md')}.pdf`);

    let timeStart = Date.now();

    const content = fs.readFileSync(filePath);
    const html = convertContentToHtml(content);
    const pdfBuffer = await createPdfFromHtml(html);

    fs.writeFileSync(fileOutputPath, pdfBuffer);

    let timeEnd = Date.now();
    const elapsed = (timeEnd - timeStart) / 1000;
    console.log(` - Complete in ${elapsed} seconds => File: ${file}`);
  }

  console.log('Complete!');
}
run();

