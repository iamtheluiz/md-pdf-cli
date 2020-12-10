require('dotenv').config();
const fs = require('fs');
const path = require('path');
const hb = require('handlebars');
const puppeteer = require('puppeteer');
const { Remarkable } = require('remarkable');
const figure = require('remarkable-figure-plugin')

const convertImagePathsToBase64 = require('./utils/convertImagePathsToBase64');

const md = new Remarkable('full', {
  html: true,
  typographer: true
});
md.use(figure);

// Get all files from folder
const files = fs.readdirSync(process.env.INPUT_DIR);

// Filter MD files
const sanitizedFiles = files.filter(file => {
  const ext = path.extname(file);

  if (ext === '.md') {
    return file;
  }
});

console.log(`Processing...`);

async function convertFiles() {
  for (const file of sanitizedFiles) {
    const filePath = path.join(process.env.INPUT_DIR, file);
    const fileOutputPath = path.join(process.env.OUTPUT_DIR, `${path.basename(file, path.extname(file))}.pdf`);

    let timeStart = Date.now();

    // Get file content
    const content = fs.readFileSync(filePath);

    // Convert md to HTML
    let html = md.render(content.toString());
    html = convertImagePathsToBase64(html);

    // Get style content
    const style = fs.readFileSync(path.join(__dirname, 'styles', 'pixyll.css'));

    // Add styles
    const styledHtml = `<style>${style}</style>${html}`;

    const template = hb.compile(styledHtml, { strict: true });
    const result = template();

    // Store html files
    // fs.writeFileSync(path.join(process.env.HTML_DIR, `${path.basename(file).split('.')[0]}.html`), result);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.setContent(result);

    await page.pdf({ path: fileOutputPath, format: 'A4' });
    await browser.close();
    
    let timeEnd = Date.now();
    const elapsed = (timeEnd - timeStart) / 1000;

    console.log(` - Complete in ${elapsed} seconds => File: ${file}`);
  }

  console.log('Complete!');
}
convertFiles();
