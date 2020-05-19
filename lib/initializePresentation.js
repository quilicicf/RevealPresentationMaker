const { execSync } = require('child_process');
const { resolve: resolvePath } = require('path');
const { mkdirSync, writeFileSync } = require('fs');

const { CHECK_MARK } = require('./logGoodies');

const createHtmlFile = require('./createHtmlFile');
const createPackageFile = require('./createPackageFile');
const initializeGitRepository = require('./initializeGitRepository');

module.exports = (theme, plugins, path) => {
  const {
    presentationName,
    presentationPath,
    normalizedName,
    shouldInitializeGitRepository,
  } = path;

  mkdirSync(path.presentationPath);
  process.stdout.write(`Presentation folder created: ${CHECK_MARK}\n`);

  writeFileSync(
    resolvePath(presentationPath, 'package.json'),
    createPackageFile(normalizedName),
    'utf8',
  );
  process.stdout.write(`File package.json created: ${CHECK_MARK}\n`);

  writeFileSync(
    resolvePath(presentationPath, 'index.html'),
    createHtmlFile(theme, plugins, presentationName),
    'utf8',
  );
  process.stdout.write(`File index.html created: ${CHECK_MARK}\n`);

  process.stdout.write('Installing dependencies (npm install)');
  execSync('npm install', { cwd: presentationPath, stdio: 'ignore' });
  process.stdout.write(` ${CHECK_MARK}\n`);

  if (shouldInitializeGitRepository) { initializeGitRepository(presentationPath); }
  process.stdout.write(`You can now run the following commands to get started:
  * cd ${presentationPath}
  * npm start\n`);
};
