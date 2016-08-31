'use strict';

let util = require('util');
let http = require('http');
let app = require('connect')();

let target = process.env.PLAY_SMART_PROXY_TRAGET || 'http://localhost:10010';

app.use(require('./src/engine/proxies/http')({
  target,
  response: {
    envelope: require('./src/engine/envelopes/json'),
    transformers: [
      require('./src/employee')
    ]
  }
}));

app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

// Host
let port = process.env.PORT || 10020;

http.createServer(app).listen(port, () => {
  console.log(`Proxy server listening on port ${port} for target ${target}`);
});
