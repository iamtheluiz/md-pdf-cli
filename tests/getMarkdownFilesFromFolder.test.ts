import path from 'path';
import fs from 'fs';
import getMarkdownFilesFromFolder from '../lib/getMarkdownFilesFromFolder';

describe('get markdown files from folder', () => {
  const folder = path.join(__dirname, 'md');

  function removeFiles() {
    // Get all fils from 'md' folder
    const files = fs.readdirSync(path.join(__dirname, 'md'));

    files.map(file => {
      if (file !== 'about.md') {
        fs.rmSync(path.join(__dirname, 'md', file));
      }
    });
  }

  afterAll(() => {
    // Remove any file that are not 'about.md'
    removeFiles();
  });

  beforeAll(() => {
    // Remove any file that are not 'about.md'
    removeFiles();
  });

  it('should return about.md file', () => {
    const files = getMarkdownFilesFromFolder(folder);

    expect(files).not.toBeNull();
    expect(files).not.toBeUndefined();
    expect(files.length).not.toBe(0);
    expect(files.length).toBe(1);
    expect(files).toEqual(['about.md']);
  });

  it('should return all files', () => {
    // Create example.md file
    fs.writeFileSync(path.join(__dirname, 'md', 'example.md'), '# Example');

    const files = getMarkdownFilesFromFolder(folder);

    expect(files).not.toBeNull();
    expect(files).not.toBeUndefined();
    expect(files.length).not.toBe(0);
    expect(files.length).toBe(2);
    expect(files).toEqual(['about.md', 'example.md']);
  });

  it("shouldn't return '.html' file", () => {
    // Create html file
    fs.writeFileSync(path.join(__dirname, 'md', 'index.html'), '<h1>Hello World!</h1>');

    const files = getMarkdownFilesFromFolder(folder);

    expect(files).not.toBeNull();
    expect(files).not.toBeUndefined();
    expect(files.length).not.toBe(0);
    expect(files.length).toBe(2);
    expect(files).toEqual(['about.md', 'example.md']);
  });
});