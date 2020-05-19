const _ = require('lodash');

const defaultRevealConfiguration = require('./defaultRevealConfiguration');

const writeRevealInitializerProperties = (indentation) => {
  return _.chain(defaultRevealConfiguration)
    .map((defaultValue, key) => (
      _.isString(defaultValue)
        ? `${key}: getFromUrlOrDefault('${_.kebabCase(key)}', '${defaultValue}')`
        : `${key}: getFromUrlOrDefault('${_.kebabCase(key)}', ${defaultValue})`
    ))
    .join(`,\n${indentation}`)
    .value();
};

module.exports = (theme, plugins, presentationName) => {
  const themeImport = theme
    ? `<link rel="stylesheet" href="./node_modules/reveal.js/${theme.path}">`
    : ''; // No theme to import

  return `\
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

  <title>${presentationName}</title>

  <link rel="stylesheet" href="./node_modules/reveal.js/css/reveal.css">
  ${themeImport}
</head>

<body>
  <div class="reveal">
    <div class="slides">
      <section>
        <h1>${presentationName}</h1>
        <p>${new Date().toISOString().split('T')[ 0 ]}</p>
      </section>
      <!-- TODO: Your slides go here -->
    </div>
  </div>

  <script src="./node_modules/reveal.js/js/reveal.js"></script>
  <script>
    // Printing and PDF exports
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = window.location.search.match(/print-pdf/gi) 
      ? './node_modules/reveal.js/css/print/pdf.css'
      : './node_modules/reveal.js/css/print/paper.css';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    const urlParams = new URLSearchParams(window.location.search);
    const getFromUrlOrDefault = (optionName, defaultValue) => {
      const rawValue = urlParams.get(optionName);
      if (rawValue === 'true') { return true; }
      if (rawValue === 'false') { return false; }
      if (/^[0-9]+$/.test(rawValue)) { return false; }
      if (!rawValue) { return defaultValue; }
      return rawValue;
    };
    
    // Reveal options
    window.Reveal.initialize({
      ${writeRevealInitializerProperties('      ')},
      dependencies: [{
        src: './node_modules/reveal.js/plugin/notes/notes.js',
        async: true
        },
      ],
    });
  </script>
</body>
</html>
`;
};
