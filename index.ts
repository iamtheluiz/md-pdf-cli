#! /usr/bin/env node
import fs from 'fs';
import path from 'path';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';
import program from 'commander';

import getMarkdownFilesFromFolder from './lib/getMarkdownFilesFromFolder';
import convertContentToHtml from './lib/convertContentToHtml';
import createPdfFromHtml from './lib/createPdfFromHtml';

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
  .parse(process.argv);

const INPUT_DIR = path.join(process.cwd(), program.input);
const OUTPUT_DIR = path.join(process.cwd(), program.output);

console.log(chalk.green('Received:'));
console.log(' - Input:', chalk.yellow(INPUT_DIR));
console.log(' - Output:', chalk.yellow(OUTPUT_DIR));
console.log('');

async function run() {
  try {
    const files = getMarkdownFilesFromFolder(INPUT_DIR);

    console.log(chalk.green('Processing...'));
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
      console.log(
        ' - Complete in',
        chalk.yellow(`${elapsed} seconds`),
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

