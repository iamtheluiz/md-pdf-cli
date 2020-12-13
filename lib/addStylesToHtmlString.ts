import fs from 'fs';
import path from 'path';

export default function addStylesToHtmlString(html: string): string {
  // Get style content
  const style = fs.readFileSync(path.join(__dirname, '..', 'styles', 'pixyll.css'));

  // Add styles
  const styledHtml = `<style>${style}</style>${html}`;

  return styledHtml;
}