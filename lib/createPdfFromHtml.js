const hb = require('handlebars');
const puppeteer = require('puppeteer');

module.exports = async function createPdfFromHtml(html) {
  const template = hb.compile(html, { strict: true });
  const result = template();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.emulateMediaType('screen');
  await page.setContent(result);

  const buffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return buffer;
}