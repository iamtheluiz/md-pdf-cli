#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getMarkdownFilesFromFolder_1 = __importDefault(require("./lib/getMarkdownFilesFromFolder"));
const convertContentToHtml_1 = __importDefault(require("./lib/convertContentToHtml"));
const createPdfFromHtml_1 = __importDefault(require("./lib/createPdfFromHtml"));
const INPUT_DIR = process.env.INPUT_DIR ? process.env.INPUT_DIR : '';
const OUTPUT_DIR = process.env.OUTPUT_DIR ? process.env.OUTPUT_DIR : '';
async function run() {
    const files = getMarkdownFilesFromFolder_1.default(INPUT_DIR);
    console.log(`Processing...`);
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
        console.log(` - Complete in ${elapsed} seconds => File: ${file}`);
    }
    console.log('Complete!');
}
run();
