#! /usr/bin/env node
import fs from 'fs';
import path from 'path';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import program from 'commander';

import Timer from './lib/Timer';
import getMarkdownFilesFromFolder from './lib/getMarkdownFilesFromFolder';
import convertContentToHtml from './lib/convertContentToHtml';
import createPdfFromHtml from './lib/createPdfFromHtml';
import addStylesToHtmlString from './lib/addStylesToHtmlString';

clear();
console.log(chalk.magenta(
  figlet.textSync('MD-PDF-CLI', { horizontalLayout: 'full' })
));

program
  .name('md-pdf-cli')
  .version('0.1.0')
  .description('Convert MD files to PDF')
  .option('-i, --input <relative path>', 'Folder with .md files')
  .option('-o, --output <relative path>', 'Folder to store .pdf files')
  .option('-f, --file <relative path>', 'Markdown file to convert')
  .option('-w, --web', 'Store HTML files')
  .parse(process.argv);

let INPUT_DIR = '';
let OUTPUT_DIR = '';

// Set input and output
if (program.input && program.output) {  // All md files from folder
  INPUT_DIR = path.join(process.cwd(), program.input);
  OUTPUT_DIR = path.join(process.cwd(), program.output);
} else if (program.file) {  // Single file
  OUTPUT_DIR = path.join(process.cwd(), program.output ? program.output : '.');
}

console.log(chalk.green('Received:'));
console.log(' - Input:', chalk.yellow(INPUT_DIR));
console.log(' - Output:', chalk.yellow(OUTPUT_DIR));
console.log('');

async function run() {
  try {
    // Store files to convert
    let files: string[] = [];

    if (INPUT_DIR !== '') { // All md files from folder
      files = getMarkdownFilesFromFolder(INPUT_DIR);
    } else {  // Single file
      files = [program.file];
    }

    console.log(chalk.green('Processing...'));
    for (const file of files) {
      const timer = new Timer();
      const filePath = path.join(INPUT_DIR, file);
      const fileOutputPath = path.join(OUTPUT_DIR, `${path.basename(file, '.md')}.pdf`);

      timer.start();
      const content = fs.readFileSync(filePath);
      let html = convertContentToHtml(content.toString());
      html = addStylesToHtmlString(html);

      if (program.web) {
        fs.writeFileSync(path.join(OUTPUT_DIR, `${path.basename(file, '.md')}.html`), html);
      }

      const pdfBuffer = await createPdfFromHtml(html);

      fs.writeFileSync(fileOutputPath, new Uint8Array(pdfBuffer));

      timer.stop();
      console.log(
        ' - Complete in',
        chalk.yellow(`${timer.elapsedTime} seconds`),
        '=> File:',
        chalk.blue(file)
      );
    }

    console.log(chalk.green('Complete!'));
  } catch (error) {
    console.log(chalk.red('Process failed!'));
  }
}
run();

