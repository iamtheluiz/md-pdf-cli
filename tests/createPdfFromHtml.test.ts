import createPdfFromHtml from '../lib/createPdfFromHtml';

describe('create pdf from html string', () => {
  it('should return a buffer', async () => {
    const pdf = await createPdfFromHtml("<h1>Hello World</h1>");

    expect(Buffer.isBuffer(pdf)).toBeTruthy();
  });
});