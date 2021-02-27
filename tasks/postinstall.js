const fs = require('fs');

const file = require.resolve('foundation-sites/package.json');

const pkg = require(file);

fs.writeFileSync(file, JSON.stringify({
  ...pkg,
  browserify: undefined,
}))
