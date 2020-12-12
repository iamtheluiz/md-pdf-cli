"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
async function createPdfFromHtml(html) {
    const template = handlebars_1.default.compile(html, { strict: true });
    const result = template({});
    const browser = await puppeteer_1.default.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.setContent(result);
    const buffer = await page.pdf({ format: 'A4' });
    await browser.close();
    return buffer;
}
exports.default = createPdfFromHtml;
