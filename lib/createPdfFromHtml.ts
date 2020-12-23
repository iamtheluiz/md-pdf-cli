import hb from 'handlebars';
import puppeteer from 'puppeteer';

/**
 * Convert a HTML string page to a PDF buffer
 * @param html HTML string page
 * @return PDF buffer
 */
export default async function createPdfFromHtml(html: string): Promise<ArrayBuffer> {
  const template = hb.compile(html, { strict: true });
  const result = template({});

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.emulateMediaType('screen');
  await page.setContent(result);

  const buffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return buffer;
}