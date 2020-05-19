#!/usr/bin/env node

const yargs = require('yargs');
const debugCreator = require('debug');
const { red, green } = require('chalk');

const { bin } = require('./package.json');
const choosePath = require('./lib/choosePath');
const chooseTheme = require('./lib/chooseTheme');
const choosePlugins = require('./lib/choosePlugins');
const initializePresentation = require('./lib/initializePresentation');

const [ commandName ] = Object.keys(bin);
const debug = debugCreator(commandName);

const args = yargs
  .usage(`USAGE: ${commandName}\n  The command is fully interactive, let it guide you`)
  .version()
  .strict(true)
  .strictCommands(true)
  .wrap(null)
  .help()
  .argv;

debug('Application started with arguments: %o', args);

const main = async () => {
  const theme = await chooseTheme();
  const plugins = await choosePlugins();
  const path = await choosePath();

  initializePresentation(theme, plugins, path);
};

main()
  .then(() => debug(green('Application finished!')))
  .catch(error => process.stderr.write(red(`Oops, there was an error: ${error.stack}`)));
