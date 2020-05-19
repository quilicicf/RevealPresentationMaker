const { copyFileSync } = require('fs');
const { resolve: resolvePath } = require('path');
const { execSync } = require('child_process');

const { CHECK_MARK } = require('./logGoodies');
const { PATH_BOOTSTRAP_MATERIAL } = require('./paths');

module.exports = (repositoryPath) => {
  copyFileSync(
    resolvePath(PATH_BOOTSTRAP_MATERIAL, 'gitignore'),
    resolvePath(repositoryPath, '.gitignore'),
  );

  execSync('git init', { cwd: repositoryPath });
  process.stdout.write(`Git repository initialized ${CHECK_MARK}\n`);

  execSync('git add . -A; git commit -m ":new: Initialize repository"', { cwd: repositoryPath });
  process.stdout.write(`Changes committed ${CHECK_MARK}\n`);
};
