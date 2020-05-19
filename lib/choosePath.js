const _ = require('lodash');
const { homedir } = require('os');
const { normalize } = require('path');
const { prompt } = require('enquirer');
const { existsSync, statSync } = require('fs');
const { resolve: resolvePath } = require('path');

module.exports = async () => {
  const { presentationName } = await prompt({
    type: 'input',
    message: 'What should be the name of your presentation?',
    name: 'presentationName',
    validate (value) {
      return !_.isEmpty(value);
    },
  });

  const normalizedName = _.reduce(
    [ _.deburr, _.camelCase, _.upperFirst ],
    (seed, operation) => operation(seed),
    presentationName,
  );
  const { presentationParentPath } = await prompt({
    type: 'input',
    message: `Where should I write it? I'll create a folder named ${normalizedName} inside the folder you provide.`,
    name: 'presentationParentPath',
    validate (value) {
      if (_.isEmpty(value)) { return 'The path can\'t be empty!'; }
      if (!existsSync(value)) { return 'This path doesn\'t exist!'; }
      if (!statSync(value).isDirectory()) { return 'The path must lead to a folder, this is a file!'; }
      return true;
    },
  });

  const { shouldInitializeGitRepository } = await prompt([
    {
      type: 'confirm',
      message: 'Should I initialize a git repository?',
      name: 'shouldInitializeGitRepository',
      default: true,
    },
  ]);

  return {
    presentationPath: resolvePath(presentationParentPath, normalizedName),
    presentationName,
    normalizedName,
    shouldInitializeGitRepository,
  };
};
