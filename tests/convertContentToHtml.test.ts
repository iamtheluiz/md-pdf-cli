import convertContentToHtml from "../lib/convertContentToHtml";

describe('convert md string to html', () => {
  it('should return a h1 and a h2', () => {
    let md = '';
    md += '# Title \n';
    md += '## Hello';

    const html = convertContentToHtml(md);

    let expected = '';
    expected += '<h1>Title</h1>\n'
    expected += '<h2>Hello</h2>\n';

    expect(html).toBe(expected);
  });

  it('should return a p and li', () => {
    let md = '';
    md += 'Supermarket list:\n';
    md += '* 3 Apples\n';
    md += '* 2 Orange';

    const html = convertContentToHtml(md);

    let expected = '';
    expected += '<p>Supermarket list:</p>\n'
    expected += '<ul>\n';
    expected += '<li>3 Apples</li>\n';
    expected += '<li>2 Orange</li>\n';
    expected += '</ul>\n';

    expect(html).toBe(expected);
  });
});