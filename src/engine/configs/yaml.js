const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const denodeify = require('denodeify');
const readFile = denodeify(fs.readFile);

module.exports = options => key => {

  // NOTE This never cache rules!

  let filename = path.join(options.path, `${key}.yaml`);
  let content = fs.readFileSync(filename, 'utf8');

  return readFile(filename, 'utf8')
    .then(yaml.load);
}
