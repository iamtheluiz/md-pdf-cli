#! /usr/bin/env node
import * as dotenv from "dotenv";
dotenv.config();

import fs from 'fs';
import path from 'path';

import getMarkdownFilesFromFolder from './lib/getMarkdownFilesFromFolder';
import convertContentToHtml from './lib/convertContentToHtml';
import createPdfFromHtml from './lib/createPdfFromHtml';

const INPUT_DIR = process.env.INPUT_DIR ? process.env.INPUT_DIR : '';
const OUTPUT_DIR = process.env.OUTPUT_DIR ? process.env.OUTPUT_DIR : '';

async function run() {
  const files = getMarkdownFilesFromFolder(INPUT_DIR);

  console.log(`Processing...`);
  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const fileOutputPath = path.join(OUTPUT_DIR, `${path.basename(file, '.md')}.pdf`);

    let timeStart = Date.now();

    const content = fs.readFileSync(filePath);
    const html = convertContentToHtml(content.toString());
    const pdfBuffer = await createPdfFromHtml(html);

    fs.writeFileSync(fileOutputPath, new Uint8Array(pdfBuffer));

    let timeEnd = Date.now();
    const elapsed = (timeEnd - timeStart) / 1000;
    console.log(` - Complete in ${elapsed} seconds => File: ${file}`);
  }

  console.log('Complete!');
}
run();

