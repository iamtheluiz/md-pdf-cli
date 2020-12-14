import fs from 'fs';

function base64_encode(file: string): string {
  var bitmap = fs.readFileSync(file);

  return Buffer.from(bitmap).toString('base64');
}

interface ImageObject {
  source: string;
  base64: string;
}

export default function convertImagePathsToBase64(html: string): string {
  const reg = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
  let image = null;
  let images: ImageObject[] = [];

  // Get all images
  while(image = reg.exec(html)) {
    const source = image[1];  // Get image source

    images.push({ 
      source: image[1],
      base64: source.match(/http/) ? source : base64_encode(source)
    });
  }

  // Replace each source
  images.forEach(image => {
    html = html.replace(image.source, `data:image/png;base64,${image.base64}`);
  });

  return html;
}