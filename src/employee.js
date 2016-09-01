const config = require('../config');
const configs = require('./configs');
const remoteConfigs = require('./engine/configs/documentDb')(config.configs.documentDb);
const http = require('./engine/proxies/http');
const json = require('./engine/envelopes/json');
const masker = require('./engine/transformers/masker');

module.exports = app => {
  app.use('/employee', http({
    target: config.target,
    response: {
      envelope: json,
      transformers: [
        masker({
          config: () => remoteConfigs('employee')
        })
      ]
    }
  }));
}
