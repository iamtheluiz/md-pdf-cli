import fs from 'fs';
import path from 'path';

/**
 * Add default pdf styles to html content
 * @param html A HTML string that will receive the 'pixyll.css' content
 * @return HTML sting with style tag
 */
export default function addStylesToHtmlString(html: string): string {
  // Get style content
  const style = fs.readFileSync(path.join(__dirname, '..', 'styles', 'pixyll.css'));

  // Add styles
  const styledHtml = `<style>${style}</style>${html}`;

  return styledHtml;
}