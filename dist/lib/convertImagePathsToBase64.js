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
    let imageSplits = html.split('<figure>');
    let htmlSanitized = imageSplits.map(image => {
        if (image.match(/<img src="http/)) {
            return image;
        }
        else if (image.match(/<img src=/)) {
            const imagePath = image.split(`src="`)[1].split(" alt")[0].slice(0, -1);
            const base64image = base64_encode(imagePath);
            image = `<figure><img src="data:image/png;base64,${base64image}" alt`;
        }
        return image;
    });
    html = htmlSanitized.join();
    return html;
}
exports.default = convertImagePathsToBase64;
