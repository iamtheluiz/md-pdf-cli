const fs = require('fs');
const path = require('path');
const { Remarkable } = require('remarkable');
const figure = require('remarkable-figure-plugin');

const convertImagePathsToBase64 = require('./convertImagePathsToBase64');

const md = new Remarkable('full', {
  html: true,
  typographer: true
});
md.use(figure);

module.exports = function convertContentToHtml(content) {
  // Convert md to HTML
  let html = md.render(content.toString());

  // Transform images to base64 data
  html = convertImagePathsToBase64(html);

  // Get style content
  const style = fs.readFileSync(path.join(__dirname, '..', 'styles', 'pixyll.css'));

  // Add styles
  const styledHtml = `<style>${style}</style>${html}`;

  return styledHtml;
}