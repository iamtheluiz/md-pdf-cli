"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const remarkable_1 = require("remarkable");
const figure = require('remarkable-figure-plugin');
const convertImagePathsToBase64_1 = __importDefault(require("./convertImagePathsToBase64"));
const md = new remarkable_1.Remarkable('full', {
    html: true,
    typographer: true
});
md.use(figure);
function convertContentToHtml(content) {
    // Convert md to HTML
    let html = md.render(content.toString());
    // Transform images to base64 data
    html = convertImagePathsToBase64_1.default(html);
    // Get style content
    const style = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'styles', 'pixyll.css'));
    // Add styles
    const styledHtml = `<style>${style}</style>${html}`;
    return styledHtml;
}
exports.default = convertContentToHtml;
