"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function base64_encode(file) {
    var bitmap = fs_1.default.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
}
function convertImagePathsToBase64(html) {
    const reg = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
    let image = null;
    let images = [];
    // Get all images
    while (image = reg.exec(html)) {
        const source = image[1]; // Get image source
        images.push({
            source: image[1],
            base64: source.match(/http/) ? source : base64_encode(source)
        });
    }
    // Replace each source
    images.forEach(image => {
        html = html.replace(image.source, `data:image/png;base64,${image.base64}`);
    });
    return html;
}
exports.default = convertImagePathsToBase64;
