const config = require('../config');
const http = require('./engine/proxies/http');

module.exports = app => {
  app.use(http({
    target: config.target
  }));
}
