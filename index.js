'use strict';

let util = require('util');
let http = require('http');
let app = require('connect')();
let config = require('./config');


require('./src/employee')(app);
require('./src/all')(app);

app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

// Host
let port = process.env.PORT || 10020;

http.createServer(app).listen(port, () => {
  console.log(`Proxy server listening on port ${port} for target ${config.target}`);
});
