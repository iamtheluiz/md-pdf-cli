const fs = require('fs');

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString('base64');
}

module.exports = function convertImagePathsToBase64(html) {
  let imageSplits = html.split('<figure>');

  let htmlSanitized = imageSplits.map(image => {
    if (image.match(/<img src="http/)) {
      return image;
    } else if (image.match(/<img src=/)) {
      const imagePath = image.split(`src="`)[1].split(" alt")[0].slice(0, -1);

      const base64image = base64_encode(imagePath);

      image = `<figure><img src="data:image/png;base64,${base64image}" alt`;
    }

    return image;
  });

  htmlSanitized = htmlSanitized.join();

  return htmlSanitized;
}