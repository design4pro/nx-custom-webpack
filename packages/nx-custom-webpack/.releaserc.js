const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-custom-webpack',
  projectRoot: 'packages/nx-custom-webpack',
  buildOutput: 'dist/packages/nx-custom-webpack',
});