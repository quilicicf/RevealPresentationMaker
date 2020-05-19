const { readdirSync } = require('fs');
const { prompt } = require('enquirer');
const { resolve: resolvePath, join: joinPath } = require('path');

const { PATH_REVEAL } = require('./paths');

module.exports = async () => {
  const relativeThemesPath = joinPath('css', 'theme');
  const themesPath = resolvePath(PATH_REVEAL, relativeThemesPath);

  const cssExtensionRegex = /\.css$/;
  const themes = readdirSync(themesPath)
    .filter(fileName => cssExtensionRegex.test(fileName))
    .map(fileName => {
      const themeName = fileName.replace(cssExtensionRegex, '');
      return {
        value: {
          name: themeName,
          path: joinPath(relativeThemesPath, fileName),
        },
        message: themeName,
      };
    });

  const choices = [
    { value: undefined, message: 'default' },
    ...themes,
  ];

  const { theme } = await prompt({
    type: 'autocomplete',
    message: 'Select the theme for your presentation',
    name: 'theme',
    choices,
  });

  return theme;
};
