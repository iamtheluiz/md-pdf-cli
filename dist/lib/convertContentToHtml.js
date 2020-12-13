"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    return html;
}
exports.default = convertContentToHtml;
