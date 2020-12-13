"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function addStylesToHtmlString(html) {
    // Get style content
    const style = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'styles', 'pixyll.css'));
    // Add styles
    const styledHtml = `<style>${style}</style>${html}`;
    return styledHtml;
}
exports.default = addStylesToHtmlString;
