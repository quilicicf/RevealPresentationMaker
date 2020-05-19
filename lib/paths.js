const { resolve: resolvePath } = require('path');

const PATH_APP_ROOT = resolvePath(__dirname, '..');
const PATH_NODE_MODULES = resolvePath(PATH_APP_ROOT, 'node_modules');

module.exports = {
  PATH_APP_ROOT,
  PATH_NODE_MODULES,
  PATH_REVEAL: resolvePath(PATH_NODE_MODULES, 'reveal.js'),
  PATH_BOOTSTRAP_MATERIAL: resolvePath(PATH_APP_ROOT, 'lib', 'bootstrap-material'),
};
