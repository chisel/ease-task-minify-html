# Ease Task Runner HTML Minifier Plugin

This is a plugin for the [Ease task runner](https://github.com/chisel/ease). It uses the [html-minifier](https://www.npmjs.com/package/html-minifier) module to minify HTML files.

# Installation

```
npm install ease-task-minify-html --save-dev
```

**easeconfig.js:**
```js
const minifyHtml = require('ease-task-minify-html');

module.exports = ease => {

  ease.install('minify-html', minifyHtml, {});

};
```

# Configuration

This plugin takes a config object similar to [HTML Minifier Options](https://www.npmjs.com/package/html-minifier#options-quick-reference) while adding the following properties:
  - `dir`: Path to a directory containing all the SASS files, relative to `easeconfig.js`
  - `outDir`: Path to the output directory where the CSS files should be written, relative to `easeconfig.js`
  - `clearOutDir`: Boolean indicating if the output directory should be emptied first

# Example

**easeconfig.js:**
```js
const minifyHtml = require('ease-task-minify-html');

module.exports = ease => {

  ease.install('minify-html', minifyHtml, {
    dir: 'src',
    outDir: 'dist',
    collapseWhitespace: true
  });

  ease.job('minify-html-files', ['minify-html']);

};
```

**CLI:**
```
ease minify-html-files
```
