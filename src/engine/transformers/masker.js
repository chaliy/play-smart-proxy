let masker = require('../masker');
let norm = require('../utils/norm');

/**
 * @param {Object} options
 * @param {Function} options.config Config provider. () => Promise<Config>
 */
module.exports = options => payload => {

  let { config } = options;

  // NOTE: This routine does not chache
  return norm(config)
            .then(masker)
            .then(mask => mask(payload));
}
