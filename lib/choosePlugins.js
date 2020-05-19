const { readdirSync } = require('fs');
const { prompt } = require('enquirer');
const { resolve: resolvePath, join: joinPath } = require('path');

const { PATH_REVEAL } = require('./paths');

module.exports = async () => {
  const pluginsPath = resolvePath(PATH_REVEAL, 'plugin');
  const allPlugins = readdirSync(pluginsPath)
    .map(folderName => ({
      value: {
        name: folderName,
        path: joinPath('plugin', folderName),
      },
      message: folderName,
    }));

  const { plugins } = await prompt({
    type: 'multiselect',
    message: 'Choose your plugins',
    name: 'plugins',
    choices: allPlugins,
  });

  return plugins;
};
