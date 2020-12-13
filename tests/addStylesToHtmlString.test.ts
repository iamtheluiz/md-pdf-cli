import fs from 'fs';
import path from 'path';
import addStylesToHtmlString from '../lib/addStylesToHtmlString';

describe('add style tag to html string', () => {
  it('should add "pixyll.css" content to html string', () => {
    const styleContent = fs.readFileSync(path.join(__dirname, '..', 'styles', 'pixyll.css'));

    let html = '';
    html += '<h1>Title</h1>';
    html = addStylesToHtmlString(html);

    expect(html).toBe(`<style>${styleContent}</style><h1>Title</h1>`);
  });
});