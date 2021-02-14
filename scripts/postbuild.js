const fs = require("fs");
const path = require("path");

// Webpack generates absolute paths for /css, /js which breaks in electron
// replace with relative paths
const buildPath = path.join(__dirname, "../build");
const indexHTMLPath = path.join(buildPath, "index.html");
let indexHTML = fs.readFileSync(indexHTMLPath, "utf-8");
indexHTML = indexHTML.replace(
  '<link rel="stylesheet" href="/css/styles',
  '<link rel="stylesheet" href="./css/styles'
);
indexHTML = indexHTML.replace(
  new RegExp('<script src="/js/', "g"),
  '<script src="./js/'
);
indexHTML = indexHTML.replace("/service-worker", "./service-worker");
fs.writeFileSync(indexHTMLPath, indexHTML);
