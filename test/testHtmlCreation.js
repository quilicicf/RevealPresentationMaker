const { join: joinPath } = require('path');

const createHtmlFile = require('../lib/createHtmlFile');

const html = createHtmlFile(
  {
    name: 'black',
    path: joinPath('css/theme', 'black.css'),
  },
  [
    {
      name: 'notes',
      path: joinPath('plugin', 'notes'),
    },
  ],
  'Go green! (IT)',
);

console.log(html);
