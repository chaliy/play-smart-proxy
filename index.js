'use strict';

let util = require('util');
let http = require('http');
let httpProxy = require('http-proxy');
let app = require('connect')();

let transformEmployee = require('./src/employee');

let target = process.env.PLAY_SMART_PROXY_TRAGET || 'http://localhost:10010';

let proxy = httpProxy.createProxyServer({
  target,
  changeOrigin: true
});

proxy.on('error', err => {
  console.log('Proxy Error:', err);
});

app.use('/employee', transformEmployee);

app.use((req, res) => proxy.web(req, res));
app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

// Host
let port = process.env.PORT || 10020;

http.createServer(app).listen(port, () => {
  console.log(`Proxy server listening on port ${port} for target ${target}`);
});
