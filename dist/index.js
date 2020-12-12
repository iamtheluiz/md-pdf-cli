#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const clear_1 = __importDefault(require("clear"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = __importDefault(require("commander"));
const getMarkdownFilesFromFolder_1 = __importDefault(require("./lib/getMarkdownFilesFromFolder"));
const convertContentToHtml_1 = __importDefault(require("./lib/convertContentToHtml"));
const createPdfFromHtml_1 = __importDefault(require("./lib/createPdfFromHtml"));
clear_1.default();
console.log(chalk_1.default.magenta(figlet_1.default.textSync('MD-PDF-CLI', { horizontalLayout: 'full' })));
commander_1.default
    .name('md-pdf-cli')
    .version('0.1.0')
    .description('Convert MD files to PDF')
    .option('-i, --input <relative path>', 'Folder with .md files')
    .option('-o, --output <relative path>', 'Folder to store .pdf files')
    .option('-f, --file <relative path>', 'Markdown file to convert')
    .parse(process.argv);
const INPUT_DIR = path_1.default.join(process.cwd(), commander_1.default.input);
const OUTPUT_DIR = path_1.default.join(process.cwd(), commander_1.default.output);
console.log(chalk_1.default.green('Received:'));
console.log(' - Input:', chalk_1.default.yellow('C:\\example\\md'));
console.log(' - Output:', chalk_1.default.yellow('C:\\example\\pdf'));
console.log('');
async function run() {
    try {
        const files = getMarkdownFilesFromFolder_1.default(INPUT_DIR);
        console.log(chalk_1.default.green('Processing...'));
        for (const file of files) {
            const filePath = path_1.default.join(INPUT_DIR, file);
            const fileOutputPath = path_1.default.join(OUTPUT_DIR, `${path_1.default.basename(file, '.md')}.pdf`);
            let timeStart = Date.now();
            const content = fs_1.default.readFileSync(filePath);
            const html = convertContentToHtml_1.default(content.toString());
            const pdfBuffer = await createPdfFromHtml_1.default(html);
            fs_1.default.writeFileSync(fileOutputPath, new Uint8Array(pdfBuffer));
            let timeEnd = Date.now();
            const elapsed = (timeEnd - timeStart) / 1000;
            console.log(' - Complete in', chalk_1.default.yellow(`${elapsed} seconds`), '=> File:', chalk_1.default.blue(file));
        }
        console.log(chalk_1.default.green('Complete!'));
    }
    catch (error) {
        console.log(chalk_1.default.red('Process failed!'));
    }
}
run();
