import { Remarkable } from 'remarkable';
const figure = require('remarkable-figure-plugin');

import convertImagePathsToBase64 from './convertImagePathsToBase64';

const md = new Remarkable('full', {
  html: true,
  typographer: true
});
md.use(figure);

export default function convertContentToHtml(content: string): string {
  // Convert md to HTML
  let html = md.render(content.toString());

  // Transform images to base64 data
  html = convertImagePathsToBase64(html);

  return html;
}