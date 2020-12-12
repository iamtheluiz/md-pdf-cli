"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getMarkdownFilesFromFolder(folder) {
    // Get all files from folder
    const files = fs_1.default.readdirSync(folder);
    // Filter MD files
    const sanitizedFiles = files.filter(file => {
        const ext = path_1.default.extname(file);
        if (ext === '.md') {
            return file;
        }
    });
    return sanitizedFiles;
}
exports.default = getMarkdownFilesFromFolder;
